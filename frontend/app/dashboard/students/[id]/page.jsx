"use client";

import styles from "../../../components/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const SingleUserPage = ({ params }) => {
  const [user, setUser] = useState({});
  const [books_id, setBooks_id] = useState([]);
  const [books_name, setBooks_name] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reg_roll, setReg_roll] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log("books_id",books_id);
  // console.log("books_name", books_name);

  const handleUpdateUser = (userId) => {
    if (!email || !reg_roll || !phone || !reg_roll) {
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
      .put(`http://localhost:4000/dashboard/students/${userId}`, {
        name,
        email,
        phone,
        reg_roll,
      })
      .then((response) => {
        setLoading(false);
        Swal.fire({
          title: "Done",
          text: "User has been updated successfully",
          icon: "success",
          confirmButtonColor: "#D6465B",
        });
        setUser(response.data.updatedUser);
        setName("");
        setEmail("");
        setPhone("");
        setReg_roll("");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "Failed to update user. Please try again.",
          icon: "error",
          confirmButtonColor: "#D6465B",
        });
      });
  };

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      setLoading(true);

      axios
        .get(`http://localhost:4000/dashboard/students/${params.id}`)
        .then((response) => {
          setUser(response.data.user);
          setBooks_id(response.data.user.books_id);
          setBooks_name(response.data.user.books_name);
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
  }, [params.id, user]);

  return (
    <div className={styles.container}>
      {loading && (
        <div className=" justify-center grid h-screen place-items-center">
          <div className="loader w-10"></div>
        </div>
      )}
      {!loading && user && (
        <>
          <div className={styles.infoContainer}>
            <div className={styles.imgContainer}>
              <Image src={"/noavatar.png"} alt="loading..." fill />
            </div>
            {user.name}
          </div>
          <div className={styles.formContainer}>
            <hr></hr>
            <div className="flex justify-around my-4">
              <div className="text-center">
                <div className="font-bold mb-2">Total Issued Books</div>
                {user.total_books}
              </div>

              <div className="text-center">
                <div className="font-bold mb-2">Issued Books Id</div>
                <ul>
                  {books_id.map((book) => (
                    <li key={book} className="mb-1">
                      {book}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ml-5 text-center">
                <div className="font-bold mb-2">Issued Books</div>
                <ul>
                  {books_name.map((book) => (
                    <li key={book} className="mb-1">
                      {book}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <hr></hr>
            <div className={styles.formContainer}>
              <div className={styles.form}>
                <label>Name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  value={name}
                  placeholder={name || (user ? user.name : "Enter Name")}
                />
                <label>Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  value={email}
                  placeholder={user ? user.email : "Enter Email"}
                />
                <label>Reg no./Roll no.</label>
                <input
                  onChange={(e) => setReg_roll(e.target.value)}
                  value={reg_roll}
                  type="text"
                  name="password"
                  placeholder={user ? user.reg_roll : "Enter Reg/Roll No."}
                />
                <label>Phone</label>
                <input
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  type="text"
                  name="phone"
                  placeholder={user ? user.phone : "Enter Phone"}
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
