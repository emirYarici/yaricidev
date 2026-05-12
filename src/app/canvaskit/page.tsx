export default function CanvasKitPage() {
  return (
    <div className="flex w-full relative flex-col leading-relaxed text-gray-300 gap-4">
      <h1 className="w-2/3 font-extrabold text-4xl mb-14 text-primary sm:text-gradient">
        High-Performance Canvas Rendering with CanvasKit
      </h1>
      <p>
        You pick CanvasKit because it&apos;s fast. WebGL-backed, WASM-powered —
        the whole pitch. You build your visualization, throw in a few hundred
        shapes, add some grid lines, slap on a scroll handler.
      </p>
      <p>And then it stutters.</p>
      <p>
        Not because CanvasKit is slow. Because you&apos;re treating it like a
        regular Canvas 2D API. That mindset will cost you. Let&apos;s fix it.
      </p>

      <h1 className="font-bold text-2xl">🗂️ What Is CanvasKit</h1>
      <p>
        CanvasKit is a WebAssembly port of Skia — the same 2D graphics engine
        that powers Chrome, Android, and Flutter. It gives you a GPU-accelerated
        canvas with a rich drawing API, all from JavaScript.
      </p>
      <div className="bg-[#232936] p-3 rounded-md">
        <p>
          The catch? It runs on a WASM heap, not the JS heap. That changes how
          you think about memory, allocation, and rendering lifecycle.
        </p>
      </div>

      <h1 className="font-bold text-2xl">The Problem</h1>
      <p>
        Let&apos;s say you have 500 data elements. Your viewport shows 20 of
        them. You&apos;re drawing all 500. Every frame. Recomputing
        coordinates, colors, and text for things completely off-screen.
      </p>
      <p>
        The GPU can handle those draw calls. But your <strong>CPU</strong> is
        burning every frame on useless work.
      </p>
      <p>
        This is the most common mistake in canvas-based rendering. And it
        compounds — the more elements you add, the worse it gets, even if the
        viewport never changes.
      </p>

      <h1 className="font-bold text-2xl">
        🗃️ Layering — Draw Less, Not Faster
      </h1>
      <p>
        Before we optimize individual draw calls, let&apos;s talk architecture.
        Because the biggest win isn&apos;t in <em>how</em> you draw — it&apos;s
        in <em>what</em> you decide to redraw.
      </p>
      <p>
        A canvas visualization is not one thing. It&apos;s a stack of
        independent layers, each with a completely different reason to update:
      </p>
      <ul className="list-disc list-inside space-y-1 ml-4">
        <li>
          <strong>Background grid</strong> — only cares about zoom and scroll
        </li>
        <li>
          <strong>Data elements</strong> — only cares about data changes and
          scroll
        </li>
        <li>
          <strong>Hover / selection</strong> — changes every time the mouse
          moves
        </li>
        <li>
          <strong>Fixed chrome</strong> (headers, sidebars) — almost never
          changes
        </li>
      </ul>

      <h2 className="font-bold text-xl">
        PictureRecorder — not makeImageSnapshot
      </h2>
      <p>
        Most tutorials suggest offscreen surfaces with{" "}
        <code>makeImageSnapshot()</code>. The idea is right but the tool is
        wrong.
      </p>
      <div className="bg-[#232936] p-3 rounded-md">
        <p>
          <code>makeImageSnapshot()</code> copies pixel data GPU → CPU → GPU
          every time you use it. You&apos;ve added a round-trip to a system that
          was supposed to eliminate redraw work.
        </p>
      </div>
      <p>
        The correct primitive is <code>PictureRecorder</code>. Instead of
        capturing pixels, it records a <em>display list</em> — a serialised
        sequence of draw commands. The result, <code>SkPicture</code>, lives
        entirely on the GPU side. Replaying it costs almost nothing.
      </p>

      <h2 className="font-bold text-xl">The Scroll Quantum Trick</h2>
      <p>
        But wait — even with <code>PictureRecorder</code>, rebuilding on every
        pixel of scroll is wasteful.
      </p>
      <p>
        The trick is to record each picture with a buffer larger than the
        viewport — a thousand or so pixels in each scrollable direction. Then
        you snap the camera position to a fixed step size (the{" "}
        <em>quantum</em>).
      </p>
      <p>
        <strong>The result?</strong> Scrolling through thousands of elements
        triggers a content layer rebuild once every few hundred pixels. Every
        frame between those rebuilds costs essentially nothing.
      </p>

      <h2 className="font-bold text-xl">Per-Layer Dirty Masks</h2>
      <p>
        One boolean dirty flag isn&apos;t enough. A selection change
        doesn&apos;t affect the grid. A data update doesn&apos;t affect the
        cursor.
      </p>
      <div className="bg-[#232936] p-3 rounded-md">
        <pre className="text-sm bg-transparent p-0 overflow-hidden">
          {`const DirtyFlags = {
  SCROLL:    1 << 0,
  ZOOM:      1 << 1,
  DATA:      1 << 2,
  SELECTION: 1 << 3,
  CURSOR:    1 << 4,
};`}
        </pre>
      </div>
      <p>
        Each layer wakes up only for what can actually affect it. Nothing more.
      </p>

      <h2 className="font-bold text-xl">DPR Pixel Snapping</h2>
      <p>
        When you replay a layer with a sub-quantum translation, geometry can
        straddle pixel boundaries, causing blurriness.
      </p>
      <div className="bg-[#232936] p-3 rounded-md">
        <pre className="text-sm bg-transparent p-0">
          {`const dpr = window.devicePixelRatio;
const dx = Math.round((anchorX - camera.x) * dpr) / dpr;
const dy = Math.round((anchorY - camera.y) * dpr) / dpr;
canvas.translate(dx, dy);`}
        </pre>
      </div>

      <h2 className="font-bold text-xl">Frozen Regions</h2>
      <p>
        Many visualizations have regions that stay fixed while content scrolls —
        a pinned header or a frozen axis. Don&apos;t include these in the
        regular rebuild cycle.
      </p>
      <p>
        Treat them as a separate <code>SkPicture</code> with the relevant camera
        axis frozen at zero.
      </p>

      <h1 className="font-bold text-2xl">🔢 Virtualize</h1>
      <p>
        500 elements in your dataset. 20 visible. Draw only the 20. Render time
        becomes proportional to viewport size, not dataset size. 5000 elements
        performs the same as 50.
      </p>
      <div className="bg-[#232936] p-3 rounded-md">
        <pre className="text-sm bg-transparent p-0">
          {`const itemHeight = 40;
const firstVisible = Math.floor(scrollY / itemHeight);
const lastVisible = Math.ceil((scrollY + viewportHeight) / itemHeight);

for (let i = firstVisible; i <= lastVisible; i++) {
  if (!items[i]) continue;
  drawItem(canvas, items[i]);
}`}
        </pre>
      </div>

      <h1 className="font-bold text-2xl">
        🚫 Disable Antialiasing on Rectangles
      </h1>
      <p>
        Skia does <strong>analytical antialiasing</strong>. Beautiful, but runs
        per-shape. For an axis-aligned rectangle on whole pixel boundaries?
        It&apos;s pure wasted work.
      </p>
      <div className="bg-[#BA8E23]/10 border-l-4 border-[#BA8E23] p-4 rounded-r-md">
        <p className="font-bold text-[#BA8E23] mb-1">⚠️ One caveat</p>
        <p>
          This only works when your coordinates land on whole pixel boundaries.
          You need to <code>Math.round()</code> before drawing — otherwise
          disabling AA makes things look worse.
        </p>
      </div>

      <h1 className="font-bold text-2xl">🏊 Pool Your Paint and Path Objects</h1>
      <p>
        Every <code>new CanvasKit.Paint()</code> and{" "}
        <code>new CanvasKit.Path()</code> is a WASM heap allocation. Doing this
        inside your draw loop will cause frame drops.
      </p>
      <p>
        The robust solution is a <strong>pool</strong>. The key call when
        pulling a path from the pool is <code>path.rewind()</code> — it clears
        the geometry without deallocating the internal buffer.
      </p>

      <h1 className="font-bold text-2xl">🎯 Batch Geometry</h1>
      <p>
        Every individual <code>drawRect()</code> is a separate GPU command. The
        fix: collect all geometry of the same visual style into one{" "}
        <code>CanvasKit.Path</code> and issue a single <code>drawPath()</code>.
      </p>
      <div className="bg-[#232936] p-3 rounded-md">
        <pre className="text-sm bg-transparent p-0">
          {`// Batching N calls into 1
const path = pathPool.acquire();
for (const item of visibleItems) {
  path.addRect(itemRect(item));
}
canvas.drawPath(path, paint);`}
        </pre>
      </div>

      <h1 className="font-bold text-2xl">🔤 Text Caching</h1>
      <p>
        Text is the silent bottleneck. Render each unique label exactly once
        into a small offscreen surface. Snapshot it as an image. On every
        subsequent frame, blit the image.
      </p>
      <div className="bg-[#232936] p-3 rounded-md">
        <p>
          <strong>Critical:</strong> The JavaScript GC does not touch WASM
          memory. You <strong>MUST</strong> call <code>.delete()</code> on the
          image when you evict it from your cache.
        </p>
      </div>

      <h1 className="font-bold text-2xl">🏁 Final Thoughts</h1>
      <p>
        These optimizations compound. Virtualization means fewer elements to
        process. Batching collapses those elements into a handful of draw calls.
        Pooling removes allocation pressure.
      </p>
      <p>
        → Found this helpful? Let me know or share it with a fellow dev
        🚀
      </p>
    </div>
  );
}
