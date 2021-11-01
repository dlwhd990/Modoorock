import React from "react";
import styles from "./adminFirstPageInquireItem.module.css";

const AdminFirstPageInquireItem = ({ item }) => {
  return (
    <div className={styles.item}>
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
      <p className={styles.user_and_date}>{`보류 | ${item.date.slice(
        0,
        item.date.length - 3
      )}`}</p>
      <i className={`${styles.icon} fas fa-chevron-right`}></i>
    </div>
  );
};

export default AdminFirstPageInquireItem;