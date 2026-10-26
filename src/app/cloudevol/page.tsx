import Image from "next/image";
import CalderaConf from "./markdown/caldera-conf.mdx";
import OverlayRemap from "./markdown/overlay-remap.mdx";
import KeymapFix from "./markdown/keymap-fix.mdx";

export default function CloudevolPage() {
  return (
    <div className="flex w-full relative flex-col leading-relaxed text-gray-300 gap-4 [&_strong]:text-primary">
      <h1 className="w-full md:w-3/4 font-extrabold text-4xl mb-14 text-primary sm:text-gradient">
        Building My Own Split Keyboard (cloudevol) &amp; Fixing It With a Paperclip
      </h1>

      <p>
        A while ago I watched{" "}
        <a
          className="underline text-primary font-medium"
          href="https://www.youtube.com/watch?v=7UXsD7nSfDY"
          target="_blank"
          rel="noopener noreferrer"
        >
          this YouTube video
        </a>{" "}
        where the creator builds a wireless split keyboard called{" "}
        <strong>Caldera</strong>. I really liked how clean and minimal it
        looked, so I decided to build the exact same one for myself.
      </p>

      <div className="w-full aspect-video rounded-lg overflow-hidden border border-gray-800 my-2">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/7UXsD7nSfDY"
          title="Caldera Split Keyboard Build"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <p>
        I downloaded the open-source PCB files from the video, ordered the
        boards, 3D-printed the orange case, and soldered everything at home.
        Here is how my build — <strong>cloudevol</strong> — turned out:
      </p>

      <div className="w-full rounded-lg overflow-hidden border border-gray-800 my-2">
        <Image
          src="/cloudevol.jpg"
          alt="cloudevol wireless split keyboard"
          width={1800}
          height={579}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      <p>
        In this post, I want to share the story of building it — and how I
        ended up fixing a broken column of keys by soldering a{" "}
        <strong>paperclip</strong> inside the keyboard. Lets jump straight in!
      </p>

      <h2 className="font-bold text-2xl mt-4">⌨️ How the Keyboard Works</h2>
      <p>
        It&apos;s a 60-key wireless split keyboard (30 keys on the left, 30 on
        the right). There are no cables at all.
      </p>
      <p>
        Each side has its own tiny brain (a <strong>nice!nano v2</strong> chip)
        and a small battery. They run open-source firmware called{" "}
        <strong>ZMK</strong>:
      </p>

      <div className="bg-[#232936] p-4 rounded-md flex flex-col gap-2">
        <p>
          <strong>Right side:</strong> Whenever you press a key on the right
          half, it sends that press wirelessly to the left half.
        </p>
        <p>
          <strong>Left side (Main):</strong> Collects key presses from both
          sides and sends them to my Mac over Bluetooth under the name{" "}
          <code>cloudevol</code>.
        </p>
      </div>

      <CalderaConf />

      <h2 className="font-bold text-2xl mt-4">
        💥 The Problem: 5 Keys Refused to Work
      </h2>
      <p>
        After soldering 60 switches, 60 tiny diodes, and the two controller
        chips, I plugged the keyboard in to test it.
      </p>
      <p>
        Almost everything worked, except one vertical line of keys on the left
        side: <strong><code>5</code>, <code>T</code>, <code>G</code>,{" "}
        <code>B</code>, and the thumb <code>FN</code> key</strong>. None of
        them responded when pressed.
      </p>
      <p>
        On a keyboard PCB, keys in the same vertical column share a single wire
        (trace) going into one pin on the chip. If one key breaks, it&apos;s a
        bad switch. If the <strong>whole column</strong> dies together, the pin
        feeding that column is broken.
      </p>
      <p>
        While soldering the chip onto the board, <strong>Pin 017</strong> (the
        pin for that column) accidentally touched ground (<code>GND</code>)
        underneath the chip. Because the chip was already soldered flat onto the
        board, I couldn&apos;t reach underneath with my soldering iron to clean
        it.
      </p>

      <h2 className="font-bold text-2xl mt-4">
        📎 The Paperclip Idea (Pin 104)
      </h2>
      <p>
        Desoldering a 24-pin chip without ruining the board is almost
        impossible. Instead, I looked for a simpler workaround:
      </p>
      <p>
        The chip had spare pins that weren&apos;t being used at all — like{" "}
        <strong>Pin 104</strong>. What if we just tell the software to use Pin
        104 for that column instead of the broken Pin 017, and connect Pin 104
        to the <code>T</code> key with a piece of wire?
      </p>
      <p>
        I didn&apos;t have any thin wire at home. I looked at my desk, saw a{" "}
        <strong>metal paperclip (ataç)</strong>, bent it into shape, and
        soldered it from <strong>Pin 104</strong> directly to the{" "}
        <code>T</code> switch socket. Then I changed one line in the config:
      </p>

      <OverlayRemap />

      <p>
        I updated the keyboard and pressed <code>T</code>.{" "}
        <strong>It still didn&apos;t work!</strong>
      </p>

      <h2 className="font-bold text-2xl mt-4">
        🔪 Why We Had to Cut the Board With a Knife
      </h2>
      <p>
        At first, it made no sense. Pin 104 was healthy, and the paperclip was
        carrying electricity to the <code>T</code> key. Why wasn&apos;t it
        typing?
      </p>
      <p>
        Looking at the PCB design file gave away the answer:
      </p>

      <div className="bg-[#232936] p-4 rounded-md font-mono text-xs overflow-x-auto my-1">
        <div className="whitespace-pre leading-relaxed text-gray-200">
{`[FN] ─── [B] ─── [G] ─── [T] ─────────── [5] ─── [Broken Pin 017]
                          ▲
                 (Paperclip from 104)`}
        </div>
      </div>

      <p>
        Even though I added the paperclip from Pin 104, the copper line on the
        board was <strong>still connected to the broken Pin 017</strong>! So all
        the electricity coming from Pin 104 was just flowing into the broken pin
        and disappearing.
      </p>
      <p>
        To stop the electricity from leaking back into Pin 017, I took a utility
        knife and scratched through the tiny copper line on the board right
        between <code>T</code> and <code>5</code>:
      </p>

      <div className="bg-[#232936] p-4 rounded-md font-mono text-xs overflow-x-auto my-1">
        <div className="whitespace-pre leading-relaxed text-gray-200">
{`[FN] ─── [B] ─── [G] ─── [T] ── ✂️ (Cut) ── [5] ─── [Broken Pin 017]
                          ▲
                 (Paperclip from 104)`}
        </div>
      </div>

      <p>
        As soon as I cut that line,{" "}
        <strong>
          <code>T</code>, <code>G</code>, <code>B</code>, and <code>FN</code>{" "}
          started working immediately!
        </strong>
      </p>

      <h2 className="font-bold text-2xl mt-4">
        🧠 Fixing the <code>5</code> Key With Code Instead of a Knife
      </h2>
      <p>
        Look at the diagram above again. Because I cut the line between{" "}
        <code>T</code> and <code>5</code>, the <code>5</code> key stayed on the
        broken side of the cut.
      </p>
      <p>
        I could have cut another part of the board and soldered a second wire to
        rescue that switch too. But honestly, why risk scratching a working
        board when we can fix it in software?
      </p>
      <p>
        Normally, the top-left row is <code>ESC, 1, 2, 3, 4, 5</code>. Since the
        6th key on that row was dead, I just shifted the numbers one key to the
        left in the code (<code>1, 2, 3, 4, 5</code>) and moved{" "}
        <code>ESC</code> to <strong><code>FN + 1</code></strong>:
      </p>

      <KeymapFix />

      <h2 className="font-bold text-2xl mt-4">🗺️ Final Key Layout</h2>
      <p>
        Here is how the layout looks now. The orange keys on the left side are
        running through the paperclip soldered to Pin 104:
      </p>

      <div className="my-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] font-mono">
        <div className="bg-[#232936] p-3 rounded-md">
          <div className="text-gray-400 mb-2 font-sans text-xs font-semibold">
            Left Side
          </div>
          <div className="grid grid-cols-6 gap-1.5 text-center">
            {["1", "2", "3", "4", "5", "—"].map((k, i) => (
              <div
                key={`l0-${i}`}
                className={`p-1.5 rounded border ${
                  i === 5
                    ? "bg-[#181c26]/40 text-gray-600 border-gray-800"
                    : "bg-[#181c26] text-white border-gray-700"
                }`}
              >
                {k}
              </div>
            ))}
            {["TAB", "Q", "W", "E", "R", "T"].map((k, i) => (
              <div
                key={`l1-${i}`}
                className={`p-1.5 rounded border ${
                  i === 5
                    ? "bg-primary/20 text-primary border-primary/50 font-bold"
                    : "bg-[#181c26] text-white border-gray-700"
                }`}
              >
                {k}
              </div>
            ))}
            {["CAPS", "A", "S", "D", "F", "G"].map((k, i) => (
              <div
                key={`l2-${i}`}
                className={`p-1.5 rounded border ${
                  i === 5
                    ? "bg-primary/20 text-primary border-primary/50 font-bold"
                    : "bg-[#181c26] text-white border-gray-700"
                }`}
              >
                {k}
              </div>
            ))}
            {["SHFT", "Z", "X", "C", "V", "B"].map((k, i) => (
              <div
                key={`l3-${i}`}
                className={`p-1.5 rounded border ${
                  i === 5
                    ? "bg-primary/20 text-primary border-primary/50 font-bold"
                    : "bg-[#181c26] text-white border-gray-700"
                }`}
              >
                {k}
              </div>
            ))}
            {["CTRL", "OPT", "CMD", "CMD", "SPC", "FN"].map((k, i) => (
              <div
                key={`l4-${i}`}
                className={`p-1.5 rounded border ${
                  i === 5
                    ? "bg-primary/20 text-primary border-primary/50 font-bold"
                    : "bg-[#181c26] text-gray-300 border-gray-700"
                }`}
              >
                {k}
              </div>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-primary font-sans">
            * Orange keys (T, G, B, FN) work via the paperclip on Pin 104.
          </p>
        </div>

        <div className="bg-[#232936] p-3 rounded-md">
          <div className="text-gray-400 mb-2 font-sans text-xs font-semibold">
            Right Side
          </div>
          <div className="grid grid-cols-6 gap-1.5 text-center">
            {["6", "7", "8", "9", "0", "BKSP"].map((k, i) => (
              <div
                key={`r0-${i}`}
                className="p-1.5 rounded bg-[#181c26] text-white border border-gray-700"
              >
                {k}
              </div>
            ))}
            {["Y", "U", "I", "O", "P", "\\"].map((k, i) => (
              <div
                key={`r1-${i}`}
                className="p-1.5 rounded bg-[#181c26] text-white border border-gray-700"
              >
                {k}
              </div>
            ))}
            {["H", "J", "K", "L", ";", "ENT"].map((k, i) => (
              <div
                key={`r2-${i}`}
                className="p-1.5 rounded bg-[#181c26] text-white border border-gray-700"
              >
                {k}
              </div>
            ))}
            {["N", "M", ",", ".", "/", "'"].map((k, i) => (
              <div
                key={`r3-${i}`}
                className="p-1.5 rounded bg-[#181c26] text-white border border-gray-700"
              >
                {k}
              </div>
            ))}
            {["FN", "SPC", "←", "↓", "↑", "→"].map((k, i) => (
              <div
                key={`r4-${i}`}
                className="p-1.5 rounded bg-[#181c26] text-gray-300 border border-gray-700"
              >
                {k}
              </div>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-gray-400 font-sans">
            FN + 1 = ESC | FN + D/F = ( ) | FN + L/; = [ ] | FN + O/P = {`{ }`}
          </p>
        </div>
      </div>

      <h2 className="font-bold text-2xl mt-4">🏁 Final Thoughts</h2>
      <p>
        In software, if you make a mistake, you just hit <code>cmd + z</code>.
        In hardware, a tiny solder mistake underneath a chip can cost you hours
        with tweezers, a knife, and a paperclip.
      </p>
      <p>
        Still, seeing <code>cloudevol</code> show up on my Mac&apos;s Bluetooth
        menu and typing on something I soldered myself feels great. Now I just
        need a few days on Keybr to get used to typing on a split keyboard!
      </p>
      <p>
        → Found this fun? Let me know or share it with a fellow dev 🚀
      </p>
    </div>
  );
}
