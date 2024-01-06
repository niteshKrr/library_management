import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/dashboard">
      <div className="h-screen flex items-center justify-center text-2xl">Go To Dashboard...</div>
      </Link>
    </>
  );
}
