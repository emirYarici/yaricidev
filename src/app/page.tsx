import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 gap-12">
      <div className="flex flex-col flex-1 gap-5">
        <Link
          href={"/react-native-fast-refresh"}
          className=" flex-col w-full items-start duration-700 p-1 hover:scale-105  hover:translate-x-3 transition-all cursor-pointer flex gap-2"
        >
          <span className="font-bold text-2xl text-primary  ">
            How React Native Fast Refresh Works
          </span>
          <span className="italic text-sm text-gray-300 ">09 Jul 2025</span>
          <span className=" text-gray-300 ">
            Module System, Hot Module Reload and more!
          </span>
        </Link>

        <Link
          href={"/start-transition"}
          className=" flex-col w-full items-start duration-700 p-1 hover:scale-105  hover:translate-x-3 transition-all cursor-pointer flex gap-2"
        >
          <span className="font-bold text-2xl text-primary  ">
            Should We Use StartTransition Api?
          </span>
          <span className="italic text-sm text-gray-300 ">20 Jul 2025</span>
          <span className=" text-gray-300 ">Concurrency is good!</span>
        </Link>
      </div>
    </main>
  );
}
