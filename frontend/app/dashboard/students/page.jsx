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

  const handleDeleteUser = (userId) => {
    setLoading(true);
    axios
      .delete(`http://localhost:4000/dashboard/students/${userId}`)
      .then((response) => {
        // console.log(response.data);
        setStudents((prevStudents) =>
          prevStudents.filter((user) => user._id !== userId)
        );
        setLoading(false);
        Swal.fire({
          title: "Done",
          text: "Student has been successfully deleted",
          icon: "success",
          confirmButtonColor: "#D6465B",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

  if (loading)
    return <p className="grid h-screen place-items-center">Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/students/add">
          <button className={styles.addButton}>Add New Student</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Reg no./Roll no.</td>
            <td>Book issued</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {students.map((user) => (
            <tr key={user._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={"/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.name}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.reg_roll}</td>
              <td>{user.total_books}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/students/${user._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <div>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
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
