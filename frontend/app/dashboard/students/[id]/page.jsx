"use client";

import styles from "../../../components/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const SingleUserPage = ({ params }) => {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reg_roll, setReg_roll] = useState("");
  const [loading, setLoading] = useState(false);

  const updatedData = {
    name,
    email,
    phone,
    reg_roll,
  };

  const handleUpdateUser = (userId, updatedData) => {
    setLoading(true);
    axios
      .put(`http://localhost:4000/dashboard/students/${userId}`, updatedData)
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
                <button
                  onClick={() => handleUpdateUser(params.id, updatedData)}
                >
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
