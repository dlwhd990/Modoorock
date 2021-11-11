import React from "react";
import styles from "./adminProgramUploadTimeItem.module.css";

const AdminProgramUploadTimeItem = ({ item, deleteDateDataHandler }) => {
  const time = item.time;

  return (
    <div className={styles.item}>
      <p className={styles.time_data}>
        {`${time.slice(0, 4)}년 ${time.slice(5, 7)}월 ${time.slice(
          8,
          10
        )}일 ${time.slice(11, 13)}시 ${time.slice(14, 16)}분`}
      </p>
      <div className={styles.delete_button_and_amount_data}>
        <p
          className={styles.delete_button}
          data-idx={item.idx}
          onClick={() => deleteDateDataHandler(item.idx)}
        >
          삭제
        </p>
        <p className={styles.amount_data}>{`${item.amount} 개`}</p>
      </div>
    </div>
  );
};

export default AdminProgramUploadTimeItem;
