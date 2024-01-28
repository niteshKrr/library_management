"use client";

import styles from "../../../components/dashboard/users/addUser/addUser.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AddBookPage = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [publication, setPublication] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !author || !publication || !quantity) {
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
      .post(`http://localhost:4000/dashboard/books/add`, {
        name,
        author,
        publication,
        quantity,
      })
      .then(() => {
        setLoading(false);
        Swal.fire({
          title: "Done",
          text: "Books added successfully",
          icon: "success",
          confirmButtonColor: "#D6465B",
        });
        setName("");
        setAuthor("");
        setPublication("");
        setQuantity("");
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
          placeholder="Book Name"
          value={name}
          required
        />
        <input
          onChange={(e) => setAuthor(e.target.value)}
          className={styles.other_input}
          type="text"
          placeholder="Author"
          value={author}
          required
        />
        <input
          onChange={(e) => setPublication(e.target.value)}
          value={publication}
          className={styles.other_input}
          type="text"
          placeholder="Publication"
          required
        />
        <input
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
          className={styles.other_input}
          type="text"
          placeholder="Quantity"
          required
        />

        {loading === false ? (
          <button onClick={handleSubmit} className={styles.submit_button}>
            Add Books
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

export default AddBookPage;
