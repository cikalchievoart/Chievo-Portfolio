"use client";

import React, { useState } from "react";
import { ContactFormData } from "../types/portfolio";

export default function Contact() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // Honeypot
  });
  const [otpCode, setOtpCode] = useState<string>("");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [statusType, setStatusType] = useState<"info" | "error" | "success">("info");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("cikalchievo01@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage("Sending secure verification code...");
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
        setStatusMessage(data.error || "Failed to send verification code. Please try again.");
        setStatusType("error");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatusMessage("Network error. Please try again or reach out directly.");
      setStatusType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otpCode || otpCode.length !== 6) {
      setStatusMessage("Please enter a valid 6-digit verification code.");
      setStatusType("error");
      return;
    }

    setIsLoading(true);
    setStatusMessage("Verifying code & sending message...");
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
        setStatusMessage("Message delivered successfully! I will respond promptly.");
        setStatusType("success");
        setFormData({ name: "", email: "", subject: "", message: "", website: "" });
        setOtpCode("");
        setTimeout(() => {
          setStep(1);
          setStatusMessage("");
        }, 3500);
      } else {
        setStatusMessage(data.error || "Verification code invalid or expired.");
        setStatusType("error");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setStatusMessage("Verification failed. Please retry.");
      setStatusType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs font-mono mb-3">
              <span>06</span>
              <span>/</span>
              <span>GET IN TOUCH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Let&apos;s Build Something Together
            </h2>
          </div>

          <div className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 px-3.5 py-1.5 rounded-full">
            Response Time: &lt; 24h
          </div>
        </div>

        {/* 2-Column Contact Surface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Direct Info & Availability Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bezel-container border border-slate-200/80 dark:border-transparent">
              <div className="bezel-inner p-6 sm:p-7">

                {/* Live Status Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  <span>Available for Full-time & Projects</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Direct Inquiries & Collaboration
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Whether you have an VR & simulation project, a modern web app to build, or IT systems to architect, feel free to reach out directly or send a message via the form.
                </p>

                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-white/10 font-mono text-xs">
                  {/* Email with 1-click copy */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                    <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-300">
                      <i className="fas fa-envelope text-cyan-600 dark:text-cyan-400"></i>
                      <span>cikalchievo01@gmail.com</span>
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      className="px-2.5 py-1 rounded-md bg-slate-200/70 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-[11px] transition-colors"
                      title="Copy email"
                    >
                      {copiedEmail ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-300">
                    <i className="fas fa-map-marker-alt text-rose-500 dark:text-rose-400"></i>
                    <span>Batam, Riau Islands, Indonesia (UTC+7)</span>
                  </div>

                  {/* Security badge */}
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 text-[11px]">
                    <i className="fas fa-shield-alt text-emerald-600 dark:text-emerald-400"></i>
                    <span>Protected by 2-Step OTP Authentication</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: High-Precision Form */}
          <div className="lg:col-span-7">
            <div className="bezel-container border border-slate-200/80 dark:border-transparent">
              <div className="bezel-inner p-6 sm:p-8">

                <form onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp}>
                  {/* Honeypot for bot protection */}
                  <input
                    type="text"
                    name="website"
                    value={formData.website || ""}
                    onChange={handleInputChange}
                    style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Step 1: Message Input */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1.5">
                            Your Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-500/30 dark:focus:ring-cyan-400/30 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1.5">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-500/30 dark:focus:ring-cyan-400/30 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1.5">
                          Subject / Topic
                        </label>
                        <input
                          type="text"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Project Inquiry / Job Opportunity"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-500/30 dark:focus:ring-cyan-400/30 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1.5">
                          Message
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell me about your project, timeline, or inquiries..."
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-500/30 dark:focus:ring-cyan-400/30 transition-all resize-none"
                        />
                      </div>

                      {statusMessage && (
                        <div
                          className={`p-3 rounded-xl text-xs font-mono text-center border ${statusType === "error"
                              ? "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300"
                              : statusType === "success"
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                                : "bg-cyan-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-300"
                            }`}
                        >
                          {statusMessage}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 dark:from-cyan-400 dark:to-teal-400 text-white dark:text-[#07090e] font-semibold text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <i className="fas fa-spinner fa-spin text-xs"></i>
                            <span>Sending Verification Code...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <span className="font-mono text-sm">→</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Step 2: OTP Verification */}
                  {step === 2 && (
                    <div className="space-y-5 text-center py-2">
                      <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto text-lg">
                        <i className="fas fa-key"></i>
                      </div>

                      <div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                          Enter Verification Code
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          A 6-digit code has been sent to{" "}
                          <span className="text-cyan-700 dark:text-cyan-400 font-mono">{formData.email}</span>
                        </p>
                      </div>

                      <div className="max-w-xs mx-auto">
                        <input
                          type="text"
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="------"
                          autoFocus
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-cyan-500/50 dark:border-cyan-400/40 text-center text-2xl font-mono tracking-[0.4em] text-cyan-700 dark:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 dark:focus:ring-cyan-400/30"
                        />
                      </div>

                      {statusMessage && (
                        <div
                          className={`p-3 rounded-xl text-xs font-mono text-center border ${statusType === "error"
                              ? "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300"
                              : statusType === "success"
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                                : "bg-cyan-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-300"
                            }`}
                        >
                          {statusMessage}
                        </div>
                      )}

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setStep(1);
                            setStatusMessage("");
                          }}
                          className="w-1/3 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 text-xs font-medium transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-2/3 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 dark:from-cyan-400 dark:to-teal-400 text-white dark:text-[#07090e] text-xs font-semibold uppercase tracking-wider hover:shadow-lg hover:shadow-cyan-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isLoading ? "Verifying..." : "Verify & Confirm"}
                        </button>
                      </div>
                    </div>
                  )}

                </form>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
