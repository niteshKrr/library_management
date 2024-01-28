import React from "react";
import MenuLink from "./menuLink/MenuLink";
import Image from "next/image";
import styles from "./sidebar.module.css";
import { IoBookSharp } from "react-icons/io5";
import { SiBookstack } from "react-icons/si";
import { BsChatRight } from "react-icons/bs";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Students",
        path: "/dashboard/students",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Issue Books",
        path: "/dashboard/issue_books",
        icon: <IoBookSharp />,
      },
      {
        title: "Return Books",
        path: "/dashboard/return_books",
        icon: <SiBookstack />,
      },
    ],
  },
  {
    title: "Analytics",
    list: [
      {
        title: "Status",
        path: "/dashboard/status",
        icon: <BsChatRight />,
      },
      {
        title: "Add Books",
        path: "/dashboard/books",
        icon: <MdAnalytics />,
      },
      {
        title: "Search Book",
        path: "/dashboard/search_book",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = async () => {

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={"/cat.png"}
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>Niteh kumar</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <div>
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
