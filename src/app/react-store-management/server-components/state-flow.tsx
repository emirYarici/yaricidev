export default function StateFlowchart() {
  return (
    <div className="overflow-x-scroll max-w-xl mx-auto py-8">
      <div className="flex flex-col  gap-4 ">
        {/* Question 1 */}
        <div className="rounded-lg border-2 border-primary bg-background  px-16 py-4 font-medium text-center">
          Do you need to share state?
        </div>

        <div className="flex items-start gap-12">
          {/* No Path */}
          <div className="flex flex-col items-center gap-3">
            <div className="text-sm font-semibold">No</div>
            <div className="w-px h-6 bg-border" />
            <div className="rounded-lg bg-primary text-white px-6 py-3 font-medium shadow-sm">
              Local state
            </div>
          </div>

          {/* Yes Path */}
          <div className="flex flex-col items-center gap-3 ">
            <div className="text-sm font-semibold">Yes</div>
            <div className="w-px h-6 bg-border" />

            {/* Question 2 */}
            <div className="rounded-lg w-full border-2 border-primary bg-background px-8 py-4 font-medium text-center">
              Is it deeply nested
              <br />
              (3+ levels)?
            </div>

            <div className="flex items-start gap-12">
              {/* No Path */}
              <div className="flex flex-col items-center gap-3">
                <div className="text-sm font-semibold">No</div>
                <div className="w-px h-6 bg-border" />
                <div className="rounded-lg bg-primary text-white px-6 py-3 font-medium shadow-sm">
                  Pass props
                </div>
              </div>

              {/* Yes Path */}
              <div className="flex flex-col items-center gap-3">
                <div className="text-sm font-semibold">Yes</div>
                <div className="w-px h-6 bg-border" />

                {/* Question 3 */}

                <div className="rounded-lg border-2 border-primary bg-background px-8 py-4 font-medium text-center max-w-xs">
                  Does it update frequently AND do different components need
                  different slices?
                </div>

                <div className="flex items-start gap-12">
                  {/* No Path */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-sm font-semibold">No</div>
                    <div className="w-px h-6 bg-border" />
                    <div className="rounded-lg bg-primary text-white px-6 py-3 font-medium shadow-sm">
                      Context API
                    </div>
                  </div>

                  {/* Yes Path */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-sm font-semibold">Yes</div>
                    <div className="w-px h-6 bg-border" />
                    <div className="rounded-lg bg-primary text-white px-6 py-3 font-medium shadow-sm">
                      External store
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
