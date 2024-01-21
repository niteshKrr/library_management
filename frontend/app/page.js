import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <Link href="/dashboard">
          <button class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-full text-2xl">
            Go To Dashboard...
          </button>
        </Link>
      </div>
    </>
  );
}
