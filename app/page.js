import fs from "fs";
import path from "path";
import Script from "next/script";

export default function Home() {
  const htmlContent = fs.readFileSync(
    path.join(process.cwd(), "app", "portfolio-body.html"),
    "utf-8"
  );

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
