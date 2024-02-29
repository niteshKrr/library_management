"use client";

import Card from "../components/dashboard/card/Card";
import Chart from "../components/dashboard/chart/Chart";
import styles from "../components/dashboard/dashboard.module.css";
import Rightbar from "../components/dashboard/rightbar/Rightbar";
import { useState, useEffect, Suspense } from "react";
import axios from "axios";

const Page = ({ searchParams }) => {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  let total_issued_books = 0;
  for (let i = 0; i < students.length; i++) {
    total_issued_books += students[i].total_books;
  }

  let total_books = 0;
  for (let i = 0; i < books.length; i++) {
    total_books += parseInt(books[i].quantity);
  }

  const cards = [
    {
      id: 1,
      title: "Registered Students",
      number: count,
    },
    {
      id: 2,
      title: "Issued Books",
      number: total_issued_books,
    },
    {
      id: 3,
      title: "Total Books",
      number: total_books,
    },
  ];

  useEffect(() => {
    fetchStudents();
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/dashboard/books/?q=${q}&page=${page}`, {})
      .then((response) => {
        setLoading(false);
        setBooks(response.data.all_books);
        // console.log(response.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const fetchStudents = () => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/dashboard/students`)
      .then((response) => {
        setLoading(false);
        setStudents(response.data.all_students);
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
  else
    return (
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.cards}>
            {cards.map((item) => (
              <Card item={item} key={item.id} />
            ))}
          </div>
          {/* <Suspense fallback={<Loading />}> */}
            <Chart />
          {/* </Suspense> */}
        </div>
        <div className={styles.side}>
          <Rightbar />
        </div>
      </div>
    );
};

export default Page;
