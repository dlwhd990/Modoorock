import React from "react";
import styles from "./adminFirstPageInquireItem.module.css";

const AdminFirstPageInquireItem = ({ item }) => {
  return (
    <div className={styles.item}>
      <p className={styles.type}>{`[${item.type}]`}</p>
      <p className={styles.title}>{item.title}</p>
      <p className={styles.user_and_date}>{`보류 | ${item.date.slice(
        0,
        item.date.length - 3
      )}`}</p>
      <i className={`${styles.icon} fas fa-chevron-right`}></i>
    </div>
  );
};

export default AdminFirstPageInquireItem;
