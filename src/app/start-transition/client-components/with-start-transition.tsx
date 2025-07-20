"use client";

import { useEffect, useRef, useState } from "react";

export function WithStartTransition() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);
  // Scroll to end when new box is added
  const [boxes, setBoxes] = useState([]);
  const [boxLeftOffsets, setBoxLeftOffsets] = useState([]);
  const [boxTypes, setBoxTypes] = useState([]);
  const [boxIndex, setBoxIndex] = useState(-1);
  const [currentlyLoadingPage, setcurrentlyLoadingPage] = useState();

  const [screenWidth, setscreenWidth] = useState(0);
  const speed = 1; // pixels per frame
  const [activeTabName, setactiveTabName] = useState();

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      setOffset((prev) => {
        if (!ref.current) return prev;

        // Reset offset to 0 when full width scrolled

        if (
          prev - (boxLeftOffsets[boxLeftOffsets.length - 1] ?? screenWidth) >
          screenWidth
        ) {
          setBoxLeftOffsets([]);
          setBoxes([]);
          setBoxTypes([]);
          setcurrentlyLoadingPage(undefined);
          setBoxIndex(-1);
          return 0;
        }

        if (boxes.length > 0) {
          if (prev > boxLeftOffsets[boxIndex + 1]) {
            setcurrentlyLoadingPage(boxTypes[boxIndex + 1]);
          } else {
            setcurrentlyLoadingPage(undefined);
          }
        }

        if (
          boxes.length > 0 &&
          prev >
            boxLeftOffsets[boxIndex + 1] +
              (boxTypes[boxIndex + 1] === "light"
                ? 30
                : boxTypes[boxIndex + 1] === "medium"
                ? 60
                : 90)
        ) {
          setBoxIndex((prevBoxIndex) => {
            console.log(
              "boxleftOffsets",
              boxLeftOffsets[prevBoxIndex + 1],
              prev
            );

            if (
              !boxLeftOffsets[prevBoxIndex + 2] ||
              prev - 1 !== boxLeftOffsets[prevBoxIndex + 2]
            ) {
              setactiveTabName(boxTypes[prevBoxIndex + 1]);
            }
            console.log("prev", prev, boxLeftOffsets[prevBoxIndex + 2]);

            return prevBoxIndex + 1;
          });
        }

        return prev + speed;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [boxes.length, boxIndex]);

  const addBox = (type: "light" | "heavy" | "medium") => {
    const temp = [...boxes, boxes.length];
    const diffBarrier =
      boxTypes[boxTypes.length - 1] === "light"
        ? 30
        : boxTypes[boxTypes.length - 1] === "medium"
        ? 60
        : 90;
    setBoxes(temp);
    const diff = offset - boxLeftOffsets[boxLeftOffsets.length - 1];

    if (diff < diffBarrier) {
      setBoxLeftOffsets((prev) => [...prev, offset + diffBarrier - diff]);
      setBoxTypes((prev) => [...prev, type]);
      return;
    }
    setBoxLeftOffsets((prev) => [...prev, offset]);
    setBoxTypes((prev) => [...prev, type]);
  };
  return (
    <div
      ref={(ref) => {
        setscreenWidth(ref?.clientWidth);
      }}
      className="flex w-full relative flex-col items-center gap-2"
    >
      <div className="flex flex-row full gap-2  ">
        <button
          data-lastpressed={
            (boxTypes[boxTypes.length - 1] === "light" &&
              activeTabName !== "light") ||
            activeTabName === "light" ||
            undefined
          }
          className="p-2 rounded-md transition-all duration-500"
          onClick={() => addBox("light")}
          style={{
            backgroundColor: activeTabName === "light" ? "lightblue" : "gray",
            color: activeTabName === "light" ? "black" : "white",
          }}
        >
          light work
        </button>
        <button
          data-lastpressed={
            (boxTypes[boxTypes.length - 1] === "medium" &&
              activeTabName !== "medium") ||
            activeTabName === "medium" ||
            undefined
          }
          className="p-2 rounded-md transition-all duration-500 "
          onClick={() => addBox("medium")}
          style={{
            backgroundColor: activeTabName === "medium" ? "lightgreen" : "gray",
            color: activeTabName === "medium" ? "black" : "white",
          }}
        >
          hard work
        </button>
        <button
          data-lastpressed={
            (boxTypes[boxTypes.length - 1] === "heavy" &&
              activeTabName !== "heavy") ||
            activeTabName === "heavy" ||
            undefined
          }
          className="p-2 rounded-md transition-all duration-500 "
          onClick={() => addBox("heavy")}
          style={{
            backgroundColor: activeTabName === "heavy" ? "lightyellow" : "gray",
            color: activeTabName === "heavy" ? "black" : "white",
          }}
        >
          heavy work
        </button>
      </div>

      <div
        className="h-20 w-full flex justify-center items-center rounded-md"
        style={{
          backgroundColor: !currentlyLoadingPage
            ? activeTabName === "light"
              ? "lightblue"
              : activeTabName === "medium"
              ? "lightgreen"
              : activeTabName === "heavy"
              ? "lightyellow"
              : "transparent"
            : "transparent",
        }}
      >
        <div
          data-isloading={currentlyLoadingPage || undefined}
          className="size-10 border-4 border-t-transparent border-primary rounded-full animate-spin hidden data-[isloading]:flex"
        />

        <div
          data-isloaded={(!currentlyLoadingPage && activeTabName) || undefined}
          className="font-bold hidden data-[isloaded]:block text-primary opacity-0 data-[isloaded]:opacity-100 transition-opacity duration-1000"
        >
          Page Ready!
        </div>
      </div>
      <div
        ref={ref}
        className=" h-20 items-center  bg-[#232936]  relative overflow-hidden justify-center rounded-md "
        style={{ width: `${screenWidth}px` }}
      >
        <div
          className="absolute h-20 flex items-center z-20 "
          style={{
            width: `${1200 * (boxes.length + 1)}px`,
            transform: `translateX(-${offset}px)`,
          }}
        >
          {/* {new Array(10 * (boxes.length + 1)).map((_, index) => (
            <div key={`lines_${index}`} className="bg-white w-1 h-full mx-12" />
          ))} */}

          {boxes.map((box, index) => {
            return (
              <div
                key={index}
                className=" overflow-hidden rounded-md absolute  h-[30px] bg-primary outline-[0.5px] outline-background"
                style={{
                  transform: `translateX(${
                    boxLeftOffsets[index] + screenWidth / 2
                  }px)`,
                  width:
                    boxTypes[index] === "light"
                      ? "30px"
                      : boxTypes[index] === "medium"
                      ? "60px"
                      : "90px",
                  backgroundColor:
                    boxTypes[index] === "light"
                      ? "lightblue"
                      : boxTypes[index] === "medium"
                      ? "lightgreen"
                      : "lightyellow",
                }}
              ></div>
            );
          })}
        </div>
        <div
          className="absolute h-20  bg-gray-600 flex justify-between"
          style={{ width: `${screenWidth}px` }}
        >
          <div
            className="absolute  h-2 w-1 bg-primary"
            style={{ left: `${screenWidth / 2}px` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
