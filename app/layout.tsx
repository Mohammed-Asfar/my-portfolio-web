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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mohammed-asfar.netlify.app";

const title = "Mohammed Asfar | Software Engineer, App & Web Developer";
const description =
  "Mohammed Asfar — Software Engineer passionate about solving real-world problems by bringing software to life. Building scalable mobile & web apps with Flutter, Next.js, React, and Python, and AI-powered solutions with LangChain, AWS CDK, and Firebase.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Mohammed Asfar",
  },
  description,
  keywords: [
    "Mohammed Asfar",
    "Software Engineer",
    "App Developer",
    "Flutter Developer",
    "Next.js Developer",
    "React Developer",
    "GenAI Developer",
    "Cloud Engineer",
    "Python",
    "LangChain",
    "AWS CDK",
    "Firebase",
    "n8n",
    "Mobile App Development",
    "Web Development",
    "Portfolio",
  ],
  authors: [{ name: "Mohammed Asfar", url: siteUrl }],
  creator: "Mohammed Asfar",
  publisher: "Mohammed Asfar",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Mohammed Asfar",
    title,
    description,
    locale: "en_US",
    images: [
      {
        url: "/profilepic.png",
        width: 1200,
        height: 630,
        alt: "Mohammed Asfar — Software Engineer & App Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/profilepic.png"],
    creator: "@mohammed_asfar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohammed Asfar",
    url: siteUrl,
    image: `${siteUrl}/profilepic.png`,
    jobTitle: "Software Engineer",
    description,
    email: "mailto:errorfound500@gmail.com",
    sameAs: [
      "https://github.com/Mohammed-Asfar",
      "https://www.linkedin.com/in/mohammed-asfar-a22b68295",
      "https://www.instagram.com/mohammed_asfar/",
    ],
    knowsAbout: [
      "Software Engineering",
      "Mobile App Development",
      "Web Development",
      "Flutter",
      "Next.js",
      "React",
      "Python",
      "Generative AI",
      "LangChain",
      "AWS CDK",
      "Firebase",
      "Cloud Engineering",
    ],
  };

  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
