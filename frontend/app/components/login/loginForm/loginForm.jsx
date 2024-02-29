import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./loginForm.module.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (username === "demo" && password === "demo") {
      // console.log("hello word");
      router.push("/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <>
      <div className={styles.form}>
        <h1 className="text-xl">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
};

export default LoginForm;
