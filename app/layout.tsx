import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
    <html lang="id" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Buang atribut yang disisipkan ekstensi browser sebelum React hydrate */}
        <Script id="strip-extension-attrs" strategy="beforeInteractive">
          {`(function(){
  var attrs=["bis_skin_checked","bis_register","__processed_c6ea889a-dd0f-4973-a1db-d6803d10cfdc__"];
  function clean(root){
    attrs.forEach(function(a){
      if(root.removeAttribute) root.removeAttribute(a);
      var n=root.querySelectorAll?root.querySelectorAll("["+a+"]"):[];
      for(var i=0;i<n.length;i++) n[i].removeAttribute(a);
    });
  }
  clean(document.documentElement);
  new MutationObserver(function(ms){
    ms.forEach(function(m){
      if(m.type==="attributes"&&attrs.indexOf(m.attributeName)>-1){m.target.removeAttribute(m.attributeName);}
      m.addedNodes&&m.addedNodes.forEach(function(nd){if(nd.nodeType===1)clean(nd);});
    });
  }).observe(document.documentElement,{attributes:true,childList:true,subtree:true});
})();`}
        </Script>
        {children}
      </body>
    </html>
  );
}
