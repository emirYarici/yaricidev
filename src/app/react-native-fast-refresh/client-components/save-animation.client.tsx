"use client";
import { useEffect, useState } from "react";
import Example from "../markdown/example.mdx";
export function SaveAnimation() {
  const [input, setInput] = useState("#ff7f50");
  const [inputOnCode, setInputOnCode] = useState("#ff7f50");

  const [color, setColor] = useState("#ff7f50");
  const [step, setstep] = useState(0);
  useEffect(() => {
    console.log(step, "step");
    if (step === 5) {
      setColor(inputOnCode);
      setstep(0);
    }
  }, [step]);

  return (
    <div className=" flex-1 flex-col gap-2 hidden sm:flex">
      <div className="flex flex-1 flex-row  gap-2">
        <div className=" flex flex-1  flex-col relative gap-2">
          <button
            type="submit"
            data-enabled={step === 0}
            disabled={step !== 0}
            className="flex rounded-md bg-primary data-[enabled]:hover:-translate-y-1 transition-all duration-500 text-white cursor-pointer w-14 h-10 justify-center items-center font-bold "
            onClick={() => {
              setInputOnCode(input);
              setstep(1);
            }}
          >
            {step > 0 ? (
              <div className="animate-spin rounded-full size-4 border-2 border-[#232936] border-t-transparent" />
            ) : (
              <span>Save</span>
            )}
          </button>
          <div className="flex  flex-1 min-h-32 relative ">
            <div className="flex flex-1   overflow-x-scroll ">
              <Example />
            </div>
            <input
              className="border-2 transition-colors bg-[#232936] absolute w-32 translate-x-28 translate-y-[120px] text-[#d19a66]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>

        <div className=" flex flex-1 rounded-md">
          <div
            style={{
              backgroundColor: color,
            }}
            className="flex-1 rounded-md p-4  "
          >
            <span className="bg-[#232936] p-2 rounded-md">Device</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <div className="flex flex-4 flex-col bg-[#232936] rounded-md  relative p-4">
          <span className="font-bold">Metro</span>
          <div className="flex-1 flex relative justify-center items-center   w-full">
            <span
              data-shouldanimate={step >= 1 || undefined}
              className=" flex-1 opacity-0 data-[shouldanimate]:opacity-100 transition-opacity duration-1000"
            >
              Changes ESM to CommonJS
            </span>

            <div className=" w-1/2 h-36  justify-center flex">
              <div
                data-shouldanimate={step >= 1 || undefined}
                onTransitionEnd={() => {
                  if (step === 1) {
                    if (inputOnCode !== color) {
                      setstep(2);
                    } else {
                      setstep(0);
                    }
                  }
                }}
                style={{ backgroundColor: step >= 1 ? inputOnCode : color }}
                className=" absolute  data-[shouldanimate]:translate-y-20 transition-all w-7 h-7 duration-700 data-[shouldanimate]:rotate-45 "
              />
            </div>
          </div>
          <div className="flex">
            <span
              data-shouldanimate={step >= 2 || undefined}
              className="flex flex-1 opacity-0 data-[shouldanimate]:opacity-100 transition-opacity"
            >
              Updates Dependency Graph
            </span>
            <div className="flex w-1/2 p-5 ">
              <div className="flex flex-col w-full">
                <div className="flex justify-center w-full ">
                  <div className="h-7 w-7 bg-cyan-300 rotate-45" />
                </div>
                <div className="flex w-full justify-between ">
                  <div className="h-7 w-7 bg-purple-300 rotate-45" />
                  <div
                    data-shouldanimate={step >= 2 || undefined}
                    onTransitionEnd={() => {
                      if (step === 2) {
                        setstep(3);
                      }
                    }}
                    style={{ backgroundColor: step >= 2 ? inputOnCode : color }}
                    className="h-7 w-7  rotate-45 transition-all duration-1000"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-3 flex-col gap-2">
          <div className="flex-1 flex relative  flex-col p-4  bg-[#232936] rounded-md">
            <span className="font-bold">React Refresh</span>
            <span
              data-shouldanimate={step >= 4 || undefined}
              onTransitionEnd={() => {
                if (step === 4) {
                }
                setstep(5);
              }}
              className="opacity-0 data-[shouldanimate]:opacity-100 transition-all duration-1000 "
            >
              If React component, control function signature
            </span>
          </div>
          <div className="flex-1 flex relative  flex-col p-4 bg-[#232936] rounded-md">
            <span className="font-bold">HMR In Client</span>
            <div
              data-shouldanimate={step >= 3 || undefined}
              className="opacity-0 data-[shouldanimate]:opacity-100 transition-all duration-1000"
            >
              updates module registry
            </div>
            <div className="flex flex-1   justify-center gap-10 items-center">
              <div className="h-7 w-7 bg-purple-300 rotate-45" />
              <div className="h-7 w-7 bg-cyan-300 rotate-45" />
              <div
                data-shouldanimate={step >= 3 || undefined}
                onTransitionEnd={() => {
                  if (step === 3) {
                    setstep(4);
                  }
                }}
                style={{ backgroundColor: step >= 3 ? inputOnCode : color }}
                className="h-7 w-7  rotate-45 data-[shouldanimate]:rotate-y-180 duration-1000"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
