import React from "react";
import styles from "./programItem.module.css";

const programItem = ({ item }) => {
  return (
    <div className={styles.program_item}>
      <img src={item.photo} alt="" className={styles.photo} />
      <div className={styles.data_container}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.area}>{item.area}</p>
        <p className={styles.price}>{`${item.price}원`}</p>
        <button className={styles.go_detail_button}>상품 보기</button>
      </div>
    </div>
  );
};

export default programItem;
