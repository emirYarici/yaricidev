import { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../privacy/mura/PrintButton";

export const metadata: Metadata = {
  title: "Support & Contact | Mura App",
  description:
    "Get support and help for Mura - The ultimate visual study companion. Contact us for assistance, feature requests, or technical support.",
  openGraph: {
    title: "Support & Contact | Mura App",
    description:
      "Get support, send feedback, or submit inquiries for Mura.",
    type: "website",
  },
};

export default function MuraSupport() {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-y-auto bg-[#1e2127] z-[9999] text-gray-300 font-sans antialiased selection:bg-[#ff7f50]/30 selection:text-[#ff7f50]">
      {/* Background radial glows using Mura's orange theme */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ff7f50]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[1100px] mx-auto min-h-full flex flex-col px-4 py-8 md:py-16 relative">
        {/* Navigation / Header Brand */}
        <header className="flex justify-between items-center pb-8 border-b border-gray-800/80 mb-10">
          <Link href="/" className="flex items-center gap-2 group transition-all">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ff7f50] to-amber-500 flex items-center justify-center font-bold text-white shadow-lg shadow-[#ff7f50]/20 group-hover:scale-105 transition-transform">
              M
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-[#ff7f50] transition-colors">
              mura
            </span>
          </Link>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <Link
              href="/privacy/mura"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </header>

        {/* Two-Column Document Layout */}
        <div className="flex flex-col lg:flex-row gap-10 items-start flex-1">
          {/* Left Sticky Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-8 bg-[#282c35]/80 border border-gray-800/80 rounded-2xl p-5 backdrop-blur-md">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-4 px-2">
              Support Navigation
            </h4>
            <nav className="flex flex-col gap-1 text-sm">
              <a
                href="#contact-info"
                className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-[#ff7f50]"
              >
                1. Direct Contact Information
              </a>
              <a
                href="#faq"
                className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-[#ff7f50]"
              >
                2. Frequently Asked Questions
              </a>
              <a
                href="#privacy"
                className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-[#ff7f50]"
              >
                3. Privacy & Data Support
              </a>
            </nav>
            <div className="mt-6 pt-5 border-t border-gray-800 flex justify-center">
              <PrintButton />
            </div>
          </aside>

          {/* Right Main Content Container */}
          <main className="flex-1 w-full bg-[#282c35]/90 border border-gray-800 rounded-3xl p-6 md:p-12 shadow-2xl relative backdrop-blur-md">
            {/* Title Block */}
            <div className="border-b border-gray-800/80 pb-6 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff7f50]/10 text-[#ff7f50] text-xs font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff7f50] animate-pulse" />
                App Support &amp; Help Center
              </span>
              <h1 className="font-black text-3xl md:text-5xl text-white tracking-tight mb-3 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Mura Support
              </h1>
              <p className="text-sm text-gray-400">
                We&apos;re here to help you get the most out of Mura. Contact our team directly or browse common questions below.
              </p>
            </div>

            <div className="space-y-10 text-gray-300 leading-relaxed text-[15px] md:text-base">
              {/* Contact Information Section */}
              <section id="contact-info" className="scroll-mt-6">
                <h2 className="font-extrabold text-xl md:text-2xl text-white mb-4 flex items-center gap-3 border-b border-gray-800/60 pb-2">
                  <span className="text-[#ff7f50]">01</span> Direct Contact Options
                </h2>
                <p className="mb-4">
                  If you are experiencing issues with Mura, have feedback, or need help with your account or local data, please reach out directly:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <div className="bg-[#232936] p-6 rounded-2xl border border-gray-800 flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#ff7f50]/10 flex items-center justify-center text-[#ff7f50] mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-lg text-white mb-1">Email Support</h3>
                      <p className="text-sm text-gray-400 mb-4">
                        Send us an email and we will get back to you within 24–48 hours.
                      </p>
                    </div>
                    <a
                      href="mailto:emiryarici9@gmail.com"
                      className="inline-flex items-center gap-2 text-[#ff7f50] font-semibold hover:underline text-sm"
                    >
                      emiryarici9@gmail.com
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>

                  <div className="bg-[#232936] p-6 rounded-2xl border border-gray-800 flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </div>
                      <h3 className="font-bold text-lg text-white mb-1">Developer Website</h3>
                      <p className="text-sm text-gray-400 mb-4">
                        Visit developer page to check updates and news.
                      </p>
                    </div>
                    <a
                      href="https://yarici.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-amber-500 font-semibold hover:underline text-sm"
                    >
                      yarici.dev
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq" className="scroll-mt-6">
                <h2 className="font-extrabold text-xl md:text-2xl text-white mb-4 flex items-center gap-3 border-b border-gray-800/60 pb-2">
                  <span className="text-[#ff7f50]">02</span> Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div className="bg-[#232936]/50 border border-gray-800 p-5 rounded-xl">
                    <h4 className="font-bold text-white mb-2 text-sm">
                      How does Mura process my study notes?
                    </h4>
                    <p className="text-sm text-gray-300">
                      Mura relies primarily on on-device local AI (LLaMA 3.2 engine) to generate active recall cards and mindmaps directly on your device without sending data to external servers.
                    </p>
                  </div>

                  <div className="bg-[#232936]/50 border border-gray-800 p-5 rounded-xl">
                    <h4 className="font-bold text-white mb-2 text-sm">
                      What if I need to restore or delete my local data?
                    </h4>
                    <p className="text-sm text-gray-300">
                      All your data is stored locally in your app&apos;s sandbox. You can clear your data anytime from the in-app settings under &quot;Clear All Data&quot;, or export your cards to markdown format.
                    </p>
                  </div>

                  <div className="bg-[#232936]/50 border border-gray-800 p-5 rounded-xl">
                    <h4 className="font-bold text-white mb-2 text-sm">
                      How can I report a bug or suggest a feature?
                    </h4>
                    <p className="text-sm text-gray-300">
                      You can send bug reports or feature requests directly to <a href="mailto:emiryarici9@gmail.com" className="text-[#ff7f50] hover:underline">emiryarici9@gmail.com</a> with details about your device and operating system version.
                    </p>
                  </div>
                </div>
              </section>

              {/* Privacy & Data Support */}
              <section id="privacy" className="scroll-mt-6">
                <h2 className="font-extrabold text-xl md:text-2xl text-white mb-4 flex items-center gap-3 border-b border-gray-800/60 pb-2">
                  <span className="text-[#ff7f50]">03</span> Privacy &amp; Data Rights Support
                </h2>
                <p className="mb-3">
                  For privacy-related requests or data inquiry rights under GDPR / CCPA, please refer to our full Privacy Policy or email us directly:
                </p>
                <div className="bg-[#232936] p-5 rounded-xl border border-gray-800 text-sm">
                  <p className="mb-3">Email: <a href="mailto:emiryarici9@gmail.com" className="text-[#ff7f50] hover:underline">emiryarici9@gmail.com</a></p>
                  <Link
                    href="/privacy/mura"
                    className="inline-flex items-center gap-1.5 text-xs text-[#ff7f50] font-bold uppercase tracking-wider hover:underline"
                  >
                    Read Mura Privacy Policy &rarr;
                  </Link>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
