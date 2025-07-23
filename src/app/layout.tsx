import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "yaricidev",
  description: "Personal blog",
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
          <div className="flex flex-row items-center gap-3 ">
            <span className=" text-white font-thin ">by</span>
            <Image
              src={"/emirlinkedin.avif"}
              width={30}
              height={30}
              className="overflow-hidden rounded-full"
              alt="profile_photo"
            />
          </div>
        </div>
        <div className="flex flex-1  p-8">{children}</div>
      </body>
    </html>
  );
}
