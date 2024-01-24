import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/universal_page/Navbar/Navbar";
import About from "./components/universal_page/About_library/About";
import BookAnimation from "./components/universal_page/Book_animation/BookAnimation";

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
        <div className="homeContainer">
          <div className="aboutUserGuideCnt">
            <About />
          </div>
          <div className="ImageContainer">
            <BookAnimation />
          </div>
        </div>
      </div>
    </>
  );
}


{/* <div className="h-screen flex items-center justify-center">
  <Link href="/dashboard">
    <button class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-full text-2xl">
      Go To Dashboard...
    </button>
  </Link>
</div>; */}
