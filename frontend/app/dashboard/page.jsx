"use client";

import Card from "../components/dashboard/card/Card";
import Chart from "../components/dashboard/chart/Chart";
import styles from "../components/dashboard/dashboard.module.css";
import Rightbar from "../components/dashboard/rightbar/Rightbar";
import { useState, useEffect } from "react";
import axios from "axios";


const Page = () => {
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  let total_issued_books = 0;
  for (let i = 0; i < students.length; i++){
    total_issued_books += students[i].total_books;
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
      number: 5642,
    },
  ];

  useEffect(() => {
    fetchStudents();
  }, []);

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
          <Chart />
        </div>
        <div className={styles.side}>
          <Rightbar />
        </div>
      </div>
    );
};

export default Page;
