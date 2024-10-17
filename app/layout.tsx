import type { Metadata } from "next";
import "./globals.css";
import { notoSans, notoMono } from "./fonts/fonts";

export const metadata: Metadata = {
  title: "Krishnakumar: Ready to Set Sail with 1851 Labs",
  description:
    "Full-stack developer and AI enthusiast seeking to join the crew of digital pirates at 1851 Labs. Explore my skills, projects, and why I'm the right mate for your stealth consumer AI startup.",
  keywords:
    "full-stack developer, AI, React, TypeScript, Node.js, Python, stealth startup, consumer AI, 1851 Labs",
  authors: [{ name: "Krishnakumar V" }],
  icons: {
    icon: [
      {
        url: "/favicons/favicon-16.png",
        sizes: "16x16",
        type: "image/png",
      },
      { url: "/favicons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-96.png", sizes: "96x96", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} ${notoMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
