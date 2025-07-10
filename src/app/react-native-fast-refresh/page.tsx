import ExampleComponent from "./markdown/component.mdx";
import HookOrderChangeComponent from "./markdown/hook-order-change.mdx";
import CommonJsWrapperComponent from "./markdown/commonjs-wrapper.mdx";
import CommonJsExampleComponent from "./markdown/commonjs-example.mdx";
import CommonJsDynamicComponent from "./markdown/commonjs-dynamic-export.mdx";
import UpdatePatchMessage from "./markdown/update-patch-message.mdx";
import UpdatePatchMessageUsage from "./markdown/update-patch-message-usage.mdx";
import HookOrderUnchangedComponent from "./markdown/hook-order-unchange.mdx";
import { SaveAnimation } from "./client-components/save-animation.client";

export default function RNFR() {
  return (
    <div className="flex flex-col w-full  flex-1 gap-4  relative leading-relaxed text-gray-300 ">
      <h1 className="w-1/2 font-extrabold text-4xl text-wrap  mb-14 text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-500">
        {`How React Native Fast Refresh Works`}
      </h1>
      <h2 className="text-2xl font-bold">Flow Demo</h2>
      <p className="hidden sm:flex">
        Before starting the article, I wanted to demonstrate the entire flow
        with a demo. You can explore the process by changing the color!
      </p>
      <SaveAnimation />
      <p>Okay, now lets start!</p>
      <p>
        React Native, where the cross platform magic happens. But besides this
        fancy slogan, it has an amazing feature called{" "}
        <span className="inline-block bg-primary text-white px-3 py-0.5 rounded-full font-semibold">
          Fast Refresh
        </span>
        . You change the javascript code, the change is instantly showed up to
        the simulator or device screen. But how does it work under the hood. I
        will try to explain it below. So, lets jump straight!
      </p>
      <h2 className="text-2xl font-bold">🚀 What Is Fast Refresh?</h2>
      <p className="leading-relaxed ">
        Fast Refresh was introduced in React Native 0.61, replacing the older
        HMR system with a more reliable and React-aware layer. React native has
        HMR system before that but fast refresh is HMR&rsquo;s tailored version
        for react native. To understand, we&rsquo;ll look at some key concepts
        of it.
      </p>
      <h2 className="text-2xl font-bold">🔧 Metro Bundler</h2>
      <p className="">
        Metro is the javascript bundler for React Native. Takes in options, an
        entry file, and gives you a JavaScript file including all JavaScript
        files back. Every time you run a react native project, a compilation of
        many javascript files are done into a single file.
      </p>
      <h2 className="font-bold text-xl">
        How It Communicates With Simulator Or Device
      </h2>
      <p>
        Metro also opens a WebSocket connection with the app&rsquo;s JavaScript
        runtime (on the device or simulator).
      </p>
      <h2 className="font-bold text-xl">Dependency Graph</h2>
      <p>
        Metro creates a dependency graph for your entire project. Each module
        has a unique id. When you make a change in a file, Metro parses the
        updated file, then rebuilds only the affected modules by walking the
        dependency graph — instead of recompiling the whole app. Lastly, metro
        sends a &quot;update patch&quot; message like below, via Websocket
      </p>
      <UpdatePatchMessage />
      <h2 className="text-2xl  font-bold">
        🌐 HMR And Websocket Communication
      </h2>
      <p>
        The app has an embedded HMR client (JavaScript runtime). And it listens
        the metro bundlers messages via Websocket. When the runtime receives
        &quot;update patch&quot; message, it injects the new module code to the
        module.
      </p>
      <UpdatePatchMessageUsage />
      <p>
        It is that simple, but lets go a little deeper in HMR flow, especially
        module systems, which makes this possible
      </p>
      <h2 className="font-bold text-2xl">📦 Module Systems</h2>
      <p>
        React Native uses CommonJs like module system. Every module is wrapped
        like
      </p>
      <CommonJsWrapperComponent />
      <p>
        What does CommonJS like means? Well, CommonJS is the older module
        system. To give a visual representation
      </p>
      <CommonJsExampleComponent />
      <p>But wait — don&rsquo;t we use import and export nowadays? </p>
      <p>
        Yes! We write ESModules (ESM), but Metro transpiles them into CommonJS
        behind the scenes. Why?
      </p>
      <p className="text-xl font-bold">🤔 Why Not Use ESModules Directly?</p>
      <p>
        Why metro does that? It is because dynamic exporting is available
        CommonJs module system, not ESModules. Dynamic export means the ability
        to modify what a module exports at runtime. Here is an example.
      </p>
      <CommonJsDynamicComponent />
      <p>
        ESModules does not allow that to enforce static structure. That lets the
        webpack, rollup ,... etc. do Tree Shaking, static analysis, code
        splitting easily. Besides, it has another system called Live Bindings.
        (we well not cover any of these).
      </p>
      <h2 className=" font-bold text-2xl">🔁 From HMR to Fast Refresh</h2>
      <p>
        HMR alone doesn&rsquo;t know or care about React — it just swaps
        modules.
      </p>
      <p>Fast Refresh adds React-aware logic on top using React Refresh.</p>
      <p>
        If the updated module exports a React component, React Refresh compares
        previous and new versions code. If the component is
        <span className="ml-1 inline-block bg-primary text-white px-3 py-0.5 rounded-full font-semibold">
          Refresh Boundary Safe
        </span>
        , component wil be re-rendered in place and so state and context are
        preserved.
      </p>
      <p>
        Otherwise, it triggers a full reload. Lets talk about what Refresh
        Boundary Safe is.
      </p>
      <p className="font-bold text-xl">
        How to be Refresh Boundary Safe Component?
      </p>
      <p>
        React compares the old and new function signatures, i.e., the shape and
        order of hooks. If the signature is not changed, the component is
        refresh boundary safe!
      </p>
      <p>
        I can give you a very basic example, If you add a useEffect before an
        existing useState, you change the order of hooks — and React Fast
        Refresh will trigger a full remount, so state will be lost.
      </p>
      <ExampleComponent />
      <HookOrderChangeComponent />
      <p>
        However, if you add the hook after existing ones, the signature is
        preserved and state remains intact.
      </p>
      <HookOrderUnchangedComponent />

      <h2 className="font-bold text-2xl">🏁 Final Thoughts</h2>
      <p>
        Fast Refresh is one of the most powerful parts of the React Native
        developer experience. By building on top of HMR, Metro, and React
        Refresh, it lets developers iterate on UI and logic with near-instant
        feedback — while preserving state.
      </p>
      <p>
        I hope this breakdown helped you understand what&rsquo;s happening
        behind the scenes every time you hit “Save”!
      </p>
      <p>
        → Found this helpful? Let me know or share it with a fellow React Native
        dev 🚀
      </p>
    </div>
  );
}
