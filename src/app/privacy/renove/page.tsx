import { Metadata } from "next";
import Link from "next/link";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Renove (SpatialTour Pro)",
  description: "Renove (SpatialTour Pro) iOS uygulaması için Gizlilik Politikası. Apple LiDAR, RoomPlan sensör verileri, kamera, konum ve kullanıcı verilerinin nasıl korunduğunu öğrenin.",
  openGraph: {
    title: "Gizlilik Politikası | Renove (SpatialTour)",
    description: "Renove, LiDAR oda taraması ve 3D mekan modellerini cihaz üzerinde güvenle işler. Gizlilik ilkelerimizi inceleyin.",
    type: "website",
  },
};

export default function RenovePrivacyPolicy() {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-y-auto bg-[#0b0e14] z-[9999] text-gray-300 font-sans antialiased selection:bg-amber-500/30 selection:text-amber-300">
      {/* Background ambient glow in gold / slate theme */}
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
                SpatialTour Pro
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4 text-sm text-gray-400">
            <Link href="/support/renove" className="hover:text-white transition-colors">
              Destek & İletişim
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
              İçindekiler
            </h4>
            <nav className="flex flex-col gap-1 text-sm">
              <a href="#summary" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-amber-400">
                Özet & Temel İlkeler
              </a>
              <a href="#camera-lidar" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-amber-400">
                1. Kamera & LiDAR Taraması
              </a>
              <a href="#location-compass" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-amber-400">
                2. Pusula & Konum Erişimi
              </a>
              <a href="#user-accounts" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-amber-400">
                3. Apple Sign In & Danışman Bilgileri
              </a>
              <a href="#account-deletion" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-amber-400">
                4. Hesap & Veri Silme Hakkı
              </a>
              <a href="#storage-security" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-amber-400">
                5. Veri Güvenliği & Bulut Depolama
              </a>
              <a href="#third-parties" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-amber-400">
                6. Üçüncü Taraf Altyapılar
              </a>
              <a href="#contact" className="px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all font-medium border-l-2 border-transparent hover:border-amber-400">
                7. İletişim & Geliştirici
              </a>
            </nav>

            <div className="mt-6 pt-5 border-t border-gray-800">
              <PrintButton />
            </div>
          </aside>

          {/* Right Main Content */}
          <main className="flex-1 space-y-12 max-w-3xl">
            {/* Header Title */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
                Son Güncelleme: 10 Eylül 2026
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Gizlilik Politikası
              </h1>
              <p className="text-gray-400 text-base leading-relaxed">
                <strong>Renove (SpatialTour Pro)</strong> uygulaması olarak kullanıcılarımızın, gayrimenkul danışmanlarının ve müşterilerinin gizliliğine en üst düzeyde saygı gösteriyoruz. Bu politika; Apple LiDAR sensör verilerinin, kamera görüntülerinin, mekan boyutlarının ve profil bilgilerinizin nasıl işlendiğini açıklar.
              </p>
            </div>

            {/* Quick Summary Box */}
            <section id="summary" className="p-6 rounded-2xl bg-[#121620] border border-amber-500/20 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">🛡️</span>
                <h3 className="font-bold text-lg text-amber-300">Özet & Temel Gizlilik Taahhütlerimiz</h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300">
                <li className="flex items-start gap-2 bg-gray-900/60 p-3 rounded-xl border border-gray-800">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>LiDAR Cihaz Üzerinde İşlenir:</strong> Kamera akışınız sunuculara iletilmez, 3D modelleme doğrudan cihazınızda gerçekleşir.</span>
                </li>
                <li className="flex items-start gap-2 bg-gray-900/60 p-3 rounded-xl border border-gray-800">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Reklamsız & İzleyicisiz:</strong> Uygulamada reklam ağı, pazarlama takip kodları veya IDFA izleyicisi bulunmaz.</span>
                </li>
                <li className="flex items-start gap-2 bg-gray-900/60 p-3 rounded-xl border border-gray-800">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Tam Hesap Silme Kontrolü:</strong> Apple Guideline 5.1.1(v) uyarınca tek tuşla hesabınızı ve tüm taramalarınızı kalıcı olarak silebilirsiniz.</span>
                </li>
                <li className="flex items-start gap-2 bg-gray-900/60 p-3 rounded-xl border border-gray-800">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span><strong>Uçtan Uca Şifreli İletişim:</strong> Paylaşılan portföy verileri HTTPS/TLS ve Supabase RLS kalkanıyla korunur.</span>
                </li>
              </ul>
            </section>

            {/* 1. Camera & LiDAR */}
            <section id="camera-lidar" className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-amber-400">1.</span> Kamera ve Apple LiDAR Taraması
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm">
                Uygulama, desteklenen iPhone ve iPad Pro cihazlarında bulunan <strong>Apple RoomPlan API</strong> ve <strong>LiDAR Tarayıcı</strong> donanımını kullanarak mekanların duvar, kapı, pencere ve mobilya boyutlarını 3 boyutlu olarak algılar.
              </p>
              <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800 text-sm space-y-2 text-gray-300">
                <p>• <strong>Kamera Akışı:</strong> Kamera görüntüsü yalnızca tarama esnasında gerçek zamanlı algılama için kullanılır. Ham video veya canlı kamera akışı kesinlikle harici bir sunucuya kaydedilmez veya yüklenmez.</p>
                <p>• <strong>3D Geometri Verisi:</strong> Tarama sonucunda üretilen USDZ ve OBJ 3D dosya formatları ile kat planı boyutları, danışmanın onayıyla portföy oluşturmak üzere saklanır.</p>
              </div>
            </section>

            {/* 2. Location & Compass */}
            <section id="location-compass" className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-amber-400">2.</span> Pusula ve Cephe Yönü Erişimi (Konum İzni)
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm">
                Uygulama, iOS <code>NSLocationWhenInUseUsageDescription</code> izni kapsamında cihazın dahili manyetometre ve pusula sensörüne erişir.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm">
                <strong>Kullanım Amacı:</strong> Bir odanın pencereleri ve balkonu taranırken güneş alma durumu ve mimari cephe yönünü (Kuzey, Güney, Doğu, Batı) otomatik olarak belirlemektir. 
                Uygulama <strong>kesin GPS koordinatlarınızı veya konum geçmişinizi asla arka planda izlemez, kaydetmez veya satmaz</strong>.
              </p>
            </section>

            {/* 3. Apple Sign In & Account Info */}
            <section id="user-accounts" className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-amber-400">3.</span> Apple ile Giriş & Danışman Bilgileri
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm">
                Danışmanlar güvenli oturum açmak için <strong>Apple ile Giriş Yap (Sign in with Apple)</strong> hizmetini kullanabilir. Apple tarafından sağlanan anonim kullanıcı kimliği (User ID), e-posta adresi ve ad-soyad bilgisi oturum yönetimi için saklanır.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm">
                Danışmanın profil formuna girdiği telefon numarası ve emlak ofisi adı, yalnızca oluşturduğu ilan materyallerinde (WhatsApp tanıtım kartı, PDF broşürü ve interaktif web turu) potansiyel alıcıların danışmana ulaşabilmesi amacıyla kullanılır.
              </p>
            </section>

            {/* 4. Account Deletion */}
            <section id="account-deletion" className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-amber-400">4.</span> Hesap ve Veri Silme Hakkı (Apple Kuralı 5.1.1(v))
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm">
                Apple App Store yönergeleri ve KVKK/GDPR standartlarına tam uyum çerçevesinde; kullanıcılarımıza hesaplarını diledikleri an doğrudan uygulama içinden silme imkanı sunuyoruz.
              </p>
              <div className="p-5 rounded-xl bg-red-950/20 border border-red-900/40 text-sm space-y-3">
                <h4 className="font-bold text-red-400">Uygulama İçi Hesap Silme Adımları:</h4>
                <ol className="list-decimal list-inside space-y-1 text-gray-300">
                  <li>Uygulama ana ekranında sağ üstteki Profil butonuna dokunun.</li>
                  <li>Açılan Danışman Ayarları panelinin en altında yer alan <strong>&quot;Hesabımı ve Tüm Verilerimi Sil&quot;</strong> seçeneğine tıklayın.</li>
                  <li>Onay mesajında <strong>&quot;Hesabımı Sil&quot;</strong> butonunu onaylayın.</li>
                </ol>
                <p className="text-xs text-gray-400 mt-2">
                  * Bu işlem tamamlandığında profil kaydınız, buluttaki mülk taramalarınız ve yerel veritabanı kayıtlarınız anında ve geri alınamaz biçimde kalıcı olarak silinir.
                </p>
              </div>
            </section>

            {/* 5. Storage & Security */}
            <section id="storage-security" className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-amber-400">5.</span> Veri Güvenliği ve Bulut Depolama
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm">
                Oluşturulan 3D oda taramaları ve kat planları cihazınızda yerel olarak (SQLite & AsyncStorage) önbelleğe alınır. Danışman portföyü yayınladığında, veriler <strong>Supabase</strong> altyapısı üzerinde PostgreSQL ve şifreli depolama alanlarına aktarılır.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm">
                Veritabanında <strong>Satır Düzeyi Güvenlik (Row-Level Security - RLS)</strong> etkinleştirilmiştir; her danışman yalnızca kendi mülklerine ve modellerine erişebilir, düzenleyebilir veya silebilir.
              </p>
            </section>

            {/* 6. Third Parties */}
            <section id="third-parties" className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-amber-400">6.</span> Üçüncü Taraf Altyapı Hizmetleri
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm">
                Uygulamanın çalışabilmesi için yalnızca aşağıdaki güvenilir küresel altyapı sağlayıcıları kullanılmaktadır:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1.5 pl-2">
                <li><strong>Apple Inc.:</strong> iOS İşletim Sistemi, RoomPlan Framework, Sign In with Apple.</li>
                <li><strong>Supabase Inc.:</strong> Güvenli PostgreSQL veritabanı, kimlik doğrulama ve dosya depolama.</li>
              </ul>
              <p className="text-gray-300 leading-relaxed text-sm">
                Uygulamamız kullanıcı verilerini hiçbir üçüncü taraf reklam veya veri simsarı (data broker) kuruluşa satmaz, kiralamaz veya devretmez.
              </p>
            </section>

            {/* 7. Contact */}
            <section id="contact" className="space-y-4 border-t border-gray-800 pt-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-amber-400">7.</span> İletişim ve Geliştirici Bilgileri
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm">
                Gizlilik politikamız, kişisel verileriniz veya hesap silme taleplerinizle ilgili her türlü soru için geliştirici ekibimizle doğrudan iletişime geçebilirsiniz:
              </p>
              <div className="p-5 rounded-xl bg-[#121620] border border-gray-800 text-sm space-y-2 text-gray-300">
                <p><strong>Geliştirici:</strong> Emir Yarıcı (Yomme / Atelier Zero)</p>
                <p><strong>E-Posta:</strong> <a href="mailto:emir@yarici.dev" className="text-amber-400 hover:underline">emir@yarici.dev</a></p>
                <p><strong>Destek Sayfası:</strong> <Link href="/support/renove" className="text-amber-400 hover:underline">https://yarici.dev/support/renove</Link></p>
                <p><strong>Web Sitesi:</strong> <a href="https://yarici.dev" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">https://yarici.dev</a></p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
