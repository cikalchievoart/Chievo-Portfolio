import nodemailer from "nodemailer";
import { OtpStoreRecord } from "@/types/portfolio";

interface RateLimitRecord {
  count: number;
  firstRequest: number;
}

// In-memory stores (reset on server restart)
const rateLimitMap = new Map<string, RateLimitRecord>();
const otpStore = new Map<string, OtpStoreRecord>(); // email -> { code, data, expiresAt, attempts }

const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;
const OTP_EXPIRY = 5 * 60 * 1000; // 5 minutes
const MAX_OTP_ATTEMPTS = 3;

function isRateLimited(ip: string): boolean {
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

function isValidEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function sanitize(str: string): string {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").trim();
}

function generateOTP(): string {
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

export async function POST(request: Request) {
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
        from: `"Cikal Chievo Arment" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `[${code}] Your Verification Code — Cikal Chievo Portfolio`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 24px; background-color: #07090e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center">
                  <table role="presentation" style="max-width: 500px; width: 100%; background-color: #0c1017; border: 1px solid rgba(0, 240, 255, 0.25); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.8);" cellspacing="0" cellpadding="0">
                    
                    <!-- Header Banner -->
                    <tr>
                      <td style="padding: 28px 28px 20px 28px; background: linear-gradient(180deg, rgba(0, 240, 255, 0.08) 0%, rgba(99, 102, 241, 0.04) 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: center;">
                        <table role="presentation" align="center" cellspacing="0" cellpadding="0" style="margin: 0 auto 12px auto;">
                          <tr>
                            <td style="width: 42px; height: 42px; background: linear-gradient(135deg, rgba(0,240,255,0.2) 0%, rgba(99,102,241,0.2) 100%); border: 1px solid rgba(0, 240, 255, 0.4); border-radius: 50%; text-align: center; vertical-align: middle; font-family: 'Courier New', Courier, monospace; font-size: 14px; font-weight: bold; color: #00f0ff;">
                              CC
                            </td>
                          </tr>
                        </table>
                        <h1 style="margin: 0; font-size: 18px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">
                          Cikal Chievo Arment
                        </h1>
                        <p style="margin: 4px 0 0 0; font-size: 11px; font-family: 'Courier New', Courier, monospace; color: #00f0ff; letter-spacing: 0.1em; text-transform: uppercase;">
                          Security Verification System
                        </p>
                      </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                      <td style="padding: 28px; text-align: center;">
                        <p style="margin: 0 0 8px 0; font-size: 14px; color: #94a3b8;">
                          Hello <strong style="color: #ffffff;">${sanitize(name)}</strong>,
                        </p>
                        <p style="margin: 0 0 24px 0; font-size: 13px; color: #64748b; line-height: 1.5;">
                          Use the one-time authorization code below to confirm and dispatch your message.
                        </p>

                        <!-- Code Box -->
                        <div style="background: #07090e; border: 1px solid rgba(0, 240, 255, 0.4); border-radius: 12px; padding: 20px 10px; margin: 0 auto 20px auto; max-width: 320px; box-shadow: 0 0 25px rgba(0, 240, 255, 0.1);">
                          <div style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; color: #00f0ff; letter-spacing: 10px; text-shadow: 0 0 10px rgba(0,240,255,0.4);">
                            ${code}
                          </div>
                        </div>

                        <!-- Pill Metadata -->
                        <table role="presentation" align="center" cellspacing="0" cellpadding="0" style="margin: 0 auto 24px auto;">
                          <tr>
                            <td style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 20px; padding: 4px 12px; font-size: 11px; font-family: 'Courier New', Courier, monospace; color: #fbbf24;">
                              ⏱ Expires in 5 minutes
                            </td>
                          </tr>
                        </table>

                        <p style="margin: 0; font-size: 11px; color: #475569; line-height: 1.4;">
                          If you did not initiate this dispatch request from <a href="https://portfolio-chievo.vercel.app" style="color: #00f0ff; text-decoration: none;">portfolio</a>, please disregard this email.
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding: 16px 28px; background-color: #07090e; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">
                        <p style="margin: 0; font-size: 11px; font-family: 'Courier New', Courier, monospace; color: #475569;">
                          © ${new Date().getFullYear()} Cikal Chievo Arment · Batam, Indonesia
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
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
        from: `"Portfolio Contact System" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: senderEmail,
        subject: `[Portfolio] ${subject} — ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 24px; background-color: #07090e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center">
                  <table role="presentation" style="max-width: 600px; width: 100%; background-color: #0c1017; border: 1px solid rgba(0, 240, 255, 0.25); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.8);" cellspacing="0" cellpadding="0">
                    
                    <!-- Header -->
                    <tr>
                      <td style="padding: 24px 28px; background: linear-gradient(180deg, rgba(0, 240, 255, 0.08) 0%, rgba(99, 102, 241, 0.04) 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                          <tr>
                            <td>
                              <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; color: #00f0ff; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">
                                INCOMING PORTFOLIO DISPATCH
                              </div>
                              <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">
                                ${sanitize(subject)}
                              </h1>
                            </td>
                            <td align="right" valign="top">
                              <span style="display: inline-block; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 20px; padding: 4px 10px; font-size: 10px; font-family: 'Courier New', Courier, monospace; color: #10b981; white-space: nowrap;">
                                ● OTP VERIFIED
                              </span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Metadata Grid -->
                    <tr>
                      <td style="padding: 20px 28px; background-color: #07090e; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                          <tr>
                            <td width="50%" style="padding-bottom: 10px;">
                              <div style="font-size: 11px; font-family: 'Courier New', Courier, monospace; color: #64748b;">SENDER</div>
                              <div style="font-size: 14px; font-weight: 600; color: #f8fafc; margin-top: 2px;">${sanitize(name)}</div>
                            </td>
                            <td width="50%" style="padding-bottom: 10px;">
                              <div style="font-size: 11px; font-family: 'Courier New', Courier, monospace; color: #64748b;">EMAIL</div>
                              <div style="font-size: 14px; font-family: 'Courier New', Courier, monospace; color: #00f0ff; margin-top: 2px;">
                                <a href="mailto:${senderEmail}" style="color: #00f0ff; text-decoration: none;">${senderEmail}</a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td width="50%">
                              <div style="font-size: 11px; font-family: 'Courier New', Courier, monospace; color: #64748b;">DATE & TIME</div>
                              <div style="font-size: 12px; font-family: 'Courier New', Courier, monospace; color: #cbd5e1; margin-top: 2px;">
                                ${new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })} WIB
                              </div>
                            </td>
                            <td width="50%">
                              <div style="font-size: 11px; font-family: 'Courier New', Courier, monospace; color: #64748b;">AUTHENTICATION</div>
                              <div style="font-size: 12px; font-family: 'Courier New', Courier, monospace; color: #10b981; margin-top: 2px;">
                                2-Step OTP Passed
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Message Body -->
                    <tr>
                      <td style="padding: 28px;">
                        <div style="font-size: 11px; font-family: 'Courier New', Courier, monospace; color: #64748b; margin-bottom: 8px;">
                          MESSAGE BODY:
                        </div>
                        <div style="background-color: #07090e; border-left: 3px solid #00f0ff; border-radius: 0 8px 8px 0; padding: 16px 20px; font-size: 14px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
${sanitize(message)}
                        </div>

                        <!-- Quick Action Button -->
                        <div style="margin-top: 24px; text-align: center;">
                          <a href="mailto:${senderEmail}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background: linear-gradient(135deg, #00f0ff 0%, #6366f1 100%); color: #07090e; text-decoration: none; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 12px 28px; border-radius: 9999px; box-shadow: 0 4px 15px rgba(0, 240, 255, 0.3);">
                            Direct Reply via Email →
                          </a>
                        </div>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding: 16px 28px; background-color: #07090e; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">
                        <p style="margin: 0; font-size: 11px; font-family: 'Courier New', Courier, monospace; color: #475569;">
                          Cikal Chievo Arment Portfolio Automated Dispatch Server
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
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
