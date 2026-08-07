import { Metadata } from "next";
import Link from "next/link";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  title: "Privacy Policy | Mura App",
  description: "Privacy Policy for Mura - The ultimate visual study companion. Learn how we handle your notes, PDFs, camera OCR, and on-device Local AI.",
  openGraph: {
    title: "Privacy Policy | Mura App",
    description: "Learn how Mura protects your study data, notes, and documents with on-device local AI.",
    type: "website",
  },
};

export default function MuraPrivacyPolicy() {
  return (
    // fixed container to take over viewport, styled with Mura's signature dark gray and orange tones
    <div className="fixed inset-0 w-screen h-screen overflow-y-auto bg-[#1e2127] z-[9999] text-gray-300 font-sans antialiased selection:bg-[#ff7f50]/30 selection:text-[#ff7f50]/20">
      
      {/* Background radial glows using Mura's orange theme */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ff7f50]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[1100px] mx-auto min-h-full flex flex-col px-4 py-8 md:py-16 relative">
        
        {/* Navigation / Header Brand */}
        <header className="flex justify-between items-center pb-8 border-b border-gray-800/80 mb-10">
          <Link 
            href="/"
            className="flex items-center gap-2 group transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ff7f50] to-amber-500 flex items-center justify-center font-bold text-white shadow-lg shadow-[#ff7f50]/20 group-hover:scale-105 transition-transform">
              M
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-[#ff7f50] transition-colors">
              mura
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
          <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-8 bg-[#282c35]/80 border border-gray-800/80 rounded-2xl p-5 backdrop-blur-md">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-4 px-2">
              On this page
            </h4>
            <nav className="flex flex-col gap-1 text-sm">
              <a href="#summary" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-[#ff7f50]">
                Quick Summary
              </a>
              <a href="#local-ai" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-[#ff7f50]">
                1. On-Device Local AI
              </a>
              <a href="#canvas" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-[#ff7f50]">
                2. Thinking Canvas & Notes
              </a>
              <a href="#importers" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-[#ff7f50]">
                3. Camera OCR & Importers
              </a>
              <a href="#spaced-rep" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-[#ff7f50]">
                4. Spaced Repetition & Streaks
              </a>
              <a href="#data-control" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-[#ff7f50]">
                5. Data Lifecycle & Control
              </a>
              <a href="#third-parties" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-[#ff7f50]">
                6. Third-Party Services
              </a>
              <a href="#contact" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-[#ff7f50]">
                7. Contact & Rights
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
                Active Document
              </span>
              <h1 className="font-black text-3xl md:text-5xl text-white tracking-tight mb-3 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-sm text-gray-400">
                Last Updated: August 7, 2026 • Legal &amp; technical privacy disclosure for the **mura** mobile application
              </p>
            </div>

            <div className="space-y-10 text-gray-300 leading-relaxed text-[15px] md:text-base">
              
              <p className="text-gray-200">
                Welcome to **mura** (the &quot;Application&quot;), the ultimate visual study companion designed to turn your raw notes, PDFs, articles, and lectures into interactive mindmaps and active recall flashcards. Because learning is a deeply personal process, we believe your data should remain strictly yours. This Privacy Policy outlines our commitment to transparency, security, and offline-first processing.
              </p>

              {/* Quick Summary Callout */}
              <section id="summary" className="bg-gradient-to-br from-[#232936] to-[#1e2127] border border-gray-800 p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr from-transparent to-[#ff7f50]/10 rounded-bl-3xl pointer-events-none" />
                <h3 className="font-bold text-lg text-white mb-3 flex items-center gap-2">
                  <span className="text-[#ff7f50]">⚡</span> Quick Privacy Summary
                </h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-[#ff7f50] font-bold">•</span>
                    <span><strong>Local‑First AI:</strong> All generation of study cards and mindmaps runs offline on your device using a local LLaMA 3.2 engine. Your documents and notes never leave your phone.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#ff7f50] font-bold">•</span>
                    <span><strong>Optional Cloud Sync:</strong> If you choose to enable Cloud Mode for faster batch card generation, only the explicitly selected inputs are securely processed on our servers and never retained.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#ff7f50] font-bold">•</span>
                    <span><strong>100% Control:</strong> Deleting the app immediately clears all locally stored mindmaps, flashcards, and notes. No account creation is required to use mura offline.</span>
                  </li>
                </ul>
              </section>

              {/* Section 1 */}
              <section id="local-ai" className="scroll-mt-6">
                <h2 className="font-extrabold text-xl md:text-2xl text-white mb-3 flex items-center gap-3 border-b border-gray-800/60 pb-2">
                  <span className="text-[#ff7f50]">01</span> On-Device Local AI Engine
                </h2>
                <p className="mb-3">
                  mura is built on an offline-first architecture. It features an integrated on-device Large Language Model (powered by the **LLaMA 3.2** architecture) to process notes and convert study materials into active recall flashcards.
                </p>
                <div className="bg-[#232936] border border-gray-800 p-5 rounded-xl mb-3">
                  <h4 className="font-bold text-white mb-1.5 text-sm uppercase tracking-wider text-[#ff7f50]">
                    Local AI Data Boundary
                  </h4>
                  <p className="text-sm text-gray-300">
                    When in Local Mode, the extraction of concepts, question-answer pairings, and course outlines happens locally on your device&apos;s silicon. None of your text inputs, uploaded files, or generated flashcards are transmitted to mura servers or any third-party AI provider.
                  </p>
                </div>
                <p>
                  <strong>Optional Cloud Mode:</strong> To support faster, batch processing of large materials (like complete textbook chapters), you may manually toggle Cloud Mode. When Cloud Mode is active, chosen text segments are sent encrypted via HTTPS to our secure API endpoints to run models server-side. These requests are stateless; we do not store, log, or use this content to train public or private models.
                </p>
              </section>

              {/* Section 2 */}
              <section id="canvas" className="scroll-mt-6">
                <h2 className="font-extrabold text-xl md:text-2xl text-white mb-3 flex items-center gap-3 border-b border-gray-800/60 pb-2">
                  <span className="text-[#ff7f50]">02</span> The Thinking Canvas &amp; Note Data
                </h2>
                <p className="mb-3">
                  The Thinking Canvas maps out notes and topics into a visual graph structure. Each note node, relationship link, and flashcard card deck created is stored in a local, sandboxed relational database on your mobile device.
                </p>
                <p>
                  mura does not harvest, analyze, or sync your mindmaps to a global server unless you explicitly enable a cloud backup or collaboration feature. The conceptual connections and mental maps you draw remain strictly private to you.
                </p>
              </section>

              {/* Section 3 */}
              <section id="importers" className="scroll-mt-6">
                <h2 className="font-extrabold text-xl md:text-2xl text-white mb-3 flex items-center gap-3 border-b border-gray-800/60 pb-2">
                  <span className="text-[#ff7f50]">03</span> Camera Access &amp; Smart Importers
                </h2>
                <p className="mb-4">
                  To streamline studying, mura includes several importer tools. Here is how they handle your data:
                </p>
                <div className="space-y-4">
                  <div className="bg-[#232936]/50 border border-gray-800 p-5 rounded-xl">
                    <h4 className="font-bold text-white mb-1.5 text-sm uppercase tracking-wider text-amber-500">
                      Camera OCR Scanner
                    </h4>
                    <p className="text-sm text-gray-300">
                      mura requests access to your device&apos;s camera to capture text highlights or pages of textbooks. The Optical Character Recognition (OCR) is performed in real-time on-device. Images taken via the scanner are processed to extract text and are not saved to your photo library or uploaded to any server.
                    </p>
                  </div>
                  
                  <div className="bg-[#232936]/50 border border-gray-800 p-5 rounded-xl">
                    <h4 className="font-bold text-white mb-1.5 text-sm uppercase tracking-wider text-amber-500">
                      PDF Document Importer
                    </h4>
                    <p className="text-sm text-gray-300">
                      When you upload a PDF (e.g., lecture slides or book chapters), the file is read and stored inside the app&apos;s secure local sandbox. Content parsing is handled entirely offline unless Cloud Mode is explicitly active.
                    </p>
                  </div>

                  <div className="bg-[#232936]/50 border border-gray-800 p-5 rounded-xl">
                    <h4 className="font-bold text-white mb-1.5 text-sm uppercase tracking-wider text-amber-500">
                      YouTube &amp; Webpage Reader
                    </h4>
                    <p className="text-sm text-gray-300">
                      If you paste a YouTube link or web article URL, the application makes a fetch request (either directly or via a proxy script) to download the public transcripts or article markup. This public content is parsed locally on your device to create flashcard modules and nodes.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section id="spaced-rep" className="scroll-mt-6">
                <h2 className="font-extrabold text-xl md:text-2xl text-white mb-3 flex items-center gap-3 border-b border-gray-800/60 pb-2">
                  <span className="text-[#ff7f50]">04</span> Spaced Repetition, Mastery Stats &amp; Notifications
                </h2>
                <p className="mb-3">
                  mura calculates your optimal review times using a custom spaced repetition algorithm. The app collects and maintains statistics including:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 mb-4">
                  <li>Study streaks and average accuracy.</li>
                  <li>Topic Mastery ratings (from &quot;Learning&quot; to &quot;Mastered&quot;).</li>
                  <li>Review frequency and historical card response logs.</li>
                </ul>
                <p className="mb-3">
                  <strong>Notifications:</strong> We ask for your permission to send local push notifications to alert you when cards are ready for review and to help you maintain your daily learning streaks. These notifications are scheduled and triggered entirely on-device by the operating system—no external notification servers are used.
                </p>
              </section>

              {/* Section 5 */}
              <section id="data-control" className="scroll-mt-6">
                <h2 className="font-extrabold text-xl md:text-2xl text-white mb-3 flex items-center gap-3 border-b border-gray-800/60 pb-2">
                  <span className="text-[#ff7f50]">05</span> Data Retention &amp; User Control
                </h2>
                <p className="mb-3">
                  Because mura is built to run offline, your study environment is under your direct control:
                </p>
                <div className="bg-[#232936]/30 border border-gray-800 p-5 rounded-xl">
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex gap-2">
                      <span className="text-[#ff7f50] font-bold">•</span>
                      <span><strong>Data Deletion:</strong> You can wipe all flashcards, mindmaps, and uploaded documents at any time by selecting &quot;Clear All Data&quot; in the application settings or by uninstalling the application. This action is irreversible.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#ff7f50] font-bold">•</span>
                      <span><strong>Exporting:</strong> You can export your data database or markdown representations of your cards at any time via the export menu to keep a physical copy of your studies.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 6 */}
              <section id="third-parties" className="scroll-mt-6">
                <h2 className="font-extrabold text-xl md:text-2xl text-white mb-3 flex items-center gap-3 border-b border-gray-800/60 pb-2">
                  <span className="text-[#ff7f50]">06</span> Third-Party Services
                </h2>
                <p className="mb-3">
                  mura does not share your study notes with advertisers, data brokers, or trackers. The only scenarios where third-party APIs are contacted are:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-2 text-sm text-gray-300">
                  <li>
                    <strong>Cloud Mode (Opt-in):</strong> Safe, encrypted API queries to process cards on cloud nodes.
                  </li>
                  <li>
                    <strong>YouTube API / Public Fetch:</strong> To gather public video transcripts when you request summarizing a YouTube URL.
                  </li>
                  <li>
                    <strong>App Store / Play Store Analytics:</strong> Basic, anonymized telemetry (crash reports, installation events) provided by Apple and Google to help us maintain app stability.
                  </li>
                </ul>
              </section>

              {/* Section 7 */}
              <section id="contact" className="scroll-mt-6">
                <h2 className="font-extrabold text-xl md:text-2xl text-white mb-3 flex items-center gap-3 border-b border-gray-800/60 pb-2">
                  <span className="text-[#ff7f50]">07</span> Contact &amp; Legal Compliance
                </h2>
                <p className="mb-4">
                  mura complies with GDPR (General Data Protection Regulation) and CCPA (California Consumer Privacy Act) guidelines regarding your personal data. Because we do not store your study logs on our servers, your right to access, edit, or delete your information is exercised directly by you through the application&apos;s local settings interface.
                </p>
                <p>
                  For any privacy inquiries, feedback on local AI performance, or security compliance questions, please contact our team:
                </p>
                <div className="bg-[#232936] p-5 rounded-xl border border-gray-800 mt-4 text-sm">
                  <p className="font-semibold text-white mb-1">Mura App Development Team</p>
                  <p>Email: <a href="mailto:privacy@yarici.dev" className="text-[#ff7f50] hover:underline">privacy@yarici.dev</a></p>
                  <p>Website: <a href="https://yarici.dev" target="_blank" rel="noopener noreferrer" className="text-[#ff7f50] hover:underline">yarici.dev</a></p>
                </div>
              </section>

            </div>
          </main>

        </div>

      </div>
    </div>
  );
}
