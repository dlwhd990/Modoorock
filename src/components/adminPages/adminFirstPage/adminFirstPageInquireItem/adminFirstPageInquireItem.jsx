import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./adminFirstPageInquireItem.module.css";

const AdminFirstPageInquireItem = ({ item }) => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const goInquirePage = () => {
    history.push("/admin/inquire");
  };
  const getUserInfo = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/getuserinfo`, {
        idx: item.userIdx,
      })
      .then((response) => setUser(response.data))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className={styles.item} onClick={goInquirePage}>
      <div className={styles.division}>
        <div
          className={`${
            item.answer
              ? `${styles.division_box} ${styles.complete}`
              : `${styles.division_box} ${styles.incomplete}`
          }`}
        >
          {item.answer ? "답변완료" : "미답변"}
        </div>
      </div>
      <p className={styles.title}>{item.title}</p>
      <p className={styles.user_and_date}>{`${
        user && user.id
      } | ${item.date.slice(0, item.date.length - 3)}`}</p>
      <i className={`${styles.icon} fas fa-chevron-right`}></i>
    </div>
  );
};

export default AdminFirstPageInquireItem;
