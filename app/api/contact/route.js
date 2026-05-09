import nodemailer from "nodemailer";

// In-memory stores (reset on server restart)
const rateLimitMap = new Map();
const otpStore = new Map(); // email -> { code, data, expiresAt, attempts }

const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;
const OTP_EXPIRY = 5 * 60 * 1000; // 5 minutes
const MAX_OTP_ATTEMPTS = 3;

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  if (now - record.firstRequest > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) return true;
  record.count++;
  return false;
}

function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function sanitize(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").trim();
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action } = body;

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return Response.json(
        { success: false, error: "Too many requests. Please try again in 10 minutes." },
        { status: 429 }
      );
    }

    // STEP 1: Send OTP to sender's email
    if (action === "send-otp") {
      const { name, email, subject, message, website } = body;

      // Honeypot
      if (website) return Response.json({ success: true });

      if (!name || !email || !subject || !message) {
        return Response.json({ success: false, error: "All fields are required." }, { status: 400 });
      }
      if (!isValidEmail(email)) {
        return Response.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
      }
      if (name.length > 100 || subject.length > 200 || message.length > 5000) {
        return Response.json({ success: false, error: "Input too long." }, { status: 400 });
      }

      const code = generateOTP();
      otpStore.set(email, {
        code,
        data: { name: sanitize(name), email: sanitize(email), subject: sanitize(subject), message: sanitize(message) },
        expiresAt: Date.now() + OTP_EXPIRY,
        attempts: 0,
      });

      // Send OTP email
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"Cikal Chievo Portfolio" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Verification Code",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; text-align: center;">
            <div style="background: #0F172A; padding: 30px; border-radius: 12px;">
              <h2 style="color: #11F3D3; margin-top: 0;">Email Verification</h2>
              <p style="color: #94A3B8;">Enter this code to send your message:</p>
              <div style="background: #1E293B; border: 2px solid #11F3D3; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <span style="font-size: 32px; font-weight: bold; color: #11F3D3; letter-spacing: 8px;">${code}</span>
              </div>
              <p style="color: #64748B; font-size: 12px;">This code expires in 5 minutes. If you didn't request this, ignore this email.</p>
            </div>
          </div>
        `,
      });

      return Response.json({ success: true, message: "Verification code sent to your email." });
    }

    // STEP 2: Verify OTP and send actual message
    if (action === "verify-otp") {
      const { email, otp } = body;

      if (!email || !otp) {
        return Response.json({ success: false, error: "Email and code are required." }, { status: 400 });
      }

      const record = otpStore.get(email);
      if (!record) {
        return Response.json({ success: false, error: "No verification code found. Please request a new one." }, { status: 400 });
      }

      if (Date.now() > record.expiresAt) {
        otpStore.delete(email);
        return Response.json({ success: false, error: "Code expired. Please request a new one." }, { status: 400 });
      }

      record.attempts++;
      if (record.attempts > MAX_OTP_ATTEMPTS) {
        otpStore.delete(email);
        return Response.json({ success: false, error: "Too many wrong attempts. Please request a new code." }, { status: 400 });
      }

      if (record.code !== otp.trim()) {
        return Response.json({ success: false, error: `Wrong code. ${MAX_OTP_ATTEMPTS - record.attempts} attempts remaining.` }, { status: 400 });
      }

      // OTP valid — send the contact email
      const { name, email: senderEmail, subject, message } = record.data;
      otpStore.delete(email);

      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: senderEmail,
        subject: `[Portfolio] ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #11F3D3; background: #0F172A; padding: 20px; border-radius: 8px 8px 0 0; margin: 0;">
              New Message from Portfolio
            </h2>
            <div style="padding: 20px; background: #1E293B; color: #E2E8F0; border-radius: 0 0 8px 8px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${senderEmail}" style="color: #11F3D3;">${senderEmail}</a></p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p style="color: #22C55E; font-size: 12px;">✅ Email verified via OTP</p>
              <hr style="border-color: #334155;" />
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        `,
      });

      return Response.json({ success: true, message: "Message sent successfully!" });
    }

    return Response.json({ success: false, error: "Invalid action." }, { status: 400 });
  } catch (error) {
    console.error("API error:", error);
    return Response.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
