import React from "react";
import styles from "./adminFirstPageAttractionItem.module.css";

const AdminFirstPageAttractionItem = ({ item }) => {
  return (
    <div className={styles.item}>
      <div className={styles.main}>
        <img
          src={item.photo}
          alt="attraction_photo"
          className={styles.item_photo}
        />
        <div className={styles.data_container}>
          <p className={styles.data_name}>{item.name}</p>
          <p className={styles.data_area}>{item.area}</p>
        </div>
      </div>

      <i className={`${styles.icon} fas fa-chevron-right`}></i>
    </div>
  );
};

export default AdminFirstPageAttractionItem;
