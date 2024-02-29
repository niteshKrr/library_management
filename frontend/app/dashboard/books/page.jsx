"use client";

import Search from "@/app/components/dashboard/search/Search";
import styles from "../../components/dashboard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/app/components/dashboard/pagination/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Page = ({ searchParams }) => {
  const [books, setBooks] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // console.log("books :", books);

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  const handleDeleteUser = (bookId) => {
    setLoading(true);
    axios
      .delete(`http://localhost:4000/dashboard/books/${bookId}`)
      .then((response) => {
        // console.log(response.data);
        setBooks((prevBooks) =>
          prevBooks.filter((book) => book._id !== bookId)
        );
        setLoading(false);
        Swal.fire({
          title: "Done",
          text: "Book has been deleted successfully.",
          icon: "success",
          confirmButtonColor: "#D6465B",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, [page, q]);

  const fetchBooks = () => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/dashboard/books/?q=${q}&page=${page}`, {})
      .then((response) => {
        setLoading(false);
        setBooks(response.data.books);
        setCount(response.data.count);
        // console.log(response.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  if (loading)
    return <p className="grid h-screen place-items-center">Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search through book name..." />
        <Link href="/dashboard/books/add">
          <button className={styles.addButton}>Add New Books</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Book Name</td>
            <td>Author</td>
            <td>Publication</td>
            <td>Quantity</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={"/book.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {book.name}
                </div>
              </td>
              <td>{book.author}</td>
              <td>{book.publication}</td>
              <td>{book.quantity}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/books/${book._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Update
                    </button>
                  </Link>
                  <div>
                    <button
                      onClick={() => handleDeleteUser(book._id)}
                      className={`${styles.button} ${styles.delete}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default Page;
