import ProblemMdx from "./markdown/problem.mdx";
import ProblemUsageMdx from "./markdown/problem-component-usage.mdx";
import ContextSplitting from "./markdown/context-splitting.mdx";
import ContextSplittingMore from "./markdown/context-splitting-more.mdx";
import GranularSelection from "./markdown/granular.mdx";
import FalseSolution from "./markdown/false-solution.mdx";
import Zustand from "./markdown/zustand.mdx";
import ZustandUsage from "./markdown/zustand-usage.mdx";
import ZustandUsage2 from "./markdown/zustand-usage-2.mdx";
import CustomImpl from "./markdown/custom-impl.mdx";
import CustomImpl2 from "./markdown/custom-impl-2.mdx";
import CustomImpl3 from "./markdown/custom-impl-3.mdx";
import StateFlowchart from "./server-components/state-flow";

export default function Page() {
  return (
    <div className="flex w-full relative flex-col leading-relaxed text-gray-300 gap-4">
      <h1 className="w-2/3 font-extrabold text-4xl mb-14 text-primary sm:text-gradient">
        External And Internal Stores
      </h1>
      <p>
        When two or more components need the same state for business logic or
        decide which component to show on the screen, it is time to look for
        some state management solution. In some cases, a regular context or
        reducer api will be enough. They are the built-in solution for sharing
        state across components. Other way is using a external store library, or
        creating your own implementation with useSyncExternalStore() func. Lets
        see what are the differences and when to use which one.
      </p>
      <h1 className="font-bold text-2xl">The Differences</h1>
      <p>
        <strong>Internal Stores</strong> are managed by the react tree itself.{" "}
        <strong>External Stores</strong> are managed outside of the react tree,
        usually in a global state container. So the main difference is, when the
        state changes, in internal stores, the components that are consuming the
        state will{" "}
        <strong>
          {" "}
          re-render based on the react's reconciliation algorithm
        </strong>
        . In external stores, the state change can be detected by subscribing to
        the store, and only the components that are subscribed to the specific
        state will re-render.
      </p>
      <h1 className="font-bold text-2xl">Example Case</h1>
      <p>
        This is a simple case to implement different store systems. We have 2
        states to store global. To solve the state management problem, I
        introduced the context api and write the code.
      </p>
      <ProblemMdx />
      <p>And used the hook in different components like this</p>
      <ProblemUsageMdx />
      <h1 className="font-bold text-2xl">The Rerendering Problem</h1>
      <p>
        In the current implementation, any change in the global state will cause
        all components that consume this state to re-render. For example, if the{" "}
        <strong>user</strong> state changes, even though the{" "}
        <strong>SettingsBody</strong> component is not using the user state, it
        will rerender too.
      </p>
      <p>
        But, we can solve this this by a pattern, called{" "}
        <strong>Context Splitting</strong>
      </p>
      <h1 className="font-bold text-2xl">Context Splitting</h1>
      <p>
        This approach suggests using different Context Providers for unrelated
        states. In our case we can apply that easily!
      </p>
      <ContextSplitting />
      <p>
        By doing this, we ensure that the <strong>SettingsBody</strong>{" "}
        component is not rerendered when user state change or vice versa.
      </p>
      <p>
        We can split the contexts of setters and values as well. So if the
        component is not using the user state but setUser function will not be
        rerendered after user state changed.
      </p>
      <ContextSplittingMore />
      <p>
        We fixed the unnecessary rerendering issue for SettingBody and UserCard
        components. But there is still one more problem left, the lack of{" "}
        <strong>granular selection</strong> of state properties.
      </p>
      <GranularSelection />
      <p>
        The example above shows that even after splitting the contexts, we are
        not able to achieve granular selection of state properties. All
        components consuming the user context will rerender when any property of
        the user provider's states changes.(The <strong>BadgeCard</strong>{" "}
        rerender if the email state change)
      </p>
      <p>We might try a solution like</p>
      <FalseSolution />
      <p>
        But this will not solve the issue, we separated the usages with hooks
        but we still use the useContext() func that does not have the granular
        selection{" "}
      </p>
      <p>
        Unfortunately, with the Context API alone, we cannot achieve this level
        of selection without a third party library.
      </p>
      <h1 className="font-bold text-2xl">External Stores</h1>
      <p>
        <a
          className=" underline"
          href="https://github.com/pmndrs/zustand"
          target="_blank"
          rel="noopener noreferrer"
        >
          Zustand
        </a>{" "}
        , Redux, Jotai, Recoil are some of the popular external store libraries.
        They provide a way to manage global state outside of the React component
        tree, allowing for more granular control over state updates and
        re-renders. Lets see how we can implement the same example with Zustand.
      </p>
      <Zustand />
      <ZustandUsage />
      <ZustandUsage2 />
      <p>
        The above examples solves the unnecessary rerender problem without the
        need for context splitting. Also, selections are granular!
      </p>

      <p>
        Also zustand has a beautiful feature <strong>persist</strong> which
        makes your states persistent between sessions! (actually, not related to
        our topic :))
      </p>
      <h1 className="font-bold text-2xl">Custom Implementation</h1>
      <p>
        We can use zustand, but to understand how it works, let's create a
        custom external store like zustand. We need a store that lives outside
        React:
      </p>
      <CustomImpl />
      <p>
        Now, we will use{" "}
        <a
          className=" underline"
          href="https://react.dev/reference/react/useSyncExternalStore"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>useSyncExternalStore</strong>
        </a>{" "}
        hook to bind the store
      </p>
      <CustomImpl2 />
      <div className="flex flex-row gap-5 bg-codebg">
        <div className="h-full w-4 bg-primary"></div>
        <div className="flex flex-col">
          <p>
            The implementation uses Object.is for comparison, which checks
            reference equality. For deep equality or custom comparison, we'd
            need additional logic like Zustand's shallow comparison. For the
            purpose of this article, we'll keep it simple with reference
            equality!
          </p>
        </div>
      </div>

      <p>And use the hook in our components</p>
      <CustomImpl3 />

      <h1 className="font-bold text-2xl">How To Decide</h1>
      <p>
        In terms of bundle size, context is free because it is built-in. Zustand
        is relatively small but adds some overhead (~about 3KB
        minified+gzipped). If bundle size is a concern, context might be the
        better choice for a very small app.
      </p>
      <p>
        For performance, React 19's compiler can auto-memoize components,
        reducing the cost of rerenders from Context. However, Context will still
        trigger rerenders for all consumers when its value changes - the
        compiler just makes those rerenders cheaper.
      </p>
      <p>
        The real deal is <strong>granular selection</strong>. With external
        stores, we can achieve this level of selection without any issues. And
        this can lead to significant performance improvements in large
        applications with complex state management needs.
      </p>
      <div>
        <StateFlowchart />
      </div>
      <h1 className="font-bold text-2xl">Conclusion</h1>
      <p>
        Context is <strong>tied to React's component tree</strong>. External
        stores live independently and{" "}
        <strong>only notify React when necessary</strong>. The granular
        selection is a very powerful feature that can lead to better performance
        in complex apps. If your app has simple state needs and you want to
        avoid extra dependencies, Context is fine. In the end, the performance
        depends on how you use them. I prefer external stores as they give more
        power (like persist feature), and also they are not react dependent.
      </p>
    </div>
  );
}
