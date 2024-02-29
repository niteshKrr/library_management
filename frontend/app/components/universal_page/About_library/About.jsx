"use client"

import styles from './about.module.css'
import { TypeAnimation } from "react-type-animation";
import Link from 'next/link';

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <div
        className="text-xl sm:text-3xl text-center font-mono text-white pt-10 mx-6"
        style={{ height: "200px" }}
      >
        <TypeAnimation
          style={{
            whiteSpace: "pre-line",
            height: "30px",
            display: "block",
          }}
          sequence={[
            "Welcome... 🤔",
            2000,
            `Central repository for diverse resources!\n\nQuiet space for study and research!\n\nSafeguards cultural heritage and historical knowledge!`,
            2000,
          ]}
          // wrapper="span"
          // speed={50}
          // style={{ fontSize: "2em", display: "inline-block" }}
          repeat={Infinity}
        />
      </div>
      <div className="flex justify-center mt-44">
        {/* <div className={styles.updateButton}>
          <Link href="/">
            <button>Update Info</button>
          </Link>
        </div> */}
        <div className={styles.adminButton}>
          <Link href="/login">
            <button>Admin Access</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About
