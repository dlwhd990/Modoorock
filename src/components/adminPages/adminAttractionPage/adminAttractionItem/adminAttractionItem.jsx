import React from "react";
import styles from "./adminAttractionItem.module.css";

const AdminAttractionItem = ({ item }) => {
  return (
    <div className={styles.item}>
      <div className={styles.main}>
        <div className={styles.photo_container}>
          <img
            src={item.photo}
            alt="attraction_photo"
            className={styles.photo}
          />
        </div>
        <div className={styles.data_container}>
          <p className={styles.name}>{item.name}</p>
          <p className={styles.area}>{item.area}</p>
        </div>
      </div>

      <div className={styles.button_container}>
        <div className={styles.button_edit}>
          <div className={styles.button_head}>
            <i className={`${styles.edit_icon} far fa-edit`}></i>
          </div>
          <div className={styles.button_text}>수정</div>
        </div>
        <div className={styles.button_delete}>
          <div className={styles.button_head}>
            <i className={`${styles.delete_icon} far fa-trash-alt`}></i>
          </div>
          <div className={styles.button_text}>삭제</div>
        </div>
      </div>
    </div>
  );
};

export default AdminAttractionItem;
