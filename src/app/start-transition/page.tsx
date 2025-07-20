import { WithoutStartTransition } from "./client-components/without-start-transition";

import NonUrgentUpdate from "./markdown/non-urgent-update.mdx";
import NonUrgentUpdateTransition from "./markdown/non-urgent-update-transition.mdx";
import WrongLoadingImplementation from "./markdown/transition-wrong-loading.mdx";
import RightLoadingImplementation from "./markdown/transition-right-loading.mdx";

import { ButtonLayout } from "./server-components/button-layout";

import OldEnabling from "./markdown/old-enabling.mdx";

export default function StartTransitionPage() {
  return (
    <div className="flex w-full relative flex-col leading-relaxed text-gray-300 gap-4">
      <h1 className="w-2/3 font-extrabold text-4xl mb-14 text-primary sm:text-gradient">
        Start Transition
      </h1>
      <p>
        <strong>startTransition</strong>, a gateway to the using React&apos;s s
        one of the greatest features, <strong>concurrency</strong>. In this
        post, I will try to explain how to use it and also how it works under
        the hood. Let’s start with a brief overview of concurrency.
      </p>
      <h1 className="font-bold text-2xl">🔀 What is Concurrency</h1>
      <div className="bg-[#232936] p-3 rounded-md">
        <p>
          Concurrent React is more important than a typical implementation
          detail — it’s a foundational update to React’s core rendering model.
          So while it’s not super important to know how concurrency works, it
          may be worth knowing what it is at a high level.
        </p>
        <p>- March 29, 2022 by The React Team</p>
      </div>
      <p>
        Yes, it’s been a while — 3+ years — but I need to touch this great
        feature and explain it to understand <strong> startTransition</strong>{" "}
        api. By the way, you can opt in to concurrency mode in React v16.
      </p>
      <p>
        To enabling the concurrent mode you will use <strong>createRoot</strong>{" "}
        in old times
      </p>
      <OldEnabling />
      <p>
        In React 18+, concurrency is the default — no need to opt-in. The term
        &apos;Concurrent Mode&apos; is no longer used as a special opt-in flag.
        It&apos;s just &apos;Concurrent React&apos; now.
      </p>
      <h1 className="font-bold text-2xl">🔍 What Concurrent React Does</h1>
      <p>
        Concurrent React makes rendering interruptible. It lets React discard,
        pause and resume rendering so the UI stays responsive even during heavy
        updates.
      </p>
      <p>
        In other words, now the React became{" "}
        <strong>asyncronus in rendering phase.</strong>
      </p>
      <p>
        <strong>Without Concurrent React</strong>: Updates are synchronous — the
        entire render must finish before anything changes on screen.
      </p>
      <p className="text-2xl font-bold">🤔 What Was It Like Before?</p>
      <NonUrgentUpdate />
      <p>
        The code above is a simple example of a react component that has tabs
        and applies different level of computing intensive heavy filtering,
        depending on the tab.
      </p>
      <p>
        When you switch between tabs, your entire UI might freeze until the
        filtering is finished. Why?
      </p>
      <p>
        Because React processes the state update and filtering logic in one big
        synchronous chunk.
      </p>
      <p>
        During that time, it can&apos;st respond to user input, paint updates,
        or even register other tab clicks.
      </p>
      <h1 className="font-bold text-xl">🚀 Live Example</h1>
      <div className="flex flex-row w-full gap-2 items-center">
        <div className="size-3 rounded-full bg-blue-700" />
        <div className="size-3 rounded-full bg-green-700" />

        <div className="size-3 rounded-full bg-[#BA8E23]" />
        <p> Darker colors in the end visualizes tab key state change</p>
      </div>
      <div className="flex flex-row w-full gap-2 items-center">
        <div className="size-3 rounded-full bg-[#E6605F]" />

        <p> Red color visualizes loading state change</p>
      </div>
      <div className=" flex w-full p-3 rounded-md bg-[#232936]">
        <WithoutStartTransition />
      </div>
      <p>
        Here&apos;s a live example where we filter a large dataset without using{" "}
        <code>startTransition</code>. The work that will be done by the React is
        visualized in the timeline.{" "}
        <strong>
          Try clicking between tabs quickly multiple times and watch how the UI
          freezes.
        </strong>
      </p>
      <h1 className="font-bold text-xl">⏳ Interaction Queue</h1>
      <p>
        As you can see, the clicks are queued. You might wonder: if React is
        busy, how are these clicks even registered? The answer is — the browser
        handles input events, and queues them. Once React is free again, it
        processes the latest state and responds accordingly
      </p>
      <p className="text-2xl font-bold">🧪 What is Start Transition</p>
      <p>
        Finally we are here 😀. startTransition lets you mark an update as
        non-urgent. This allows React to prioritize more urgent interactions —
        like clicks, text input, or animations — and pause or discard the
        lower-priority work in startTransition.
      </p>
      <NonUrgentUpdateTransition />
      <h1 className="font-bold text-xl">👣 Step By Step Execution</h1>
      <ButtonLayout activeTabName="light" />
      <p>
        User is on home tab currently. At some time, our user pressed on profile
        and feed sequentially, nearly in the same time
      </p>
      <p>
        Lets see what is happening step by step, how the priorities are changed!
      </p>
      <p className="font-bold ">Step 1️⃣</p>
      <p>User pressed to profile which has this unit of work</p>
      <div
        className="w-3/5 justify-between items-center text-sm flex flex-row overflow-hidden rounded-md  h-[40px] bg-primary outline-[0.5px] outline-background relative"
        style={{
          backgroundColor: "lightgreen",
        }}
      >
        <p className="p-3 text-black">filtering work</p>
        <div
          className=" h-full   flex items-center p-3"
          style={{
            backgroundColor: "green",
          }}
        >
          <p className="text-black">tab change work</p>
        </div>
      </div>
      <p>
        This order will change, because <strong>filtering work</strong> is now
        has <strong>&apos;non-urgent&apos;</strong> priority
      </p>
      <div className="flex w-full flex-col bg-[#232936] h-20 px-2  rounded-md ">
        <p>Queue</p>
        <div
          className="w-2/5 ml-8 justify-between items-center text-sm flex flex-row overflow-hidden rounded-md  h-[40px] bg-primary outline-[0.5px] outline-background relative"
          style={{
            backgroundColor: "lightgreen",
          }}
        >
          <div
            className=" h-full absolute left-0 flex items-center p-3"
            style={{
              backgroundColor: "green",
            }}
          ></div>
        </div>
      </div>
      <p>
        State change is renderered and committed, and user is on the hard work
        tab <strong>without freezing!</strong>
      </p>
      <p>
        React start to filter the data for profile, but remember, it is a{" "}
        <strong> non-urgent </strong> work!
      </p>
      <ButtonLayout activeTabName="medium" />
      <div className="flex w-full flex-col bg-[#232936] h-20 px-2  rounded-md ">
        <p>Queue</p>
        <div
          className="w-1/3  mx-10 justify-between items-center text-sm flex flex-row overflow-hidden rounded-r-md  h-[40px] bg-primary outline-[0.5px] outline-background relative"
          style={{
            backgroundColor: "lightgreen",
          }}
        ></div>
      </div>
      <p className="font-bold">Step 2️⃣</p>
      <p>
        Now user clicks feed button. This is the unit of work that we will add
        this time
      </p>
      <div
        className="justify-between items-center text-sm flex flex-row overflow-hidden rounded-md  h-[40px] bg-primary outline-[0.5px] outline-background relative"
        style={{
          backgroundColor: "lightyellow",
        }}
      >
        <p className=" w-3/5 p-3 text-black">filtering work</p>
        <div
          className=" h-full   flex items-center p-3"
          style={{
            backgroundColor: "#BA8E23",
          }}
        >
          <p className="text-black">tab change work</p>
        </div>
      </div>
      <p>
        We have a leftover filtering work in timeline(the profile
        filtering).React will continue to render and commit updates like this
      </p>
      <div className="flex w-full flex-col bg-[#232936] h-20 px-2  rounded-md ">
        <p>Queue</p>
        <div
          className="w-3/5 mx-8 justify-between items-center text-sm flex flex-row overflow-hidden rounded-md  h-[40px] bg-primary outline-[0.5px] outline-background relative"
          style={{
            backgroundColor: "lightyellow",
          }}
        >
          <div className="bg-[#BA8E23] w-6 h-[40px] "></div>
        </div>
      </div>
      <h1 className="font-bold">❗ Transitions are not queued</h1>
      <p>
        There is no green filtering work pill in the last queue visualization,
        right?
      </p>
      <p>
        If a new startTransition call comes in before the previous one finishes,
        React may discard the previous render work if it wasn’t committed yet.
      </p>
      <ButtonLayout activeTabName="heavy" />
      <p>
        Now user is on the feed tab and did not waited for the hard work tabs
        filtering to complete!
      </p>
      <h1 className="text-2xl font-bold ">🚪 useTransition() Hook</h1>
      <p>
        In the last implementation with <strong>startTransition</strong>, we
        dont have any loading state! We could refactor like this to introduce a
        loading state.
      </p>
      <WrongLoadingImplementation />
      <p>
        But this implementation will not work as expected, cause as you
        remember, Concurrent React <strong>de-prioritize</strong> the work in
        the startTransition.
      </p>
      <p>
        So when button clicked, loading state will change to true, but
        immediately false value will be set.
      </p>
      <p>
        But we can achieve loading behaviour with useTransition hook! (We can do
        other things, but this is the clean way! )
      </p>
      <RightLoadingImplementation />
      <p>We can now show loading state in the UI!</p>
      <h1 className="font-bold text-2xl">📚 Research Tip</h1>
      <p>
        Concurreny is not only about performance, it also enables some great
        features that came up recently like data fetching with suspense. It’s
        worth exploring those too!
      </p>
      <h1 className="font-bold text-2xl">🏁 Final Thoughts</h1>
      <p>
        User experience matters. Without startTransition, a filter or tab switch
        could freeze the UI, especially in low end devices like mobile phones.
        With it, React stays snappy and users can keep tapping around even while
        heavy stuff is going on in the background.
      </p>
      <p>
        → Found this helpful? Let me know or share it with a fellow React Native
        dev 🚀
      </p>
    </div>
  );
}
