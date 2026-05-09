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
      <header className="fixed w-full bg-dark/80 backdrop-blur-sm z-50 border-b border-primary/10 transition-all duration-300">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full animate-pulse-slow"></div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
              Cikal Chievo Arment
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="nav-link text-gray-300 hover:text-primary transition">Home</a>
            <a href="#projects" className="nav-link text-gray-300 hover:text-primary transition">Projects</a>
            <a href="#gallery" className="nav-link text-gray-300 hover:text-primary transition">Gallery</a>
            <a href="#contact" className="nav-link text-gray-300 hover:text-primary transition">Contact</a>
          </div>
          <button id="mobile-toggle" className="md:hidden text-gray-300 focus:outline-none">
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </nav>
        <div id="mobile-menu" className="mobile-menu">
          <button id="mobile-close" className="text-gray-300 self-end">
            <i className="fas fa-times text-2xl"></i>
          </button>
          <a href="#home" className="nav-link">Home</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#gallery" className="nav-link">Gallery</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </header>

      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
