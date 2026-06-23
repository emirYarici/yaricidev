import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "yaricidev",
  description: "Emir Yarıcı - Personal blog",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Take a look!",
    description: "Personal blog",
    url: "https://yaricidev.com", // or your homepage
    type: "article",
    images: [
      {
        url: "https://yaricidev.com/apple-touch-icon.png", // must be full public URL
        width: 1200,
        height: 630,
        alt: "logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Take a look!",
    description: "Personal blog",
    images: ["https://yaricidev.com/favicon.ico"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="max-w-[700px] mx-auto bg-red-800 py-10">
        <div className="flex  h-9 w-full mx-auto justify-end px-9 ">
          <Link
            href={
              "https://www.linkedin.com/in/emir-yar%C4%B1c%C4%B1-440629222/"
            }
            className="flex flex-row items-center gap-3 "
          >
            <span className=" text-white font-thin ">by</span>
            <Image
              src="/emirlinkedin.png"
              width={30}
              height={30}
              className="overflow-hidden rounded-full"
              alt="profile_photo"
            />
          </Link>
        </div>
        <div className="flex flex-1  p-8">{children}</div>
        <footer className="flex flex-col items-center justify-center gap-2 pb-10 pt-6 border-t border-white/5">
          <p className="text-xs text-white/40 text-center">
            TempoType is a macOS menu bar app that turns your keystrokes into generative ambient soundscapes.
          </p>
          <a
            href="/tempotype.dmg"
            download
            className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-primary transition-colors duration-200 font-medium"
          >
            <span>Download for macOS (.dmg)</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </footer>
      </body>
    </html>
  );
}
