"use client";

import { useState } from "react";

export default function Contact() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // Honeypot
  });
  const [otpCode, setOtpCode] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("info");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage("TRANSMITTING ENCRYPTED DISPATCH...");
    setStatusType("info");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send-otp",
          ...formData,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStatusMessage("");
        setStep(2);
      } else {
        setStatusMessage(data.error || "DISPATCH TRANSMISSION FAILED.");
        setStatusType("error");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatusMessage("DISPATCH TRANSMISSION FAILED.");
      setStatusType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.length !== 6) {
      setStatusMessage("ENTER VALID 6-DIGIT VERIFICATION TOKEN.");
      setStatusType("error");
      return;
    }

    setIsLoading(true);
    setStatusMessage("AUTHENTICATING OTP TOKEN...");
    setStatusType("info");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify-otp",
          email: formData.email,
          otp: otpCode,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setStatusMessage("DISPATCH DELIVERED SUCCESSFULLY!");
        setStatusType("success");
        setFormData({ name: "", email: "", subject: "", message: "", website: "" });
        setOtpCode("");
        setTimeout(() => {
          setStep(1);
          setStatusMessage("");
        }, 3000);
      } else {
        setStatusMessage(data.error || "AUTHENTICATION FAILED.");
        setStatusType("error");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setStatusMessage("AUTHENTICATION FAILED.");
      setStatusType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToStep1 = () => {
    setStep(1);
    setStatusMessage("");
  };

  return (
    <section id="contact" className="py-16 bg-[#131c2e] border-t border-white/5 crt-scanlines">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-white/10 pb-4">
          <div>
            <div className="font-mono text-xs text-[#ff3366] tracking-widest uppercase mb-1">
              // SECTION 06 — MISSION DISPATCH TERMINAL
            </div>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
              DISPATCH <span className="text-[#11f3d3]">TERMINAL</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-gray-400 mt-2 md:mt-0">
            PROTOCOL: [ENCRYPTED OTP API]
          </div>
        </div>

        {/* 2-Column Terminal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Terminal Status Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-[#090d16] p-5 rounded-lg border border-[#11f3d3]/30 hud-corner">
              <h3 className="font-mono text-xs text-[#11f3d3] uppercase tracking-wider mb-2 font-bold flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#11f3d3] animate-pulse"></span>
                <span>[DIRECT MISSION CHANNEL]</span>
              </h3>
              <p className="text-gray-300 text-xs leading-relaxed mb-4">
                Open for VR game engineering, simulator hardware integration, or IT infrastructure troubleshooting. Submit mission briefs via encrypted OTP token authentication.
              </p>

              <div className="space-y-3 font-mono text-xs border-t border-white/10 pt-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <i className="fas fa-envelope text-[#11f3d3] text-sm"></i>
                  <span>cikalchievo01@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <i className="fas fa-map-marker-alt text-[#ff3366] text-sm"></i>
                  <span>Batam, Indonesia</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <i className="fas fa-shield-alt text-[#11f3d3] text-sm"></i>
                  <span>2-Step Encrypted Token Guard Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission Form Terminal */}
          <div className="md:col-span-7 bg-[#090d16] p-6 rounded-lg border border-white/10 shadow-2xl hud-corner clip-cyber-card">
            <form id="contact-form" onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp}>
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                id="website"
                value={formData.website}
                onChange={handleInputChange}
                style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Step 1 */}
              {step === 1 && (
                <div id="form-step-1" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-[11px] font-mono uppercase text-gray-400 mb-1">
                        PILOT NAME // IDENTIFIER
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-[#131c2e] border border-white/10 rounded font-mono text-xs text-white focus:outline-none focus:border-[#11f3d3]"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[11px] font-mono uppercase text-gray-400 mb-1">
                        EMAIL // DISPATCH ROUTE
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-[#131c2e] border border-white/10 rounded font-mono text-xs text-white focus:outline-none focus:border-[#11f3d3]"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-[11px] font-mono uppercase text-gray-400 mb-1">
                      MISSION SUBJECT // TITLE
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-[#131c2e] border border-white/10 rounded font-mono text-xs text-white focus:outline-none focus:border-[#11f3d3]"
                      placeholder="Subject"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[11px] font-mono uppercase text-gray-400 mb-1">
                      MISSION PAYLOAD // BRIEF
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 bg-[#131c2e] border border-white/10 rounded font-mono text-xs text-white focus:outline-none focus:border-[#11f3d3]"
                      placeholder="Send me a message..."
                      required
                    ></textarea>
                  </div>

                  {statusMessage && (
                    <div
                      className={`text-center font-mono text-xs ${
                        statusType === "error"
                          ? "text-[#ff3366]"
                          : statusType === "success"
                          ? "text-green-400"
                          : "text-[#11f3d3]"
                      }`}
                    >
                      [{statusMessage}]
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#11f3d3] text-[#090d16] font-mono font-bold uppercase text-xs tracking-wider py-3 rounded hover:bg-[#11f3d3]/90 transition disabled:opacity-50"
                  >
                    {isLoading ? "[ TRANSMITTING BRIEF... ]" : "[ DISPATCH MISSION BRIEF ]"}
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div id="form-step-2" className="space-y-4">
                  <div className="text-center">
                    <i className="fas fa-key text-2xl text-[#11f3d3] mb-2"></i>
                    <h3 className="text-base font-bold text-white uppercase tracking-wide mb-1 font-mono">
                      AUTHENTICATE OTP MISSION TOKEN
                    </h3>
                    <p className="text-[11px] font-mono text-gray-400">
                      Token dispatched to <span className="text-[#11f3d3]">{formData.email}</span>
                    </p>
                  </div>

                  <div>
                    <input
                      type="text"
                      id="otp-code"
                      name="otp"
                      maxLength="6"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#131c2e] border border-[#11f3d3]/40 rounded text-center text-2xl tracking-[0.5em] font-mono text-[#11f3d3] focus:outline-none"
                      placeholder="------"
                      autoFocus
                    />
                  </div>

                  {statusMessage && (
                    <div
                      className={`text-center font-mono text-xs ${
                        statusType === "error"
                          ? "text-[#ff3366]"
                          : statusType === "success"
                          ? "text-green-400"
                          : "text-[#11f3d3]"
                      }`}
                    >
                      [{statusMessage}]
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleBackToStep1}
                      className="w-1/3 bg-transparent border border-gray-600 text-gray-300 font-mono text-xs uppercase py-2.5 rounded hover:bg-[#131c2e] transition"
                    >
                      [ BACK ]
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-2/3 bg-[#11f3d3] text-[#090d16] font-mono font-bold uppercase text-xs py-2.5 rounded hover:bg-[#11f3d3]/90 transition disabled:opacity-50"
                    >
                      {isLoading ? "[ AUTHENTICATING... ]" : "[ CONFIRM & TRANSMIT ]"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
