import { Metadata } from "next";
import Link from "next/link";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  title: "Privacy Policy | Snatched App",
  description: "Privacy Policy for the Snatched App - learn how we protect your personal and facial data.",
  openGraph: {
    title: "Privacy Policy | Snatched App",
    description: "Learn how we protect and process your personal and facial data on-device.",
    type: "website",
  },
};

export default function SnatchedPrivacyPolicy() {
  return (
    // Fixed container to completely take over the viewport and override parent layout background/dimensions
    <div className="fixed inset-0 w-screen h-screen overflow-y-auto bg-[#0a0b0e] z-[9999] text-gray-300 font-sans antialiased selection:bg-rose-500/30 selection:text-rose-200">
      
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[1100px] mx-auto min-h-full flex flex-col px-4 py-8 md:py-16 relative">
        
        {/* Navigation / Header Brand */}
        <header className="flex justify-between items-center pb-8 border-b border-gray-800/80 mb-10">
          <Link 
            href="/"
            className="flex items-center gap-2 group transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 to-violet-600 flex items-center justify-center font-bold text-white shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
              S
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-rose-400 transition-colors">
              Snatched
            </span>
          </Link>
          
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
        </header>

        {/* Two-Column Document Layout */}
        <div className="flex flex-col lg:flex-row gap-10 items-start flex-1">
          
          {/* Left Sticky Sidebar (Navigation Index) */}
          <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-8 bg-[#111218]/60 border border-gray-800/80 rounded-2xl p-5 backdrop-blur-md">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-4 px-2">
              On this page
            </h4>
            <nav className="flex flex-col gap-1 text-sm">
              <a href="#summary" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-rose-500">
                Quick Summary
              </a>
              <a href="#camera" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-rose-500">
                1. Camera & Facial Data
              </a>
              <a href="#data-collected" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-rose-500">
                2. Information We Collect
              </a>
              <a href="#how-used" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-rose-500">
                3. How We Use Data
              </a>
              <a href="#retention-deletion" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-rose-500">
                4. Retention & Deletion
              </a>
              <a href="#third-parties" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-rose-500">
                5. Third-Party Services
              </a>
              <a href="#compliance" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-rose-500">
                6. GDPR & CCPA Rights
              </a>
              <a href="#children" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-rose-500">
                7. Children&apos;s Privacy
              </a>
              <a href="#contact" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-rose-500">
                8. Contact Info
              </a>
            </nav>
            <div className="mt-6 pt-5 border-t border-gray-800 flex justify-center">
              <PrintButton />
            </div>
          </aside>

          {/* Right Main Content Container */}
          <main className="flex-1 w-full bg-[#111218]/80 border border-gray-800 rounded-3xl p-6 md:p-12 shadow-2xl relative backdrop-blur-md">
            
            {/* Title */}
            <div className="border-b border-gray-800/80 pb-6 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                Active Document
              </span>
              <h1 className="font-black text-3xl md:text-5xl text-white tracking-tight mb-3 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-sm text-gray-400">
                Last Updated: June 12, 2026 • Legal compliance document for **Snatched** mobile app
              </p>
            </div>

            <div className="space-y-10 text-gray-300 leading-relaxed text-[15px] md:text-base">
              
              <p className="text-gray-200">
                Welcome to **Snatched** (the &quot;Application&quot;), a facial exercise and toning mobile application. We are committed to protecting your privacy and ensuring a secure, transparent experience. This policy details how we handle information in connection with the Application.
              </p>

              {/* Quick Summary Callout */}
              <section id="summary" className="bg-gradient-to-br from-[#1b1c24] to-[#14151b] border border-gray-800 p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr from-transparent to-rose-500/10 rounded-bl-3xl pointer-events-none" />
                <h3 className="font-bold text-lg text-white mb-3 flex items-center gap-2">
                  <span className="text-rose-400">⚡</span> Quick Privacy Summary
                </h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Facial Posture Analysis:</strong> All camera features process data in real-time, <strong>locally on your device</strong>. We do not store or transmit raw video or facial details.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>No Selling:</strong> We never rent, monetize, or sell user records to third parties.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Account Deletion:</strong> Fully managed data wipes are available right inside the settings dashboard.</span>
                  </li>
                </ul>
              </section>

              {/* Section 1 */}
              <section id="camera" className="scroll-mt-6">
                <h2 className="font-extrabold text-xl md:text-2xl text-white mb-3 flex items-center gap-3 border-b border-gray-800/60 pb-2">
                  <span className="text-rose-400">01</span> Camera Access & Facial Data
                </h2>
                <p className="mb-3">
                  Snatched requires permission to access your device&apos;s camera to track facial exercises, analyze facial alignment, and provide real-time instructions during posture sessions.
                </p>
                <div className="bg-[#181920] border border-gray-800 p-5 rounded-xl mb-3">
                  <h4 className="font-bold text-white mb-1.5 text-sm uppercase tracking-wider text-rose-300">
                    Local Device Execution Policy
                  </h4>
                  <p className="text-sm text-gray-300">
                    All video capture, frame analysis, and facial alignment metrics are calculated strictly <strong>on-device</strong>. We do not transfer or sync your photos, visual imagery, or facial structural details to external servers. Data exists momentarily in temporary memory during exercise sessions and is discarded immediately after.
                  </p>
                </div>
                <p className="text-sm text-gray-400">
                  Camera permissions can be turned off in your system settings at any time. Toggling this off stops the real-time posture guidance functions but keeps tutorials readable.
                </p>
              </section>

              {/* Section 2 */}
              <section id="data-collected" className="scroll-mt-6">
                <h2 className="font-extrabold text-xl md:text-2xl text-white mb-3 flex items-center gap-3 border-b border-gray-800/60 pb-2">
                  <span className="text-rose-400">02</span> Information We Collect
                </h2>
                <p className="mb-4">
                  We collect certain data points to run and optimize Snatched. This includes:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#14151b] rounded-xl border border-gray-800/80">
                    <h4 className="font-bold text-white text-sm mb-1">Account Profiles</h4>
                    <p className="text-xs text-gray-400">
                      Email address, custom display name, and workout goals configured upon registry.
                    </p>
                  </div>
                  <div className="p-4 bg-[#14151b] rounded-xl border border-gray-800/80">
                    <h4 className="font-bold text-white text-sm mb-1">Anonymized Diagnostics</h4>
                    <p className="text-xs text-gray-400">
                      Crash traces, speed metrics, device specifications, and OS versions for troubleshooting.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="how-used" className="scroll-mt-6">
                <h2 className="font-extrabold text-xl md:text-2xl text-white mb-3 flex items-center gap-3 border-b border-gray-800/60 pb-2">
                  <span className="text-rose-400">03</span> How We Use Your Information
                </h2>
                <p className="mb-3">
                  Collected logs are used to maintain, protect, and grow the application:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Building customized workout paths based on your select criteria.</li>
                  <li>Tracking completion logs, milestones, and daily streaks.</li>
                  <li>Diagnosing app bugs and upgrading platform architecture.</li>
                  <li>Delivering security updates and replying to support requests.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="retention-deletion" className="scroll-mt-6">
                <h2 className="font-extrabold text-xl md:text-2xl text-white mb-3 flex items-center gap-3 border-b border-gray-800/60 pb-2">
                  <span className="text-rose-400">04</span> Data Retention & Deletion
                </h2>
                <p className="mb-4">
                  We save your user metadata as long as your profile remains active.
                </p>
                <div className="bg-[#181920] border border-gray-800 p-5 rounded-xl">
                  <h4 className="font-bold text-white mb-2 text-sm">How to close and wipe your account:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                    <li>Launch Snatched and tap on <strong>Profile Settings</strong>.</li>
                    <li>Select <strong>Account Management</strong>.</li>
                    <li>Choose <strong>Delete My Account</strong> and submit.</li>
                  </ol>
                  <p className="mt-3 text-xs text-gray-400 border-t border-gray-800 pt-3">
                    You can also request account removal by reaching out via email at <a href="mailto:netlesocial@gmail.com" className="text-rose-400 hover:underline">netlesocial@gmail.com</a>. Wipes are processed and finalized within 30 days.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section id="third-parties" className="scroll-mt-6">
                <h2 className="font-extrabold text-xl md:text-2xl text-white mb-3 flex items-center gap-3 border-b border-gray-800/60 pb-2">
                  <span className="text-rose-400">05</span> Third-Party Services
                </h2>
                <p className="mb-3">
                  We link to reliable vendor APIs to deliver transaction and tracking utilities:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mb-3 text-sm">
                  <li>
                    <strong>Apple Store Operations:</strong> Payments, updates, and active subscription states are processed directly by Apple.
                  </li>
                  <li>
                    <strong>Diagnostics Tools:</strong> Anonymized usage logs might compile via Firebase or Mixpanel for quality maintenance.
                  </li>
                </ul>
              </section>

              {/* Section 6 */}
              <section id="compliance" className="scroll-mt-6">
                <h2 className="font-extrabold text-xl md:text-2xl text-white mb-3 flex items-center gap-3 border-b border-gray-800/60 pb-2">
                  <span className="text-rose-400">06</span> GDPR & CCPA Compliance
                </h2>
                <p className="mb-3">
                  Under the GDPR (General Data Protection Regulation) and California Consumer Privacy Act (CCPA), you retain full rights over your profiles:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                  <li><strong>Access:</strong> Request exports of database records associated with you.</li>
                  <li><strong>Rectification:</strong> Request correction of inaccurate values.</li>
                  <li><strong>Erasure:</strong> Request absolute removal of data files.</li>
                  <li><strong>Opt-Out:</strong> Object to processing procedures.</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section id="children" className="scroll-mt-6">
                <h2 className="font-extrabold text-xl md:text-2xl text-white mb-3 flex items-center gap-3 border-b border-gray-800/60 pb-2">
                  <span className="text-rose-400">07</span> Children&apos;s Privacy
                </h2>
                <p>
                  Snatched is not configured or intended for children under 13. We do not knowingly hold or record profiles belonging to minors under 13. If any registry overlaps by mistake, we will execute immediate deletions.
                </p>
              </section>

              {/* Section 8 */}
              <section id="contact" className="scroll-mt-6">
                <h2 className="font-extrabold text-xl md:text-2xl text-white mb-3 flex items-center gap-3 border-b border-gray-800/60 pb-2">
                  <span className="text-rose-400">08</span> Contact Us
                </h2>
                <p className="mb-3">
                  If you have queries or request data operations under this Policy, email:
                </p>
                <p className="font-bold text-white bg-[#14151b] border border-gray-800 inline-block px-4 py-2.5 rounded-lg text-sm">
                  Email: <a href="mailto:netlesocial@gmail.com" className="text-rose-400 hover:underline">netlesocial@gmail.com</a>
                </p>
              </section>

            </div>

            {/* Bottom Footer Details */}
            <div className="border-t border-gray-800 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
              <span>© {new Date().getFullYear()} Snatched. All rights reserved.</span>
              <div className="flex gap-4">
                <Link href="/" className="hover:text-gray-400 transition-colors">Home</Link>
                <span>•</span>
                <span className="text-gray-600">Secure Processing</span>
              </div>
            </div>

          </main>
        </div>

      </div>
    </div>
  );
}
