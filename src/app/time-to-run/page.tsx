export default function TimeToRunPage() {
  return (
    <div className="flex w-full relative flex-col leading-relaxed text-gray-300 gap-4">
      <h1 className="w-2/3 font-extrabold text-4xl mb-14 text-primary sm:text-gradient">
        Beyond npm install: The New Era of JavaScript Runtimes
      </h1>
      <p>
        We can use javascript everywhere nowadays. From servers to mobile
        phones. And we can do that thanks to the runtimes that we have. At the
        first era of the javascript, is it considered as a client side language.
        But with node.js, javascript developers started to right server side
        code as well. But it is not only about the javascript language, it is
        about a design change!
      </p>
      <h1 className="font-bold text-2xl">
        🏛️ The Legacy: What Node.js Established
      </h1>
      <p>
        Before Node (2009), web servers (Java, PHP, Ruby) operated on a{" "}
        <strong>&quot;One Thread per Request&quot;</strong> model. If a user
        asked for a file, the thread blocked until the file was ready. Node
        changed everything with the <strong>Event Loop</strong>. It introduced
        the single-threaded, non-blocking model. Like a single waiter serving 50
        tables, Node accepts requests, offloads the heavy work to the kitchen
        (C++ workers), and immediately moves to the next customer.
      </p>

      <div className="bg-[#232936] p-3 rounded-md">
        <p className="font-bold mb-2">The Bottleneck</p>
        <p>
          Node achieves this by building a bridge between JavaScript (your code)
          and C++/libuv (the system).
        </p>
        <p className="mt-2">
          When you write <code>fs.readFile()</code>, you aren&apos;t just
          running JS. You are crossing a bridge from JS → Node C++ Bindings →
          libuv → OS.
        </p>
      </div>
      <p>
        In 2009, this cost was negligible. In 2026, with massive serverless
        functions and instant-start requirements, this bridge has become a tax
        we pay on every operation.
      </p>
      <p>
        For over a decade, Node.js has been the dominant runtime of our
        ecosystem. It established the rules we live by. But today, the landscape
        is diversifying with healthy competition. We have <strong>Bun</strong>,
        a challenger that promises speed by rewriting the fundamental
        architecture of how JavaScript talks to your machine.
      </p>
      <h1 className="font-bold text-2xl">
        🚀 The Challenger: Bun&apos;s Architecture
      </h1>
      <p>
        Bun isn&apos;t just &quot;Node but faster.&quot; It is a complete
        architectural rethink designed to eliminate Node&apos;s bottlenecks.
      </p>
      <h2 className="font-bold text-xl">
        ⚙️ The Engine: V8 vs. JavaScriptCore (JSC)
      </h2>
      <div className="bg-[#232936] p-3 rounded-md">
        <p className="mb-2">
          <strong>Node uses V8 (Chrome):</strong> V8 optimizes for sustained
          peak performance in long-running processes. It uses sophisticated
          multi-tier JIT compilation (Ignition interpreter → TurboFan JIT) that
          optimizes hot code paths over time, making it excellent for servers
          that run continuously.
        </p>
        <p>
          <strong>Bun uses JSC (Safari):</strong> JSC prioritizes lower memory
          overhead and faster cold starts, optimized for Safari&apos;s workload
          patterns. It also uses multi-tier compilation (LLInt → Baseline → DFG
          → FTL) but was designed for environments where instant responsiveness
          matters more than long-term peak throughput, making it ideal for CLI
          tools and dev servers.
        </p>
      </div>
      <h2 className="font-bold text-xl">🔩 The Metal: C++ vs. Zig</h2>
      <p>
        Node relies on C++ for its internals, but a large portion of its
        standard library is actually written in JavaScript, requiring constant
        context switching.
      </p>
      <p>
        Bun is written in <strong>Zig</strong>, a modern low-level language. It
        runs much closer to the metal. Most of Bun&apos;s APIs (
        <code>Bun.file</code>, <code>Bun.serve</code>) are native Zig
        implementations.
      </p>
      <div className="bg-[#232936] p-3 rounded-md">
        <p className="font-bold mb-2">Result</p>
        <p>
          When you run <code>bun install</code>, Bun&apos;s core runtime logic
          uses Zig with manual memory management, avoiding GC pauses in critical
          paths like file I/O (though your JavaScript code still runs with
          JSC&apos;s garbage collector). It leverages the latest OS system calls
          (like Linux <code>io_uring</code>) to write files to disk in parallel,
          making it <strong>5-20x faster</strong> than npm depending on cache
          state and network conditions. Fresh installs with no cache typically
          see 3-5x improvements, while cached installs with lockfiles can reach
          10-20x speedups.
        </p>
      </div>
      <h2 className="font-bold text-xl">🔩 Batteries Included</h2>
      <p>
        We used to use many dependencies in javascript. But with bun, the libs
        for common operations, like sql, password hashing, s3 is built in and
        they are written in Zig. So eventually bun users will use less
        dependencies, and they increase the speed
      </p>

      <h2 className="font-bold text-xl">Serverless Platforms</h2>
      <p>With faster startup times, the cold starts will be less pain, But</p>
      <p>
        AWS Lambda, Google Cloud Functions, and many Platform-as-a-Service
        offerings are optimized exclusively for Node.js. While this is changing,
        check your deployment target&apos;s compatibility first. For serverless
        deployments, Node.js remains the safest choice in 2026.
      </p>

      <h1 className="font-bold text-2xl">
        🎯 The Use Cases: A Hybrid Strategy
      </h1>
      <p>
        You don&apos;t have to marry one tool. The smartest developers in 2026
        are using a hybrid stack.
      </p>
      <h2 className="font-bold text-xl">Next.js Developers</h2>
      <p>
        Next.js is a unique beast because it uses its own Rust-based compiler
        (SWC/Turbopack) for bundling, but relies on a runtime to execute that
        code.
      </p>
      <div className="bg-[#232936] p-3 rounded-md flex flex-col gap-2">
        <p>
          <strong>Local Dev (Use Bun):</strong> Running{" "}
          <code>bun --bun run dev</code> leverages the fast startup of the JSC
          engine while Next.js handles the complex bundling.
        </p>
        <p>
          <strong>Production (Stick to Node):</strong> Vercel, AWS, and most
          hosting platforms are highly optimized for Node.js. Since your
          production server is usually &quot;long-running,&quot; Node&apos;s V8
          engine shines here.
        </p>
      </div>
      <h2 className="font-bold text-xl">For React Native Developers</h2>
      <div className="bg-[#232936] p-3 rounded-md flex flex-col gap-2">
        <p>
          <strong>Dependency Management (Use Bun):</strong> React Native
          projects have massive dependency trees. <code>bun install</code> is a
          drop-in replacement that generates a Metro-compatible{" "}
          <code>node_modules</code> folder in seconds.
        </p>
        <p>
          <strong>Native Module Compilation (Verify Compatibility):</strong> Use
          Bun for dependency management, but verify your native modules
          (especially those requiring <code>node-gyp</code>) compile correctly.
          Some packages with native addons or obscure Node.js APIs may still
          need Node&apos;s build toolchain. Metro itself works fine with Bun in
          most cases as of 2025.
        </p>
      </div>
      <h1 className="font-bold text-2xl">🧠 Understanding the Fundamentals</h1>
      <h2 className="font-bold text-xl">
        The Engine Confusion (Client vs. Server)
      </h2>
      <p>
        A common misconception is that using Bun changes how your code runs on
        the user&apos;s browser. It does not.
      </p>
      <div className="bg-[#232936] p-3 rounded-md">
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Your Dev Machine:</strong> Runs Bun (JSC).
          </li>
          <li>
            <strong>Your User&apos;s Chrome:</strong> Runs V8.
          </li>
          <li>
            <strong>Your User&apos;s iPhone App:</strong> Runs Hermes (or JSC).
          </li>
        </ul>
        <p className="mt-2">
          Using Bun is a developer-experience upgrade, not a client-side shift.
        </p>
      </div>

      <h2 className="font-bold text-xl">Production Maturity Considerations</h2>
      <p>
        While Bun is production-ready for many use cases (Bun 1.0 released
        September 2023), Node.js has 15+ years of production hardening across
        millions of deployments. For critical infrastructure with strict
        compliance requirements or where stability trumps performance, the
        conservative choice remains Node until Bun&apos;s ecosystem matures
        further. Major enterprises typically require 3-5 years of battle-testing
        before adopting new runtime infrastructure.
      </p>
      <h1 className="font-bold text-2xl">🦕 The Broader Landscape: Deno 2.0</h1>
      <p>
        No discussion of modern JavaScript runtimes is complete without
        mentioning Deno. Deno 2.0 (released late 2024) added full npm
        compatibility while maintaining its security-first architecture and
        TypeScript-native design. Key differentiators include:
      </p>
      <div className="bg-[#232936] p-3 rounded-md">
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Permissions model:</strong> Explicit flags for file,
            network, and environment access
          </li>
          <li>
            <strong>Standard library:</strong> Comprehensive, audited standard
            modules
          </li>
          <li>
            <strong>Web standard APIs:</strong> Prioritizes browser-compatible
            APIs over Node.js legacy
          </li>
        </ul>
      </div>
      <p>
        Deno represents a third path: not just optimizing Node&apos;s design,
        but reimagining what a JavaScript runtime should be from first
        principles. For new projects without legacy constraints, it&apos;s worth
        evaluating alongside Bun and Node.
      </p>
      <h1 className="font-bold text-2xl">🏁 Final Verdict</h1>
      <p>
        We are moving from an era of{" "}
        <strong>&quot;General Purpose&quot;</strong> (Node doing everything) to{" "}
        <strong>&quot;Specialized Performance.&quot;</strong>
      </p>
      <div className="bg-[#232936] p-3 rounded-md flex flex-col gap-2">
        <p>
          Use <strong>Bun</strong> for the things that bore you: Installing
          packages, running tests, and starting local servers.
        </p>
        <p>
          Use <strong>Node</strong> for the things that require stability:
          Production deployments on mainstream platforms, complex native build
          pipelines, and mission-critical infrastructure.
        </p>
        <p>
          Consider <strong>Deno</strong> for greenfield projects where you can
          embrace modern standards without legacy baggage.
        </p>
      </div>
      <p>
        The goal isn&apos;t to replace Node entirely; it&apos;s to optimize the
        developer experience where it matters most while leveraging Node&apos;s
        strengths where they shine.
      </p>
      <p>
        → Found this helpful? Let me know or share it with a fellow developer 🚀
      </p>
    </div>
  );
}
