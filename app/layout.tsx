import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nirmalasari Rodito S — Software Engineering, Web & Mobile Development",
  description:
    "Portofolio Nirmalasari Rodito S — Lulusan S1 Ilmu Komputer (S.Kom), Institut Teknologi Bacharuddin Jusuf Habibie. Software Engineer dengan pengalaman Web Development, Mobile Development, dan UI/UX Design.",
  openGraph: {
    title: "Nirmalasari Rodito S — Software Engineering, Web & Mobile Development",
    description:
      "Portofolio Nirmalasari Rodito S — Lulusan S1 Ilmu Komputer (S.Kom), Institut Teknologi Bacharuddin Jusuf Habibie.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirmalasari Rodito S — Software Engineering, Web & Mobile Development",
    description:
      "Portofolio Nirmalasari Rodito S — Lulusan S1 Ilmu Komputer (S.Kom), Institut Teknologi Bacharuddin Jusuf Habibie.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
