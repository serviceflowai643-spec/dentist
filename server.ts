import express, { Request, Response } from 'express';
import path from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// In-Memory Rate Limiting (Spam Protection)
// Limit to 5 appointment submissions per 10 minutes per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

// Clean up stale rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// Helper for escaping HTML entities to prevent injection in emails
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Camberwell Junction Dental Booking API',
  });
});

// Primary Appointment Request Endpoint
app.post('/api/appointments/request', async (req: Request, res: Response): Promise<void> => {
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';

  // 1. Rate Limiting Check
  if (!checkRateLimit(clientIp)) {
    res.status(429).json({
      success: false,
      error: "We couldn't submit your request right now. Please call us directly to arrange your appointment.",
      details: 'Too many requests. Please call (03) 9882 1187 for immediate assistance.',
    });
    return;
  }

  const {
    fullName,
    email,
    phone,
    preferredDate,
    preferredTime,
    reason,
    preferredDentist,
    notes,
    hp_website, // Honeypot field for bot spam detection
  } = req.body;

  // 2. Honeypot check - if a bot filled the hidden honeypot field, silently return success without emailing
  if (hp_website && hp_website.trim().length > 0) {
    console.warn(`[SPAM DETECTED] Honeypot triggered from IP: ${clientIp}`);
    res.status(200).json({
      success: true,
      message: 'Thank you! Your appointment request has been received. Our team will contact you shortly to confirm your appointment.',
      bookingId: `CJD-SPAM-${Date.now().toString().slice(-4)}`,
    });
    return;
  }

  // 3. Server-side validation
  const errors: string[] = [];

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2 || fullName.trim().length > 100) {
    errors.push('Please provide a valid full name (2-100 characters).');
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.push('Please provide a valid email address.');
  }

  const phoneRegex = /^(\+?61|0)?[2-478](?:[ -]?[0-9]){8}$|^(\+?[0-9\s-()]{8,20})$/;
  if (!phone || typeof phone !== 'string' || !phoneRegex.test(phone.trim())) {
    errors.push('Please provide a valid contact telephone number.');
  }

  if (!preferredDate || typeof preferredDate !== 'string') {
    errors.push('Please select a preferred appointment date.');
  } else {
    // Ensure date is today or in the future
    const selectedDate = new Date(preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(selectedDate.getTime()) || selectedDate < today) {
      errors.push('Please select a valid upcoming date.');
    }
  }

  if (!preferredTime || typeof preferredTime !== 'string' || preferredTime.trim().length === 0) {
    errors.push('Please select a preferred appointment time window.');
  }

  if (!reason || typeof reason !== 'string' || reason.trim().length === 0) {
    errors.push('Please select a reason for your visit.');
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      error: errors[0],
      allErrors: errors,
    });
    return;
  }

  const cleanName = fullName.trim();
  const cleanEmail = email.trim();
  const cleanPhone = phone.trim();
  const cleanDate = preferredDate.trim();
  const cleanTime = preferredTime.trim();
  const cleanReason = reason.trim();
  const cleanDentist = (preferredDentist && typeof preferredDentist === 'string') ? preferredDentist.trim() : 'Any Available Dentist';
  const cleanNotes = (notes && typeof notes === 'string') ? notes.trim() : 'None provided';
  const bookingId = `CJD-${Date.now().toString().slice(-6)}`;

  // Formatting timestamp for Melbourne Australia time
  const melbourneTimeStr = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Melbourne',
    dateStyle: 'full',
    timeStyle: 'medium',
  }).format(new Date());

  const dentistEmail = process.env.DENTIST_EMAIL || 'camberwelljunctiondental@gmail.com';
  const emailSubject = `New Appointment Request — ${cleanName} — ${cleanDate}`;

  // Exact plain text body format as required by the specification
  const plainTextBody = `NEW APPOINTMENT REQUEST

Patient Name: ${cleanName}
Email: ${cleanEmail}
Phone: ${cleanPhone}
Requested Date: ${cleanDate}
Requested Time: ${cleanTime}
Reason for Visit: ${cleanReason}
Preferred Dentist: ${cleanDentist}
Additional Message: ${cleanNotes}

---
Booking Reference: ${bookingId}
Submission Timestamp: ${melbourneTimeStr}
Website Source: Camberwell Junction Dental (1/2 Prospect Hill Rd, Camberwell VIC 3124)
Direct Patient Reply Email: ${cleanEmail}
Direct Patient Phone: ${cleanPhone}
`;

  // Professional, accessible HTML email template
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Appointment Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F9F8F6; color: #1A1A1A;">
  <div style="max-width: 600px; margin: 24px auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #E5E2DA; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    
    <!-- Practice Header -->
    <div style="background-color: #5B827F; color: #ffffff; padding: 28px 32px; text-align: left;">
      <h1 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">Camberwell Junction Dental</h1>
      <p style="margin: 6px 0 0 0; font-size: 13px; color: #D1CEC6; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">
        New Online Appointment Request
      </p>
    </div>

    <!-- Main Content Container -->
    <div style="padding: 32px;">
      
      <!-- Reference Pill -->
      <div style="margin-bottom: 24px; padding: 12px 16px; background-color: #F9F8F6; border-radius: 10px; border: 1px solid #E5E2DA; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12px; color: #666666; font-weight: 600;">Reference ID: <strong style="color: #5B827F; font-family: monospace; font-size: 14px;">${bookingId}</strong></span>
        <span style="font-size: 11px; color: #888888;">${melbourneTimeStr}</span>
      </div>

      <!-- Patient Details Section -->
      <h2 style="font-size: 15px; font-weight: 700; color: #1A1A1A; margin: 0 0 14px 0; border-bottom: 2px solid #5B827F; padding-bottom: 6px; display: inline-block;">
        PATIENT CONTACT DETAILS
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #666666; width: 140px; font-weight: 600;">Patient Name:</td>
          <td style="padding: 8px 0; color: #1A1A1A; font-weight: 700;">${escapeHtml(cleanName)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666666; font-weight: 600;">Email Address:</td>
          <td style="padding: 8px 0;">
            <a href="mailto:${encodeURIComponent(cleanEmail)}?subject=Re:%20Your%20Appointment%20Request%20at%20Camberwell%20Junction%20Dental" style="color: #5B827F; text-decoration: none; font-weight: 600;">
              ${escapeHtml(cleanEmail)}
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666666; font-weight: 600;">Phone Number:</td>
          <td style="padding: 8px 0;">
            <a href="tel:${escapeHtml(cleanPhone.replace(/\s+/g, ''))}" style="color: #5B827F; text-decoration: none; font-weight: 600;">
              ${escapeHtml(cleanPhone)}
            </a>
          </td>
        </tr>
      </table>

      <!-- Appointment Request Details Section -->
      <h2 style="font-size: 15px; font-weight: 700; color: #1A1A1A; margin: 0 0 14px 0; border-bottom: 2px solid #5B827F; padding-bottom: 6px; display: inline-block;">
        APPOINTMENT PREFERENCES
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #666666; width: 140px; font-weight: 600;">Requested Date:</td>
          <td style="padding: 8px 0; color: #1A1A1A; font-weight: 700;">${escapeHtml(cleanDate)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666666; font-weight: 600;">Requested Time:</td>
          <td style="padding: 8px 0; color: #1A1A1A; font-weight: 600;">${escapeHtml(cleanTime)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666666; font-weight: 600;">Reason for Visit:</td>
          <td style="padding: 8px 0; color: #1A1A1A; font-weight: 600;">${escapeHtml(cleanReason)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666666; font-weight: 600;">Preferred Dentist:</td>
          <td style="padding: 8px 0; color: #1A1A1A;">${escapeHtml(cleanDentist)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666666; font-weight: 600; vertical-align: top;">Additional Message:</td>
          <td style="padding: 8px 0; color: #333333; line-height: 1.5; background-color: #F9F8F6; padding: 10px; border-radius: 8px;">${escapeHtml(cleanNotes)}</td>
        </tr>
      </table>

      <!-- Quick Action Buttons for Clinic Reception -->
      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #E5E2DA; text-align: center;">
        <a href="mailto:${encodeURIComponent(cleanEmail)}?subject=Re:%20Your%20Appointment%20Request%20at%20Camberwell%20Junction%20Dental" style="display: inline-block; padding: 12px 24px; background-color: #5B827F; color: #ffffff; text-decoration: none; border-radius: 9999px; font-weight: 600; font-size: 13px; margin-right: 8px; margin-bottom: 8px;">
          ✉️ Reply to Patient
        </a>
        <a href="tel:${escapeHtml(cleanPhone.replace(/\s+/g, ''))}" style="display: inline-block; padding: 12px 24px; background-color: #F0EEE9; color: #1A1A1A; text-decoration: none; border-radius: 9999px; font-weight: 600; font-size: 13px; border: 1px solid #E5E2DA; margin-bottom: 8px;">
          📞 Call Patient (${escapeHtml(cleanPhone)})
        </a>
      </div>

    </div>

    <!-- Email Footer -->
    <div style="background-color: #F0EEE9; padding: 18px 32px; font-size: 11px; color: #666666; text-align: center; border-top: 1px solid #E5E2DA;">
      <p style="margin: 0;">Sent automatically from the <strong>Camberwell Junction Dental</strong> Online Booking System.</p>
      <p style="margin: 4px 0 0 0;">1/2 Prospect Hill Road, Camberwell VIC 3124 | Phone: (03) 9882 1187</p>
    </div>

  </div>
</body>
</html>
`;

  try {
    let emailSent = false;
    let deliveryMethod = 'none';

    // Method A: SMTP / Gmail App Password
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASSWORD || process.env.GMAIL_APP_PASSWORD;

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '465', 10),
        secure: process.env.SMTP_SECURE !== 'false', // true for 465, false for 587
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"Camberwell Junction Dental" <${smtpUser}>`,
        to: dentistEmail,
        replyTo: `${cleanName} <${cleanEmail}>`,
        subject: emailSubject,
        text: plainTextBody,
        html: htmlBody,
      });

      emailSent = true;
      deliveryMethod = 'smtp';
      console.log(`[EMAIL DISPATCHED] Successfully sent booking request ${bookingId} to ${dentistEmail} via SMTP`);
    }
    // Method B: Resend API / Email API Key
    else if (process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY) {
      const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY;
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Camberwell Junction Dental <onboarding@resend.dev>',
          to: [dentistEmail],
          reply_to: cleanEmail,
          subject: emailSubject,
          text: plainTextBody,
          html: htmlBody,
        }),
      });

      if (!resendRes.ok) {
        const errorText = await resendRes.text();
        console.error(`[RESEND API ERROR]: ${errorText}`);
        throw new Error(`Resend dispatch failed: ${errorText}`);
      }

      emailSent = true;
      deliveryMethod = 'resend';
      console.log(`[EMAIL DISPATCHED] Successfully sent booking request ${bookingId} to ${dentistEmail} via Resend API`);
    }
    // Method C: Development / Sandbox fallback simulation
    else {
      // In development mode when SMTP credentials are not yet configured in AI Studio Secrets:
      // We log the complete email payload and headers to server logs for verification and auditing.
      console.log('================================================================');
      console.log(`[DEV/DEMO DISPATCH] Appointment Request ${bookingId}`);
      console.log(`To: ${dentistEmail}`);
      console.log(`Reply-To: ${cleanName} <${cleanEmail}>`);
      console.log(`Subject: ${emailSubject}`);
      console.log('------------------------- BODY ---------------------------------');
      console.log(plainTextBody);
      console.log('================================================================');
      console.log('💡 Note: To send live emails to Gmail in production, configure SMTP_USER and GMAIL_APP_PASSWORD (or RESEND_API_KEY) in Settings.');
      
      emailSent = true;
      deliveryMethod = 'sandbox_logged';
    }

    if (emailSent) {
      res.status(200).json({
        success: true,
        message: 'Thank you! Your appointment request has been received. Our team will contact you shortly to confirm your appointment.',
        bookingId,
        deliveryMethod,
        recipient: dentistEmail,
        details: {
          fullName: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          preferredDate: cleanDate,
          preferredTime: cleanTime,
          reason: cleanReason,
          preferredDentist: cleanDentist,
          notes: cleanNotes,
        },
      });
    } else {
      throw new Error('Email delivery failed to complete.');
    }
  } catch (err: unknown) {
    console.error('[APPOINTMENT DISPATCH ERROR]:', err);
    res.status(500).json({
      success: false,
      error: "We couldn't submit your request right now. Please call us directly to arrange your appointment.",
      details: (err instanceof Error) ? err.message : 'Unknown server error',
    });
  }
});

// Vite & Static Asset Handling
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Camberwell Junction Dental] Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
