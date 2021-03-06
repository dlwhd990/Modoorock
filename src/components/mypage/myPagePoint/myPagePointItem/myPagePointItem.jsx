import React from "react";
import styles from "./myPagePointItem.module.css";

const MyPagePointItem = ({ item, index }) => {
  return (
    <div className={styles.item}>
      <div className={styles.num}>{parseInt(index) + 1}</div>
      <div className={styles.date}>{`${item.date.slice(0, 4)}/${item.date.slice(
        5,
        7
      )}/${item.date.slice(8, 10)}`}</div>
      <div className={styles.title}>{item.content}</div>
      <div className={styles.nothing}></div>
      <div
        className={`${
          item.type === "use"
            ? `${styles.amount} ${styles.use}`
            : `${styles.amount} ${styles.add}`
        }`}
      >{`${item.type === "use" ? `- ${item.point}` : `+ ${item.point}`}`}</div>
    </div>
  );
};

export default MyPagePointItem;
