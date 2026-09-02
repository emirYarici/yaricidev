import CameraTakePicture from "./markdown/camera-take-picture.mdx";
import HostObjectInterface from "./markdown/host-object-interface.mdx";
import MathHostObject from "./markdown/math-host-object.mdx";
import InstallMathModule from "./markdown/install-math-module.mdx";
import CallMathModule from "./markdown/call-math-module.mdx";
import TurboModuleSpec from "./markdown/turbo-module-spec.mdx";
import NativeMathModule from "./markdown/native-math-module.mdx";
import LazyLoading from "./markdown/lazy-loading.mdx";

export default function BridgeOfSpiesPage() {
  return (
    <div className="flex w-full relative flex-col leading-relaxed text-gray-300 gap-4 [&_strong]:text-white">
      <h1 className="w-full md:w-3/4 font-extrabold text-4xl mb-14 text-primary sm:text-gradient">
        Bridge of Spies: How React Native JS Really Talks to Native Code
      </h1>

      <p>
        How JavaScript talks to native code is one of the most important parts of React Native. For a long time, it was also the most confusing.
      </p>
      <p>
        In the old days, getting JavaScript to talk to iOS or Android felt like a scene from the movie <em>Bridge of Spies</em>: two sides meeting on a cold, foggy bridge at midnight to trade secret messages.
      </p>
      <p>
        In this post, we will look at how the old bridge worked, why it was slow, how the new <strong>JSI</strong> architecture replaced it with a direct hotline, and what &ldquo;glue code&rdquo; actually means.
      </p>

      <h1 className="font-bold text-2xl mt-6 text-white">
        🧵 Two Separate Worlds
      </h1>
      <p>
        React Native separates JavaScript code from native platform code. They run in different places and on different threads:
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>JS thread:</strong> Where React runs and executes your JavaScript logic.
        </li>
        <li>
          <strong>Native / UI thread:</strong> Where iOS (UIKit) and Android render views and handle user taps.
        </li>
        <li>
          <strong>Shadow thread:</strong> Where layout was calculated using Yoga.
        </li>
      </ul>

      <p>
        Even with the new architecture, one basic rule stays the same:
      </p>

      <div className="bg-[#232936] p-3 rounded-md border border-gray-800">
        <p className="font-semibold text-white">
          JavaScript runs inside a JS engine (Hermes or JavaScriptCore).
        </p>
        <p className="text-sm mt-1 text-gray-400">
          The JS engine does not automatically know how to call your C++, Swift, Objective-C, Java, or Kotlin code. We have to build that bridge ourselves.
        </p>
      </div>

      <p>
        So when you write:
      </p>
      <CameraTakePicture />
      <p>
        how does that command actually reach the real camera on your phone? Let&apos;s start with how it used to work.
      </p>

      <h1 className="font-bold text-2xl mt-6 text-white">
        🌉 The Old World: The Bridge
      </h1>
      <p>
        The classic React Native Bridge worked like a <strong>message delivery service</strong>.
      </p>
      <p>
        When JavaScript called a native method, it could not call native code directly. Instead, it had to turn the call into a serialized JSON-like string, put it into a queue, and send it over the bridge in batches.
      </p>

      {/* Simplified Orange & Gray Pipeline */}
      <div className="my-6 flex flex-col gap-3 p-4 sm:p-5 bg-[#1b202c] border border-gray-800 rounded-xl">
        <div className="flex items-center justify-between border-b border-gray-800 pb-2.5">
          <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">
            How The Old Bridge Handled Calls
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
            Batched & Async
          </span>
        </div>

        {/* Step 1: JavaScript */}
        <div className="bg-[#232936] border border-gray-700/60 rounded-lg p-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-white text-sm">1. JavaScript Thread</span>
            <span className="text-xs text-gray-400 font-mono">Hermes / JSC</span>
          </div>
          <p className="text-xs text-gray-300 mb-2">
            You call <code>Camera.takePicture()</code>. JavaScript serializes the module name, method, and arguments into a JSON-like message.
          </p>
          <div className="bg-[#181c26] p-2 rounded text-xs font-mono text-gray-400 border border-gray-800">
            {`{"module": "Camera", "method": "takePicture", "args": []}`}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 py-0.5">
          <span>↓ Message queued and sent in batches</span>
        </div>

        {/* Step 2: Bridge Queue */}
        <div className="bg-[#232936] border border-gray-700/60 rounded-lg p-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-white text-sm">2. Bridge Queue</span>
            <span className="text-xs text-gray-400">Transit Layer</span>
          </div>
          <p className="text-xs text-gray-300">
            Batches messages together and pushes them across the boundary to the native thread asynchronously.
          </p>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 py-0.5">
          <span>↓ Native receives and unpacks message</span>
        </div>

        {/* Step 3: Native */}
        <div className="bg-[#232936] border border-gray-700/60 rounded-lg p-3.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-white text-sm">3. Native Platform</span>
            <span className="text-xs text-gray-400 font-mono">iOS / Android</span>
          </div>
          <p className="text-xs text-gray-300">
            Native code decodes the arguments, locates the camera module, and fires the actual camera hardware.
          </p>
        </div>
      </div>

      <p>
        When the native code finished, it sent the result back the same way: turning data into a message and sending it across the bridge to JavaScript.
      </p>

      <h2 className="font-bold text-xl mt-4 text-white">
        Problems with the Old Bridge:
      </h2>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <strong>Encoding cost:</strong> Every piece of data had to be converted back and forth. For big images, large arrays, or fast animations, this was very slow.
        </li>
        <li>
          <strong>Everything was asynchronous:</strong> You could not get a value immediately like <code>const width = Screen.getWidth()</code>. Everything had to use promises or callbacks.
        </li>
        <li>
          <strong>No compile-time type safety:</strong> If JavaScript sent the wrong data type, you only found out when the app crashed at runtime.
        </li>
        <li>
          <strong>Lag and delays:</strong> Because messages were grouped in batches, calls could get stuck in line, causing dropped frames.
        </li>
      </ul>

      <div className="bg-[#232936] border-l-4 border-primary p-4 rounded-r-md my-2">
        <p className="font-bold text-white mb-1">Summary of the Old Way</p>
        <p className="text-gray-300">
          The old bridge treated communication between JS and Native as <strong>sending text messages back and forth</strong>.
        </p>
      </div>

      <h1 className="font-bold text-2xl mt-6 text-white">
        ⚡ The New World: JSI (JavaScript Interface)
      </h1>
      <p>
        The foundation of the new architecture is <strong>JSI (JavaScript Interface)</strong>.
      </p>
      <p>
        JSI is a lightweight C++ API that gives React Native a direct handle on the JavaScript engine. It is not the entire module system by itself, but the C++ engine interface that makes direct communication possible.
      </p>

      <div className="bg-[#232936] p-4 rounded-md border border-gray-800">
        <p className="font-medium text-white">
          Instead of serializing everything into a queue, native C++ objects are exposed directly to the JavaScript runtime as native-backed HostObjects.
        </p>
      </div>

      {/* Simple Orange & Gray Comparison */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Old Bridge */}
        <div className="bg-[#1b202c] border border-gray-700/60 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-gray-800 pb-2">
              <span className="font-bold text-gray-300 text-sm">Old Bridge</span>
              <span className="text-xs text-gray-500">Batched Message Queue</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="bg-[#232936] p-2 rounded text-gray-300">1. JavaScript calls method</div>
              <div className="text-center text-gray-500 text-[11px]">↓ Serialize to JSON string buffer</div>
              <div className="bg-[#232936] p-2 rounded text-gray-300">2. Bridge message queue buffer</div>
              <div className="text-center text-gray-500 text-[11px]">↓ Batched dispatch across boundary</div>
              <div className="bg-[#232936] p-2 rounded text-gray-300">3. Native unpacks and executes</div>
            </div>
          </div>
          <p className="mt-3 pt-2 border-t border-gray-800 text-xs text-gray-400">
            Strictly asynchronous with JSON parsing overhead
          </p>
        </div>

        {/* New JSI */}
        <div className="bg-[#1b202c] border border-primary/30 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-gray-800 pb-2">
              <span className="font-bold text-white text-sm">Modern JSI</span>
              <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                Direct in Memory
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="bg-[#232936] p-2 rounded text-white font-medium">1. JavaScript Engine</div>
              <div className="text-center text-gray-400 text-[11px] font-medium">↓ Direct in-memory C++ invocation (no JSON)</div>
              <div className="bg-[#232936] border border-gray-700 p-2 rounded text-white font-medium">
                2. Native C++ HostObject
              </div>
              <div className="text-center text-gray-500 text-[11px]">↓ Typed dispatch (Obj-C++ / JNI)</div>
              <div className="bg-[#232936] p-2 rounded text-gray-300">3. Native Code (Swift / Kotlin)</div>
            </div>
          </div>
          <p className="mt-3 pt-2 border-t border-gray-800 text-xs text-gray-300 font-medium">
            Direct function calls with native type conversion
          </p>
        </div>
      </div>

      <p>
        JSI provides C++ wrappers for JavaScript values, objects, and functions:
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li><code>jsi::Value</code> — Any JS value (number, string, boolean, etc.)</li>
        <li><code>jsi::Object</code> — A JS object</li>
        <li><code>jsi::Function</code> — A JS function</li>
        <li><code>jsi::Runtime</code> — The JS engine runtime</li>
      </ul>

      <p>
        When JavaScript calls a JSI function, it calls native C++ code <strong>directly in memory</strong>.
      </p>

      <div className="bg-[#232936] border-l-4 border-gray-600 p-4 rounded-r-md my-2">
        <p className="font-bold text-white mb-1">Type Conversion & Threading Reality</p>
        <p className="text-gray-400 text-sm">
          While JSON string parsing is eliminated, JSI still performs type marshaling between JS values and C++ types. Also, while JSI allows synchronous execution, heavy background operations (camera capture, SQLite, networking) are still dispatched to native worker threads so the JS thread never blocks.
        </p>
      </div>

      <h1 className="font-bold text-2xl mt-6 text-white">
        🔤 What Does <code>jsi::</code> Mean?
      </h1>
      <p>
        In C++, <code>::</code> is just a way to say &ldquo;look inside this folder or group&rdquo;.
      </p>
      <p>
        React Native groups its JSI types under the <code>facebook::jsi</code> namespace:
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li><code>jsi::Value</code> means: &ldquo;The <code>Value</code> type inside the <code>jsi</code> group.&rdquo;</li>
        <li><code>jsi::PropNameID::forAscii(rt, &quot;multiply&quot;)</code> uses <code>::</code> because it is a static helper function.</li>
        <li><code>name.utf8(rt)</code> uses <code>.</code> because <code>name</code> is an existing object instance.</li>
      </ul>

      <h1 className="font-bold text-2xl mt-6 text-white">
        🧩 HostObjects: How JSI Works in Practice
      </h1>
      <p>
        A great way to understand JSI is through a <strong>HostObject</strong>.
      </p>
      <p>
        A <code>HostObject</code> is a C++ object that looks and acts like a normal JavaScript object. When JavaScript tries to read a property from it, the JS engine calls your C++ <code>get()</code> method.
      </p>

      <HostObjectInterface />

      <h1 className="font-bold text-2xl mt-6 text-white">
        🚀 Let&apos;s Build a Simple Native Module by Hand
      </h1>
      <p>
        Let&apos;s write a native math helper that gives JS a <code>multiply(a, b)</code> function:
      </p>

      <MathHostObject />

      <p>
        Next, we register it on the JavaScript <code>global</code> object:
      </p>

      <InstallMathModule />

      <p>
        Now in JavaScript, you can call it immediately:
      </p>

      <CallMathModule />

      {/* Simplified Orange & Gray HostObject Flow */}
      <div className="my-6 flex flex-col gap-2.5 p-4 sm:p-5 bg-[#1b202c] border border-gray-800 rounded-xl">
        <div className="flex items-center justify-between border-b border-gray-800 pb-2.5">
          <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">
            Direct In-Memory Call Flow
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
            Synchronous JSI
          </span>
        </div>

        {/* Step 1: JS Invocation */}
        <div className="bg-[#232936] border border-gray-700/60 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-white text-xs sm:text-sm">1. JS Calls Global Property</span>
            <span className="text-xs text-gray-400 font-mono">JS Engine</span>
          </div>
          <code className="text-xs text-gray-300 font-mono">global.mathModule.multiply(6, 7)</code>
        </div>

        {/* Connector */}
        <div className="flex items-center justify-center text-xs text-gray-500 py-0.5">
          <span>↓ JS engine delegates property lookup to C++</span>
        </div>

        {/* Step 2: HostObject get() */}
        <div className="bg-[#232936] border border-gray-700/60 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-white text-xs sm:text-sm">2. HostObject Resolves Method</span>
            <span className="text-xs text-gray-400 font-mono">C++ JSI</span>
          </div>
          <code className="text-xs text-white font-mono">HostObject::get(&quot;multiply&quot;)</code>
        </div>

        {/* Connector */}
        <div className="flex items-center justify-center text-xs text-gray-500 py-0.5">
          <span>↓ Invokes native C++ lambda in place</span>
        </div>

        {/* Step 3: Native C++ Lambda & Return */}
        <div className="bg-[#232936] border border-gray-700/60 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-white text-xs sm:text-sm">3. Native C++ Lambda Execution</span>
            <span className="text-xs text-gray-400 font-mono">Returns Result</span>
          </div>
          <p className="text-xs text-gray-300">
            Computes <code className="font-mono">6 * 7</code> and returns <code className="text-white font-bold font-mono">42</code> directly to JavaScript without queue delays.
          </p>
        </div>
      </div>

      <p>
        No message queue. No JSON conversion. Just a direct function call.
      </p>

      <h1 className="font-bold text-2xl mt-6 text-white">
        ⚠️ Why We Don&apos;t Write Everything by Hand
      </h1>
      <p>
        Writing C++ by hand like this works, but it takes too much time for a real app.
      </p>
      <p>
        Imagine having to write <code>args[0].asNumber()</code>, check argument counts, and handle errors manually for 50 different methods. It would be easy to make mistakes.
      </p>
      <p>
        This is why React Native created <strong>TurboModules</strong> and <strong>Codegen</strong>.
      </p>

      <h1 className="font-bold text-2xl mt-6 text-white">
        🧩 What Is &ldquo;Glue Code&rdquo;?
      </h1>
      <p>
        Instead of writing all the C++ wrapper code by hand, you write a simple <strong>TypeScript specification</strong>:
      </p>

      <TurboModuleSpec />

      <p>
        This file defines the contract: <em>&ldquo;MathModule has a multiply method that takes two numbers and returns a number.&rdquo;</em>
      </p>
      <p>
        When you build your app, <strong>Codegen</strong> automatically reads this TypeScript file and generates all the repetitive C++ code for you:
      </p>

      {/* Simplified Orange & Gray Codegen Flow */}
      <div className="my-6 flex flex-col gap-2 p-4 sm:p-5 bg-[#1b202c] border border-gray-800 rounded-xl">
        <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-1">
          <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">
            Build-Time Codegen Pipeline
          </span>
          <span className="text-xs text-gray-400 font-mono">Automated Glue</span>
        </div>

        <div className="bg-[#232936] border border-gray-700/60 p-2.5 rounded text-xs flex items-center justify-between">
          <span className="text-white font-medium">1. TypeScript Spec</span>
          <span className="text-gray-400 font-mono">You write</span>
        </div>
        <div className="text-center text-xs text-gray-500">↓ Codegen parses TypeScript contract at build time</div>
        <div className="bg-[#232936] border border-gray-700/60 p-2.5 rounded text-xs flex items-center justify-between">
          <span className="text-white font-medium">2. Generated C++ Glue Code</span>
          <span className="text-gray-400 font-mono">Auto-generated</span>
        </div>
        <div className="text-center text-xs text-gray-500">↓ Connects to your native method handlers</div>
        <div className="bg-[#232936] border border-gray-700/60 p-2.5 rounded text-xs flex items-center justify-between">
          <span className="text-white font-medium">3. Your Clean Native Logic</span>
          <span className="text-gray-400 font-mono">Swift / Kotlin / C++</span>
        </div>
      </div>

      <p>
        Now your native implementation only needs to care about the real logic:
      </p>

      <NativeMathModule />

      <p>
        Under the hood, Codegen outputs C++ JSI bindings. On iOS, these connect through <strong>Objective-C++</strong> protocols to your Swift or Objective-C code. On Android, they connect through <strong>JNI (Java Native Interface)</strong> to your Kotlin or Java code.
      </p>

      <h1 className="font-bold text-2xl mt-6 text-white">
        🧠 JSI vs. TurboModules vs. Codegen
      </h1>
      <p>
        These three tools work together, but they do different jobs:
      </p>

      <div className="overflow-x-auto my-2">
        <table className="min-w-full border border-gray-700 text-sm text-left">
          <thead className="bg-[#232936] text-white">
            <tr>
              <th className="p-3 border-b border-gray-700">Name</th>
              <th className="p-3 border-b border-gray-700">What It Is</th>
              <th className="p-3 border-b border-gray-700">Simple Analogy</th>
            </tr>
          </thead>
          <tbody className="divide-y border-gray-700">
            <tr>
              <td className="p-3 font-semibold text-white">JSI</td>
              <td className="p-3">Low-level C++ runtime interface</td>
              <td className="p-3">The direct phone line between JS and C++</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-white">TurboModules</td>
              <td className="p-3">Native module system and lifecycle manager</td>
              <td className="p-3">The manager that creates and finds native modules</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-white">Codegen</td>
              <td className="p-3">Build tool that writes glue code automatically</td>
              <td className="p-3">The automated translator connecting TS to Native</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="font-bold text-xl mt-4 text-white">
        The Core Relationship: Mechanism vs. Implementation
      </h2>
      <p>
        A common point of confusion is mixing up <strong>JSI</strong> and <strong>TurboModules</strong>. They operate at two distinct layers:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <strong>JSI is the underlying mechanism (the enabler):</strong> The low-level ability to inject C++ host objects directly into the JavaScript runtime. JSI by itself is not a module system; it is the interface that makes direct C++ communication possible.
        </li>
        <li>
          <strong>TurboModule is the application layer (the system):</strong> The concrete pattern and module architecture built on top of JSI to expose native platform features to JavaScript.
        </li>
      </ul>

      <p>
        In short: <strong>JSI</strong> is the bridge-building capability; <strong>TurboModules</strong> is the concrete implementation that uses that capability to expose native modules.
      </p>

      <h2 className="font-bold text-xl mt-4 text-white">
        How a TurboModule Operates Step-by-Step
      </h2>
      <ol className="list-decimal list-inside space-y-2 ml-4">
        <li>
          <strong>Define native logic:</strong> You write your module on the native platform (Java/Kotlin on Android, Objective-C/Swift on iOS).
        </li>
        <li>
          <strong>Generate C++ glue bindings:</strong> Codegen automatically creates C++ TurboModule classes that bind to your native code.
        </li>
        <li>
          <strong>Get a direct in-memory reference:</strong> When JavaScript requires or imports the module, no JSON message is serialized across a bridge. Thanks to JSI, JavaScript gets a direct, synchronous reference to the C++ host object.
        </li>
        <li>
          <strong>Execute like a direct function call:</strong> Method invocations execute just like direct C++ function calls in memory, with lazy loading as an added benefit (modules are only initialized when actually used).
        </li>
      </ol>

      <p className="text-xs sm:text-sm font-mono text-center my-4 py-2 text-gray-300">
        JS Engine (C++) <span className="text-primary font-bold">⟷</span> JSI (C++ Interface) <span className="text-primary font-bold">⟷</span> TurboModule (System) <span className="text-primary font-bold">⟷</span> Native Code (Swift / Kotlin)
      </p>

      <h1 className="font-bold text-2xl mt-6 text-white">
        📚 Bonus: Lazy Loading
      </h1>
      <p>
        In the old architecture, all native modules were loaded immediately when the app started.
      </p>
      <p>
        TurboModules are <strong>lazy</strong> by default:
      </p>

      <LazyLoading />

      <p>
        The native module is not created until the exact moment your app calls it.
      </p>

      <h2 className="font-bold text-xl mt-2 text-white">Why Does This Help?</h2>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>
          <strong>Delaying work:</strong> The app opens faster because it doesn&apos;t load every module during startup.
        </li>
        <li>
          <strong>Skipping unused work:</strong> If a user never opens the payment or camera screen, those native modules are <strong>never loaded at all</strong>.
        </li>
      </ul>

      <h1 className="font-bold text-2xl mt-6 text-white">
        🏭 What About Fabric?
      </h1>
      <p>
        Just like TurboModules, <strong>Fabric is built entirely upon JSI</strong> as its foundation. While TurboModules use JSI to invoke native functions and methods, Fabric uses JSI to render native UI components and views:
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li><strong>TurboModules (Method & Feature Pillar):</strong> Modernizes native function calls, device APIs (Camera, Bluetooth, Storage), and native logic.</li>
        <li><strong>Fabric (UI & Rendering Pillar):</strong> Modernizes native view rendering by managing the layout <strong>Shadow Tree directly in C++</strong>.</li>
      </ul>
      <p>
        Because the UI layout tree lives in C++ and communicates via JSI, React can perform <strong>synchronous layout measurement</strong> (like text sizing before paint) and enable Concurrent React features without layout jumps.
      </p>

      {/* Fabric & TurboModules Card */}
      <div className="my-6 p-4 sm:p-5 bg-[#1b202c] border border-gray-800 rounded-xl">
        <div className="flex items-center justify-between border-b border-gray-800 pb-2.5 mb-3">
          <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">
            TurboModules vs Fabric
          </span>
          <span className="text-xs text-gray-400 font-mono">Both Powered by JSI</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div className="bg-[#232936] border border-gray-700/60 p-3 rounded-lg">
            <div className="font-bold text-white text-xs sm:text-sm mb-1">TurboModules</div>
            <p className="text-xs text-gray-400">Hardware & device features (Camera, Bluetooth, Storage)</p>
          </div>
          <div className="bg-[#232936] border border-gray-700/60 p-3 rounded-lg">
            <div className="font-bold text-white text-xs sm:text-sm mb-1">Fabric</div>
            <p className="text-xs text-gray-400">C++ Shadow Tree & synchronous UI layout rendering</p>
          </div>
        </div>

        <div className="bg-[#232936] border border-gray-700 p-2.5 rounded text-center text-xs text-gray-300 font-medium">
          ↓ Both share the same direct C++ JSI runtime interface ↓
        </div>
      </div>

      <h1 className="font-bold text-2xl mt-6 text-white">
        🎬 Quick Summary
      </h1>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li><strong>The Old Bridge:</strong> Sent serialized messages back and forth in batches.</li>
        <li><strong>JSI:</strong> Replaced the bridge with direct in-memory calls between JS and C++.</li>
        <li><strong>TurboModules:</strong> Handles module lookup and lazy loading on top of JSI.</li>
        <li><strong>Codegen:</strong> Automatically writes the repetitive C++ glue code from your TypeScript spec.</li>
        <li><strong>Fabric:</strong> Uses JSI to make UI rendering fast and synchronous.</li>
      </ul>

      <p className="mt-4">
        The mystery behind the bridge is gone. Instead of trading slow messages across a border, React Native now has a direct, type-safe connection between JavaScript and your phone&apos;s native code.
      </p>
      <p className="text-gray-300 font-medium">
        → Found this useful? Share it with a fellow developer 🚀
      </p>
    </div>
  );
}
