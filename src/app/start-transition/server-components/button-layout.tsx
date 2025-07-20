export function ButtonLayout({ activeTabName }: { activeTabName: string }) {
  return (
    <div className="flex flex-row full gap-2  ">
      <button
        className="p-2 rounded-md transition-all duration-500"
        style={{
          backgroundColor: activeTabName === "light" ? "lightblue" : "gray",
          color: activeTabName === "light" ? "black" : "white",
        }}
      >
        home
      </button>
      <button
        className="p-2 rounded-md transition-all duration-500 "
        style={{
          backgroundColor: activeTabName === "medium" ? "lightgreen" : "gray",
          color: activeTabName === "medium" ? "black" : "white",
        }}
      >
        profile
      </button>
      <button
        className="p-2 rounded-md transition-all duration-500 "
        style={{
          backgroundColor: activeTabName === "heavy" ? "lightyellow" : "gray",
          color: activeTabName === "heavy" ? "black" : "white",
        }}
      >
        feed
      </button>
    </div>
  );
}
