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
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <head>
        <title>Your Site Title</title>
        <meta name="yaricidev" content="Take a look my friend" />
        <link rel="icon" href="/yaricidevlogo.svg" />
        {/* You can use .png or .svg as well */}
      </head>
      <body className="max-w-[700px] mx-auto bg-red-800 py-10">
        <header className="flex  h-9 w-full mx-auto justify-end px-9 ">
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
        </header>
        <div className="flex flex-1  p-8">{children}</div>
      </body>
    </html>
  );
}
