import SwiftCode from "./markdown/swift-code.mdx";
import AndroidCode from "./markdown/android-code.mdx";
import FridaHook from "./markdown/frida-hook.mdx";

export default function HoldTheDoor() {
  return (
    <div className="flex flex-col w-full flex-1 gap-4 relative leading-relaxed text-gray-300 [&_strong]:text-primary">
      <h1 className="w-2/3 font-extrabold text-4xl mb-14 text-primary sm:text-gradient">
        SSL Pinning Is Just The First Floor
      </h1>

      <p>
        As mobile developers, it is easy to look at application security as a
        series of boxes waiting to be checked. We read guidelines, run static
        analysis tools, and fix vulnerabilities as they pop up in our reports.
        But in the rush to build features and hit deadlines, it is just as easy
        to focus entirely on isolated fixes while missing the broader picture of
        how an attacker actually interacts with our code. We implement a
        specific defense, assume the problem is solved, and move on—without
        realizing we&rsquo;ve left another door entirely wide open.
      </p>

      <p>
        Take network security, for example. You add <strong>SSL pinning</strong> because every
        mobile security checklist tells you to. Suddenly, Charles Proxy or
        Proxyman starts throwing handshake errors. It feels good. It feels like
        you’ve locked the front door, so you ship it and move on to the next
        feature.
      </p>

      <p>
        But if someone jailbreaks a test device and drops <strong>Frida</strong> into your app,
        they can read every single request and response in plaintext anyway.
      </p>

      <p>
        It’s not because your pinning implementation is broken. It’s just that
        pinning was designed to <strong>protect the wire, not the device itself</strong>. You
        didn&rsquo;t do anything wrong; you just stopped one floor too early. Let’s
        walk up together.
      </p>

      <h2 className="text-2xl font-bold mt-4">How Proxies Watch the Wire</h2>
      <p>
        To understand why pinning matters, we first have to look at how tools
        like <strong>Charles Proxy</strong> or <strong>Proxyman</strong> view our traffic in the first place.
      </p>

      <p>
        Normally, when your app wants to talk to a server, it routes traffic
        directly through the internet. When you open a debugging tool, it spins
        up a local proxy server on your computer. By changing your phone&rsquo;s
        Wi-Fi settings to point to your computer&rsquo;s IP address, you are
        intentionally routing all of your app&rsquo;s traffic directly through that
        tool.
      </p>

      <p>
        For plain HTTP traffic, reading the data is simple. The proxy acts like
        a postal worker opening an unsealed envelope, logging the text to your
        screen, and passing it along.
      </p>

      <p>
        But for secure HTTPS traffic, things get interesting. The proxy can&rsquo;t
        read encrypted data without the server&rsquo;s private key, so it performs a
        constructive <strong>Man-in-the-Middle (MITM)</strong> architecture:
      </p>

      <div className="bg-[#232936] p-4 rounded-md flex flex-col gap-3 my-2">
        <p>
          <strong>The Trust Anchor:</strong> You install the proxy tool’s custom
          Root Certificate onto your test device and manually mark it as
          &ldquo;Trusted&rdquo; in your system settings.
        </p>
        <p>
          <strong>The Split Handshake:</strong> When your app tries to connect
          to your secure server, the proxy tool intercepts the request. It
          connects to the real server on your behalf to establish a secure
          outbound connection. Simultaneously, it generates a fake, dynamic
          certificate for your domain on the fly, signs it with its own Root
          Certificate, and hands it back to your app.
        </p>
        <p>
          <strong>The Decryption Point:</strong> Because you told the device&rsquo;s
          OS to trust the proxy&rsquo;s root certificate, the app completes the
          handshake. Now, when your app sends data, it encrypts it using the
          proxy’s key. The proxy decrypts it, logs the plaintext on your
          monitor, re-encrypts it with the real server&rsquo;s key, and sends it out
          to the internet.
        </p>
      </div>

      <p>
        This handshake switch is exactly why these tools are so incredibly
        powerful for daily debugging.
      </p>

      <h2 className="text-2xl font-bold mt-4">What Pinning Actually Buys Us</h2>
      <p>
        This entire proxy mechanism relies on a single vulnerability: the app
        blindly trusting whatever the device&rsquo;s operating system root store tells
        it to trust. If a user can force the OS to trust a malicious root
        certificate, the secure tunnel is broken.
      </p>

      <p>
        <strong>Pinning</strong> elegantly narrows that down. It teaches your app to <strong>bypass the
        device&rsquo;s root store</strong> for specific domains, saying, &ldquo;I don&rsquo;t care if the
        operating system trusts this certificate; I am checking the public key
        myself against a copy I have hardcoded inside my own binary.&rdquo; When
        Proxyman tries to hand your app its dynamically generated fake
        certificate, the pin check fails immediately. Your app realizes someone
        is sitting in the middle of the conversation and gracefully drops the
        connection before sending a single byte of data.
      </p>

      <p>
        But notice where this defense is looking: it’s looking outward. It
        assumed the person trying to watch the traffic is standing on the wire
        between your app and your server—not sitting comfortably right inside
        the app&rsquo;s own memory space.
      </p>

      <h2 className="text-2xl font-bold mt-4">The Shift in Perspective</h2>
      <p>
        The moment a user roots or jailbreaks their phone, the entire
        environment changes.
      </p>

      <p>
        A tool like Frida doesn’t waste time trying to forge a certificate to
        fool your pin check on the wire. Instead, it gently steps inside the
        running application&rsquo;s memory space and alters the compiled function
        responsible for checking the pin, making it always return a success
        state.
      </p>

      <p>
        It doesn&rsquo;t pick your cryptographic lock; it just walks around the door
        entirely. Pinning simply isn&rsquo;t built to survive runtime code
        modification, and realizing that is where real mobile security begins.
      </p>

      <h2 className="text-2xl font-bold mt-4">
        mTLS — Starting a Mutual Conversation
      </h2>
      <p>
        Standard TLS is a one-way street: your app checks if it can trust the
        server. <strong>Mutual TLS (mTLS)</strong> turns that into a real conversation,
        requiring the server to ask, &ldquo;And who are you?&rdquo; Your app must present its
        own unique certificate and prove it holds the matching private key before
        any data is exchanged.
      </p>

      <p>
        This helps us solve two major headaches:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>
          It stops casual API scripting. Someone can&rsquo;t just reverse-engineer
          your endpoints and hit them with a quick Python script; without a
          valid client cert, the server won&rsquo;t even open the door.
        </li>
        <li>
          It makes proxy tools struggle because the proxy would need your app&rsquo;s
          unique private key to safely pass the traffic upstream.
        </li>
      </ul>

      <h3 className="text-xl font-bold mt-2 text-primary">
        The Reality Check: The Backend Operational Nightmare
      </h3>
      <p>
        As beautiful as mTLS is in theory, it asks for a lot of love on the
        backend. If you have millions of active users, you are suddenly
        managing millions of unique client certificates.
      </p>

      <p>
        If you rely on traditional revocation checks, your databases will feel
        the weight very quickly. To keep things peaceful for your
        infrastructure, you usually have to look into hyper-optimized validation
        or short-lived certificates.
      </p>

      <p>
        And we have to remember: if <strong>Frida</strong> is already running in our app&rsquo;s
        memory, it can still peek at the data before it gets encrypted or after
        it gets decrypted by the network layer. The wire might be secure, but
        the room it’s being read in is shared.
      </p>

      <h2 className="text-2xl font-bold mt-4">Keeping Keys Safely in Hardware</h2>
      <p>
        A common instinct is to generate a client key on the server and send it
        down to the app, or store it in a local database. But if that private key
        ever travels across the network or sits in standard storage, the magic of
        mTLS starts to fade.
      </p>

      <p>
        Instead, we let the device take care of it from the ground up:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>
          The device handles the birth of the key pair inside isolated hardware—
          the <strong>Secure Enclave</strong> on iOS or the <strong>Android Keystore</strong>.
        </li>
        <li>
          The app sends over a <strong>Certificate Signing Request (CSR)</strong>—just the public
          part—to your backend.
        </li>
        <li>
          Your server signs it and hands back the public certificate.
        </li>
        <li>
          Every future request is signed using that hardware-backed key. The
          actual private key never travels, and it never leaves the chip.
        </li>
      </ul>

      <h3 className="text-xl font-bold mt-4">What it Looks Like</h3>

      <div className="flex flex-col gap-4 my-2">
        <div>
          <p className="font-semibold text-sm mb-1 text-primary">Swift</p>
          <SwiftCode />
        </div>
        <div>
          <p className="font-semibold text-sm mb-1 text-primary">Kotlin / Android</p>
          <AndroidCode />
        </div>
      </div>

      <div className="bg-[#232936] p-3 rounded-md border-l-4 border-amber-500 my-2">
        <p className="font-bold text-amber-500 mb-1">A Small Design Note</p>
        <p className="text-sm">
          The Secure Enclave strictly requires Elliptic Curve (EC P-256) keys, not
          traditional RSA. It’s worth checking in with your backend team early
          to ensure your server stack is comfortable talking in elliptic curves.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-4">Navigating the Android Landscape</h2>
      <p>
        Take a close look at the Android configuration:{" "}
        <span className="inline-block bg-primary/20 text-primary px-2 py-0.5 rounded font-mono text-sm">
          .setIsStrongBoxBacked(true)
        </span>
        . <strong>StrongBox</strong> is wonderful, but it relies on specialized hardware chips
        (like the Titan M) that aren&rsquo;t present in every device.
      </p>

      <p>
        If you make <strong>StrongBox</strong> a strict requirement, your app will gently crash
        or refuse to work for users on older or more budget-friendly Android
        devices. In production, a softer touch works best: try utilizing StrongBox
        first, catch the exception if it&rsquo;s missing, and gracefully fall back to
        the standard hardware-backed <strong>Trusted Execution Environment (TEE)</strong>.
      </p>

      <h2 className="text-2xl font-bold mt-4">
        The Trust Architecture: Signing the CSR Without Secrets
      </h2>
      <p>
        When we build this hardware flow, a natural cryptographic question comes
        up: If we are bundling the public key into a Certificate Signing Request
        (CSR) and sending it over the network to our backend, can&rsquo;t an attacker
        intercept the payload, modify the details, or send their own public key?
      </p>

      <p>
        This is where the mathematical magic of asymmetric keys protects us.
      </p>

      <p>
        When the <strong>CSR</strong> is built on the device, it wraps the raw public key along
        with basic metadata and creates an internal digital signature using the
        corresponding hidden private key. This mechanism is called{" "}
        <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold">
          Proof of Possession
        </span>
        .
      </p>

      <p>
        When your backend Certificate Authority receives the request, it uses the
        public key inside the envelope to verify that signature. This introduces a
        perfect logical trap for an attacker:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>
          If they intercept the request on the wire and try to alter data (like
          changing a user ID or account value), the signature immediately
          invalidates.
        </li>
        <li>
          If they try to generate a brand-new signature to match their altered
          text, they fail completely because they don&rsquo;t have access to the
          private key locked away inside the physical hardware chip.
        </li>
      </ul>

      <p>
        But what if an attacker runs a script on their own laptop, generates a
        clean keypair there, signs a CSR with their own private key, and sends it
        to your endpoint while pretending to be your app?
      </p>

      <p>
        To solve that final edge case, the initialization phase cannot happen in a
        vacuum. The <strong>CSR</strong> payload must be tightly coupled with the <strong>Device
        Attestation</strong> layer.
      </p>

      <h2 className="text-2xl font-bold mt-4">
        Device Attestation — Checking the Ground We Stand On
      </h2>
      <p>
        <strong>mTLS</strong> is great at telling us which key is signing a request, but it can’t
        tell us if the phone holding that key is healthy. A compromised device can
        still use a perfectly valid, hardware-bound key because the hooking tools
        just ride along next to it inside the process.
      </p>

      <p>
        This is where Apple&rsquo;s <strong>App Attest</strong> and Google&rsquo;s <strong>Play Integrity</strong> come in to
        lend a hand. Instead of your app trying to prove its own innocence, the
        operating system itself vouches for it.
      </p>

      <p>
        When your app requests its initial certificate via the <strong>CSR flow</strong>, it
        simultaneously asks the OS to provide a cryptographically signed
        attestation token. This token evaluates the device&rsquo;s integrity, checks
        if the application binary matches your official store signature, and links
        directly to the public key you generated. Your server validates this entire
        chain back to the vendor&rsquo;s root before it issues an identity certificate.
        This proves the public key belongs to a genuine instance of your app running
        on real, untampered smartphone hardware, completely ignoring fake requests
        coming from a script or a laptop.
      </p>

      <h2 className="text-2xl font-bold mt-4">
        Request Body Signing: Protecting Everyday Traffic
      </h2>
      <p>
        Once this trust is established and you move past provisioning into daily
        production, you can use that same hardware-backed private key to protect
        day-to-day data streams through <strong>Request Body Signing</strong>.
      </p>

      <p>
        Before sending a standard JSON payload to your server, the app bundles
        the body text, a current timestamp, and a monotonic counter (nonce) into
        a single string. It passes this data to the secure hardware chip to be
        signed.
      </p>

      <p>
        When your backend checks this signature using the stored public key, it
        guarantees two things:
      </p>
      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>
          <strong>Data Integrity:</strong> No one altered the contents of the
          API request after it left the application layer.
        </li>
        <li>
          <strong>Replay Protection:</strong> Because a timestamp and a strict
          counter are integrated into the signature, an attacker cannot record a
          valid request and replay it later to duplicate an action.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mt-4">
        Balances in Performance & User Experience
      </h2>
      <p>
        Because full attestation requires your user&rsquo;s device to talk directly to
        Apple or Google&rsquo;s servers to sign a token, it is a naturally heavy
        operation.
      </p>

      <ul className="list-disc list-inside space-y-1 pl-2">
        <li>
          <strong>Give it space:</strong> Try not to run an attestation check
          on every single API call. Doing so will drain your user&rsquo;s battery,
          slow down their experience, and cause frustrating timeouts on slower
          connections.
        </li>
        <li>
          <strong>The natural flow:</strong> It&rsquo;s much gentler to perform this
          heavy attestation check just once during key moments—like initial setup,
          logging in, or right during that initial CSR phase. From there, you can
          issue a short-lived session token and use rapid, local request body
          signing to keep daily traffic safe and light.
        </li>
      </ul>

      <p>
        And yes, there is always an ongoing arms race between root-hiding tools
        and OS detection patches. It’s a shifting landscape, but implementing
        this raises the effort required for an exploit from a casual script to a
        highly dedicated, targeted project.
      </p>

      <h2 className="text-2xl font-bold mt-4">
        The Inside Job: Frida Server &amp; Frida Gadget
      </h2>
      <p>
        No matter how robust your client-side cryptography is, it operates within an environment controlled by the user. If an attacker gains full administrative access to that environment (root on Android, jailbreak on iOS), they can run <strong>Frida Server</strong>.
      </p>

      <p>
        Frida operates by injecting a dynamic JavaScript engine into the memory space of your running process. Once inside, it doesn&rsquo;t care about SSL pins or certificates; it can hook directly into the network libraries (like <code>NSURLSession</code> on iOS or <code>OkHttp</code> on Android) or even lower-level system socket APIs.
      </p>

      <p>
        But jailbreaks and roots are becoming rarer, and many OS detection systems flag them. The real harsh reality is <strong>Frida Gadget</strong>.
      </p>

      <p>
        Frida Gadget is a shared library that can be packaged directly into your application&rsquo;s binary. An attacker extracts your APK or decrypted IPA, embeds Frida Gadget, patches the binary&rsquo;s load commands (using tools like <code>optool</code> or <code>patchapk</code>) to load the gadget on startup, and repackages/resigns the app. This modified app runs on any ordinary, retail device. The moment it launches, the gadget fires up, opens a debugger port, and executes the attacker&rsquo;s scripts—granting them full visibility into memory.
      </p>

      <p>
        By hooking low-level TLS/SSL functions like <code>SSL_write</code>, an attacker can intercept every outbound request and inbound response in plaintext, right before encryption or right after decryption:
      </p>

      <div className="my-4">
        <p className="font-semibold text-sm mb-1 text-primary">Frida Hook (BoringSSL)</p>
        <FridaHook />
      </div>

      <p>
        This reveals your entire request-response cycles, headers, URL parameters, authentication structures, and custom encryption algorithms. Once these are laid bare, the app&rsquo;s secure facade vanishes, allowing the attacker to easily script API clients and bypass the mobile app entirely.
      </p>

      <h2 className="text-2xl font-bold mt-4">
        Edge Defenses: The Backend Reality Check (WAF, Akamai, Cloudflare)
      </h2>
      <p>
        If a determined attacker can always bypass client-side protections using tools like Frida, then how do we protect our backend from automated scraping, credential stuffing, API abuse, and DDoS attacks?
      </p>

      <p>
        The answer is simple: <strong>treat the mobile client as completely untrusted and hostile</strong>. Shift your ultimate defenses to the network edge by utilizing robust Web Application Firewalls (WAF) and bot management suites like <strong>Akamai</strong>, <strong>Cloudflare</strong>, or <strong>AWS WAF</strong>.
      </p>

      <div className="bg-[#232936] p-4 rounded-md flex flex-col gap-3 my-2 text-sm">
        <p>
          <strong>Bot Mitigation &amp; Behavioral Profiling:</strong> Modern edge platforms don&rsquo;t just look at IP rates. They analyze the TCP/IP connection fingerprint (e.g., JA3 or JA4 fingerprints), TLS negotiation options, and HTTP/2 settings. Scripts using libraries like Python&rsquo;s <code>requests</code> or Go&rsquo;s <code>net/http</code> leave distinct cryptographic fingerprints that do not match the expected signatures of actual iOS or Android systems, allowing WAFs to block them instantly.
        </p>
        <p>
          <strong>Rate Limiting &amp; DDoS Shielding:</strong> Enforce strict request thresholds on your API endpoints at the CDN edge. A WAF can absorb massive volumetric DDoS attacks, distribute the load across global scrubbing centers, and throttle high-frequency automated scraping before a single malicious request reaches your origin servers.
        </p>
        <p>
          <strong>Dynamic Challenges &amp; SDK Integrations:</strong> When requests look suspicious, CDNs can issue managed challenges. For native mobile applications where traditional JavaScript challenges fail, enterprise WAFs (such as Cloudflare Mobile SDK or Akamai Bot Manager) provide mobile SDK integrations to dynamically generate device telemetry and solve challenges natively.
        </p>
        <p>
          <strong>API Shielding:</strong> Configure strict API schemas at the edge. A WAF can validate that incoming JSON payloads strictly match your API definitions (fields, types, sizes) and instantly drop malformed request bodies, protecting your backend code from buffer overflows and unexpected exceptions.
        </p>
      </div>

      <p>
        By combining hardware-backed client identity with edge-level traffic inspection, you create a defense-in-depth architecture. Even if an attacker extracts your API design on a Frida-hooked device, they cannot easily automate attacks against your servers at scale.
      </p>

      <h2 className="text-2xl font-bold mt-4">🏁 Final Thoughts</h2>
      <p>
        When we step back and look at the whole picture, each layer simply tries
        to answer a different question:
      </p>

      <div className="bg-[#232936] p-4 rounded-md flex flex-col gap-2 my-2 text-sm">
        <p>
          <strong>Pinning</strong> — Is our connection safe from basic outside eyes?
        </p>
        <p>
          <strong>mTLS</strong> — Can we trust the cryptographic identity of this device?
        </p>
        <p>
          <strong>Attestation</strong> — Is the digital environment running our code healthy
          right now?
        </p>
        <p>
          <strong>Server Monitoring</strong> — Does the behavior of this traffic feel human
          and right?
        </p>
      </div>

      <p>
        In mobile development, there is no such thing as an absolute,
        unbreakable lock. If someone has physical control of a device, plenty of
        time, and a clear goal, they can eventually look inside.
      </p>

      <p>
        Our goal isn&rsquo;t to build a perfect fortress; it&rsquo;s simply to build
        thoughtfully. By layering these defenses, we make reverse engineering
        expensive and complex, creating a safe, respectful space for our genuine
        users to enjoy.
      </p>

      <p className="mt-8 border-t border-gray-700 pt-4 text-sm text-gray-400">
        → Found this helpful? Let me know or share it with a fellow mobile developer 🚀
      </p>
    </div>
  );
}
