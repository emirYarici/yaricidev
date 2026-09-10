import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Destek & İletişim | Renove (SpatialTour Pro)",
  description: "Renove (SpatialTour Pro) iOS LiDAR oda tarama ve 3D mekan modelleme uygulaması için resmi destek, iletişim ve sıkça sorulan sorular sayfası.",
  openGraph: {
    title: "Destek & İletişim | Renove (SpatialTour Pro)",
    description: "Renove kullanım kılavuzu, cihaz uyumluluk listesi, SSS ve geliştirici iletişim desteği.",
    type: "website",
  },
};

export default function RenoveSupport() {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-y-auto bg-[#0b0e14] z-[9999] text-gray-300 font-sans antialiased selection:bg-amber-500/30 selection:text-amber-300">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-yellow-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-[1100px] mx-auto min-h-full flex flex-col px-4 py-8 md:py-16 relative">
        {/* Navigation / Header Brand */}
        <header className="flex justify-between items-center pb-8 border-b border-gray-800/80 mb-10">
          <Link href="/" className="flex items-center gap-3 group transition-all">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              R
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                Renove
              </span>
              <span className="ml-2 text-xs font-semibold text-amber-500 tracking-wider uppercase bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                Destek & Yardım
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <Link href="/privacy/renove" className="hover:text-white transition-colors">
              Gizlilik Politikası
            </Link>
            <Link
              href="/"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Geri Dön
            </Link>
          </div>
        </header>

        {/* Two-Column Document Layout */}
        <div className="flex flex-col lg:flex-row gap-10 items-start flex-1">
          {/* Left Sticky Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-8 bg-[#121620]/90 border border-gray-800/80 rounded-2xl p-5 backdrop-blur-md">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-4 px-2">
              Destek Menüsü
            </h4>
            <nav className="flex flex-col gap-1 text-sm">
              <a href="#contact" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-amber-400">
                1. Doğrudan İletişim
              </a>
              <a href="#hardware" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-amber-400">
                2. Cihaz & Donanım Uyumluluğu
              </a>
              <a href="#faq" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-amber-400">
                3. Sıkça Sorulan Sorular (SSS)
              </a>
              <a href="#data-rights" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-amber-400">
                4. Hesap ve Veri Yönetimi
              </a>
            </nav>

            <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
              ⚡ <strong>Hızlı Yanıt Garantisi:</strong> E-posta talepleriniz en geç 24 saat içerisinde yanıtlanır.
            </div>
          </aside>

          {/* Right Main Content */}
          <main className="flex-1 space-y-12 max-w-3xl">
            {/* Header Title */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
                Müşteri ve Danışman Desteği
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Nasıl Yardımcı Olabiliriz?
              </h1>
              <p className="text-gray-400 text-base leading-relaxed">
                Renove (SpatialTour Pro) ile gayrimenkul taraması yaparken, 3D modellerinizi incelerken veya ilan paketlerinizi müşterilerinizle paylaşırken karşılaştığınız tüm sorular için buradayız.
              </p>
            </div>

            {/* 1. Direct Contact Card */}
            <section id="contact" className="p-6 rounded-2xl bg-[#121620] border border-amber-500/30 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📬</span>
                <h3 className="font-bold text-xl text-white">Doğrudan İletişim Kanalları</h3>
              </div>
              <p className="text-sm text-gray-300">
                Teknik problemler, özellik önerileri veya iş ortaklığı talepleri için aşağıdaki iletişim kanallarından bize ulaşabilirsiniz:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 space-y-1">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Destek E-Postası</span>
                  <p className="text-base font-bold text-amber-400">
                    <a href="mailto:emir@yarici.dev" className="hover:underline">emir@yarici.dev</a>
                  </p>
                  <p className="text-xs text-gray-400">Teknik destek ve geri bildirimler</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 space-y-1">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Geliştirici Web Sitesi</span>
                  <p className="text-base font-bold text-white">
                    <a href="https://yarici.dev" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                      yarici.dev ↗
                    </a>
                  </p>
                  <p className="text-xs text-gray-400">Emir Yarıcı / Yomme</p>
                </div>
              </div>
            </section>

            {/* 2. Hardware Compatibility */}
            <section id="hardware" className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-amber-400">2.</span> Donanım ve Cihaz Uyumluluğu
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm">
                Renove, Apple&apos;ın gelişmiş <strong>RoomPlan</strong> mimari tarama çerçevesini kullanır. Mekanları gerçek zamanlı LiDAR ile 3 boyutlu taramak için cihazınızda yerleşik LiDAR Tarayıcı bulunmalıdır:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="p-4 rounded-xl bg-gray-900/40 border border-gray-800 space-y-2">
                  <h4 className="font-bold text-amber-400">📱 Desteklenen iPhone Modelleri:</h4>
                  <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
                    <li>iPhone 16 Pro &amp; iPhone 16 Pro Max</li>
                    <li>iPhone 15 Pro &amp; iPhone 15 Pro Max</li>
                    <li>iPhone 14 Pro &amp; iPhone 14 Pro Max</li>
                    <li>iPhone 13 Pro &amp; iPhone 13 Pro Max</li>
                    <li>iPhone 12 Pro &amp; iPhone 12 Pro Max</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-gray-900/40 border border-gray-800 space-y-2">
                  <h4 className="font-bold text-amber-400">📟 Desteklenen iPad Modelleri:</h4>
                  <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
                    <li>iPad Pro 11 inç (2. Nesil ve sonrası)</li>
                    <li>iPad Pro 12.9 inç (4. Nesil ve sonrası)</li>
                    <li>iPad Pro 13 inç (M4 ve sonrası)</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#121620] border border-gray-800 text-xs text-gray-400">
                💡 <em>LiDAR sensörü olmayan cihazlarda:</em> Uygulamadaki <strong>&quot;✦ ÖRNEK 3D PORTFÖYÜ İNCELE&quot;</strong> vitrini ve web paylaşımları üzerinden taranmış modeller, 2D kat planları ve oda boyutları tam etkileşimli olarak incelenebilir.
              </div>
            </section>

            {/* 3. FAQ */}
            <section id="faq" className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-amber-400">3.</span> Sıkça Sorulan Sorular (SSS)
              </h2>

              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-gray-900/40 border border-gray-800 space-y-2">
                  <h3 className="font-bold text-white text-base">Oda taraması yaparken nelere dikkat etmeliyim?</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Mekanın iyi aydınlatılmış olduğundan emin olun. Taramaya odanın bir köşesinden başlayıp kamerayı yavaşça duvarlar, kapılar ve pencereler boyunca gezdirin. Köşeleri ve süpürgelik hatlarını kameraya gösterdiğinizde sistem duvarları otomatik olarak yakalayacaktır.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-gray-900/40 border border-gray-800 space-y-2">
                  <h3 className="font-bold text-white text-base">Taranan mülkü müşterilerimle nasıl paylaşırım?</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    İlan paketi oluştuktan sonra tek dokunuşla; WhatsApp tanıtım kartı, yüksek çözünürlüklü 2D mimari kat planı (SVG) veya müşterilerin tarayıcıda doğrudan gezebileceği 3D web tur linki oluşturabilirsiniz.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-gray-900/40 border border-gray-800 space-y-2">
                  <h3 className="font-bold text-white text-base">Ölçümler ve metrekare hesaplamaları ne kadar hassastır?</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Apple LiDAR donanımı milimetre hassasiyetinde derinlik ölçümü yapar. Uygulama net süpürülebilir alan (net taban alanı) ve duvar kalınlığı tahminlerini uluslararası mimari standartlara uygun olarak hesaplar.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-gray-900/40 border border-gray-800 space-y-2">
                  <h3 className="font-bold text-white text-base">Hesabımı ve verilerimi nasıl silebilirim?</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Uygulama ana ekranında sağ üstteki Profil simgesine dokunun. Danışman panelinin en altında yer alan &quot;Hesabımı ve Tüm Verilerimi Sil&quot; butonuna tıklayıp onayladığınızda tüm kayıtlarınız, taranan 3D modelleriniz ve profiliniz sunucularımızdan anında ve kalıcı olarak silinir.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Data Rights */}
            <section id="data-rights" className="space-y-4 border-t border-gray-800 pt-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-amber-400">4.</span> Gizlilik ve Veri Güvenliği
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm">
                Kişisel verilerinizin nasıl işlendiği ve korunduğu hakkında detaylı bilgi almak için lütfen{" "}
                <Link href="/privacy/renove" className="text-amber-400 underline hover:text-amber-300">
                  Gizlilik Politikası Belgesi
                </Link>
                &apos;ni inceleyin.
              </p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
