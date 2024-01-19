"use client";

import styles from "../../../app/components/dashboard/users/addUser/addUser.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const IssueBooks = () => {
  const [total_books, setTotal_books] = useState(0);
  const [value, setValue] = useState("");
  const [books_id, setBooks_id] = useState([]);
  const [email, setEmail] = useState("");
  const [reg_roll, setReg_roll] = useState("");
  const [loading, setLoading] = useState(false);

  const handleIssueBooks = (e) => {
    e.preventDefault();

    if (!email || !reg_roll || total_books < 1 || books_id.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are necessary. Please fill in all required fields.",
        confirmButtonColor: "#D6465B",
      });
      return;
    }

    setLoading(true);
    axios
      .post(`http://localhost:4000/dashboard/students/issue_books`, {
        email,
        reg_roll,
        total_books,
        books_id,
      })
      .then(() => {
        setLoading(false);
        Swal.fire({
          title: "Done",
          text: "Book Issued successfully",
          icon: "success",
          confirmButtonColor: "#D6465B",
        });
        setEmail("");
        setReg_roll("");
        setTotal_books(0);
        setBooks_id([]);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something Went Wrong...",
          confirmButtonColor: "#D6465B",
        });
      });
  };


  const add = () => {
    if (total_books === 4) {
      return;
    }
    setTotal_books(total_books + 1);
  };
  const remove = () => {
    if (total_books === 0) {
      return;
    }
    setTotal_books(total_books - 1);
  };

  const catchBookCode = (e) => {
    setValue(e.target.value);
  };

  const addBook = (e) => {
    e.preventDefault();

    if (value.trim() !== "") {
      setBooks_id([...books_id, value]);
      setValue("");
    }
  };

  const removeBook = (index) => {
    const updatedCode = [...books_id];
    updatedCode.splice(index, 1);
    setBooks_id(updatedCode);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
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

        <div>
          <div className={styles.issued_book_container}>
            <input
              className={styles.issued_book_input}
              placeholder="Enter book code"
              value={value}
              onChange={catchBookCode}
              required
            ></input>
            <button onClick={addBook} className={styles.issued_book_button}>
              Add
            </button>
          </div>
          <div className={styles.parent_modal_Class}>
            <div className={styles.modal_Class}>
              {books_id.map((item, index) => (
                <div key={index}>
                  {item}
                  <button onClick={() => removeBook(index)}>remove</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex">
          <button
            className={styles.minus_button}
            type="button"
            onClick={remove}
          >
            -
          </button>
          <input
            required
            className={styles.total_books_input}
            value={total_books}
          ></input>
          <button className={styles.plus_button} onClick={add}>
            +
          </button>
        </div>

        {loading === false ? (
          <button onClick={handleIssueBooks} className={styles.submit_button}>
            Issue Books
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

export default IssueBooks;
