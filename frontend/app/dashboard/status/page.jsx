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
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  useEffect(() => {
    fetchStudents();
  }, [page, q]);

  const fetchStudents = () => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/dashboard/students/?q=${q}&page=${page}`, {})
      .then((response) => {
        setLoading(false);
        setStudents(response.data.users);
        setCount(response.data.count);
        // console.log(response.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const calculateDueDate = (createdAt) => {
    const issueDate = new Date(createdAt);
    const dueDate = new Date(issueDate);
    dueDate.setDate(issueDate.getDate() + 14); // Add 15 days to the issue date

    const dd = String(dueDate.getDate()).padStart(2, "0");
    const mm = String(dueDate.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = dueDate.getFullYear();

    return `${dd}-${mm}-${yyyy}`;
  };

  if (loading)
    return <p className="grid h-screen place-items-center">Loading...</p>;
  else
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <Search placeholder="Search through reg no./roll no." />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Name</td>
              <td>Reg no./Roll no.</td>
              <td>Status</td>
              <td>Book issued</td>
              <td>Issue Date</td>
              <td>Due date after 15 days</td>
            </tr>
          </thead>
          <tbody>
            {students.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className={styles.user}>
                    <Image
                      src="/noavatar.png"
                      alt=""
                      width={40}
                      height={40}
                      className={styles.userImage}
                    />
                    {user.name}
                  </div>
                </td>
                <td>{user.reg_roll}</td>
                <td>
                  {user.total_books === 0 ? (
                    <span className={`${styles.status} ${styles.done}`}>
                      Done
                    </span>
                  ) : (
                    <span className={`${styles.status} ${styles.pending}`}>
                      Pending
                    </span>
                  )}
                </td>
                <td>{user.total_books}</td>
                <td>{user.createdAt?.toString().slice(0, 10).split('-').reverse().join('-')}</td>
                <td>{calculateDueDate(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination count={count} />
      </div>
    );
};

export default Page;
