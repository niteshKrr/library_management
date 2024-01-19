"use client";

import styles from "../../../components/dashboard/users/addUser/addUser.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AddUserPage = () => {
  const [total_books, setTotal_books] = useState(0);
  // const [value, setValue] = useState("");
  const [books_id, setBooks_id] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reg_roll, setReg_roll] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !reg_roll) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are necessary.",
        confirmButtonColor: "#D6465B",
      });
      return;
    }
    setLoading(true);
    axios
      .post(`http://localhost:4000/dashboard/students/add`, {
        name,
        email,
        total_books,
        books_id,
        reg_roll,
        phone,
      })
      .then(() => {
        setLoading(false);
        Swal.fire({
          title: "Done",
          text: "Student added successfully",
          icon: "success",
          confirmButtonColor: "#D6465B",
        });
        setName("");
        setEmail("");
        setPhone("");
        setReg_roll("");
      })
      .catch((e) => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error occured",
          confirmButtonColor: "#D6465B",
        });
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <input
          onChange={(e) => setName(e.target.value)}
          className={styles.other_input}
          type="text"
          placeholder="name"
          value={name}
          required
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          className={styles.other_input}
          type="email"
          placeholder="email"
          value={email}
          required
        />
        <input
          onChange={(e) => setReg_roll(e.target.value)}
          value={reg_roll}
          className={styles.other_input}
          type="text"
          placeholder="reg no./roll no."
          required
        />
        <input
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          className={styles.other_input}
          type="phone"
          placeholder="phone"
          required
        />

        {loading === false ? (
          <button onClick={handleSubmit} className={styles.submit_button}>
            Add Student
          </button>
        ) : (
          <button className={styles.submit_button}>
            <div className="flex justify-center">
              <div className="mx-5">Please wait... </div>
              <div className="loader w-10"></div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default AddUserPage;
