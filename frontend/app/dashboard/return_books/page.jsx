"use client";

import { useState } from "react";
import styles from "../../../app/components/dashboard/users/addUser/addUser.module.css";
import Swal from "sweetalert2";
import axios from "axios";

const IssueBooks = () => {
  const [total_books, setTotal_books] = useState(0);
  const [bookCode, setBookCode] = useState("");
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([]);
  const [email, setEmail] = useState("");
  const [reg_roll, setReg_roll] = useState("");
  const [loading, setLoading] = useState(false);

  const handleIssueBooks = (e) => {
    e.preventDefault();

    // console.log("books", books);

    if (!email || !reg_roll || total_books < 1 || books.length === 0) {
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
      .post(`http://localhost:4000/dashboard/students/return_books`, {
        email,
        reg_roll,
        total_books,
        books,
      })
      .then(() => {
        setLoading(false);
        Swal.fire({
          title: "Done",
          text: "Book Returned successfully",
          icon: "success",
          confirmButtonColor: "#D6465B",
        });
        setEmail("");
        setReg_roll("");
        setTotal_books(0);
        setBooks([]);
      })
      .catch((error) => {
        setLoading(false);
        // console.log("Error returning books:", error.response);
        if (error.response && error.response.status === 404) {
          // Handle the case where the user is not found
          Swal.fire({
            icon: "error",
            title: "User Not Found",
            text: "The user was not found. Please check the email and registration/roll number.",
            confirmButtonColor: "#D6465B",
          });
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.error,
            confirmButtonColor: "#D6465B",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong. Please try again later.",
            confirmButtonColor: "#D6465B",
          });
        }
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
    setBookCode(e.target.value);
  };

  const catchBookName = (e) => {
    setBookName(e.target.value);
  };

  const addBook = (e) => {
    e.preventDefault();

    if (bookCode.trim() !== "" && bookName.trim() !== "") {
      setBooks([...books, { code: bookCode, name: bookName }]);
      setBookCode("");
      setBookName("");
    }
  };

  const removeBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
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
              value={bookCode}
              onChange={catchBookCode}
              required
            />
            <input
              className={styles.issued_book_input}
              placeholder="Enter book name"
              value={bookName}
              onChange={catchBookName}
              required
            />
            <button onClick={addBook} className={styles.issued_book_button}>
              Add
            </button>
          </div>
          <div className={styles.parent_modal_Class}>
            <div className={styles.modal_Class}>
              {books.map((item, index) => (
                <div key={index}>
                  {`Code: ${item.code}, Name: ${item.name}`}
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
            Return Books
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
