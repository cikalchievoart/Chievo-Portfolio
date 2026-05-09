import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Cikal Chievo Arment - Portfolio",
  description:
    "Portfolio of Cikal Chievo Arment - Unity Game Programmer specializing in VR experiences and hardware-integrated simulations.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
