"use client";

import styles from "../../../components/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const SingleUserPage = ({ params }) => {
  const [book, setBook] = useState({});
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [publication, setPublication] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateUser = (userId) => {
    if (!name || !author || !publication || !quantity) {
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
      .put(`http://localhost:4000/dashboard/books/${userId}`, {
        name,
        author,
        publication,
        quantity,
      })
      .then((response) => {
        setLoading(false);
        Swal.fire({
          title: "Done",
          text: "Book has been updated successfully",
          icon: "success",
          confirmButtonColor: "#D6465B",
        });
        setBook(response.data.updatedBook);
        setName("");
        setAuthor("");
        setPublication("");
        setQuantity("");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "Failed to update book. Please try again.",
          icon: "error",
          confirmButtonColor: "#D6465B",
        });
      });
  };

  useEffect(() => {
    if (!book || Object.keys(book).length === 0) {
      setLoading(true);

      axios
        .get(`http://localhost:4000/dashboard/books/${params.id}`)
        .then((response) => {
          console.log(response);
          setBook(response.data.book);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
          Swal.fire({
            title: "Error",
            text: "Failed to fetch user details. Please try again.",
            icon: "error",
            confirmButtonColor: "#D6465B",
          });
        });
    }
  }, [params.id, book]);

  return (
    <div className={styles.container}>
      {loading && (
        <div className=" justify-center grid h-screen place-items-center">
          <div className="loader w-10"></div>
        </div>
      )}
      {!loading && book && (
        <>
          <div className={styles.infoContainer}>
            <div className={styles.imgContainer}>
              <Image src={"/book.png"} alt="loading..." fill />
            </div>
            {book.name}
          </div>
          <div className={styles.formContainer}>
            <div className={styles.formContainer}>
              <div className={styles.form}>
                <label>Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  value={name}
                  placeholder={name || (book ? book.name : "Name")}
                />
                <label>Author</label>
                <input
                  onChange={(e) => setAuthor(e.target.value)}
                  type="text"
                  value={author}
                  placeholder={book ? book.author : "Author"}
                />
                <label>Publication</label>
                <input
                  onChange={(e) => setPublication(e.target.value)}
                  value={publication}
                  type="text"
                  placeholder={book ? book.publication : "Publication"}
                />
                <label>Quantity</label>
                <input
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  type="text"
                  placeholder={book ? book.quantity : "Quantity"}
                />
                <button onClick={() => handleUpdateUser(params.id)}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleUserPage;
