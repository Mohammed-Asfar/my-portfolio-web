import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mohammed Asfar | App Developer • GenAI Developer • Cloud Engineer",
  description: "Experienced developer specializing in Flutter, React, Python, and GenAI. Building scalable mobile and web applications with LangChain, AWS CDK, and Firebase.",
  keywords: ["App Developer", "Software Engineer", "GenAI Developer", "Cloud Engineer", "Flutter", "React", "Python", "LangChain", "AWS CDK", "Firebase", "n8n"],
  authors: [{ name: "Mohammed Asfar" }],
  openGraph: {
    title: "Mohammed Asfar | App Developer • GenAI Developer • Cloud Engineer",
    description: "Experienced developer specializing in Flutter, React, Python, and GenAI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
