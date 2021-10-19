import React from "react";
import styles from "./adminAttractionItem.module.css";

const AdminAttractionItem = ({ item }) => {
  return (
    <div className={styles.item}>
      <div className={styles.photo_container}>
        <img src={item.photo} alt="attraction_photo" className={styles.photo} />
      </div>
      <div className={styles.data_and_button_container}>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.area}>{item.area}</p>
        <div className={styles.button_container}>
          <button className={styles.button_edit}>수정</button>
          <button className={styles.button_delete}>삭제</button>
        </div>
      </div>
    </div>
  );
};

export default AdminAttractionItem;
