"use client";

import Script from "next/script";

export default function ClientScript() {
  return <Script src="/script.js" strategy="afterInteractive" />;
}
