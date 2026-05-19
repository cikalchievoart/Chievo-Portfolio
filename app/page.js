import fs from "fs";
import path from "path";
import ClientScript from "./client-script";

export default function Home() {
  const htmlPath = path.join(process.cwd(), "app", "portfolio-body.html");
  const htmlContent = fs.readFileSync(htmlPath, "utf-8");

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <ClientScript />
    </>
  );
}
