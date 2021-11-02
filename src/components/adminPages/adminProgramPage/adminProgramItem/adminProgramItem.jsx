import React from "react";
import { useHistory } from "react-router";
import styles from "./adminProgramItem.module.css";

const AdminProgramItem = ({ item }) => {
  const history = useHistory();

  const itemClickHandler = () => {
    history.push(`/admin/program/view/${item.idx}`); //수정예정
  };

  return (
    <div className={styles.item} onClick={itemClickHandler}>
      <div className={styles.main}>
        <div className={styles.photo_container}>
          <img
            src={`${process.env.REACT_APP_BASEURL}-images/Exp/${item.photo}`}
            alt="attraction_photo"
            className={styles.photo}
          />
        </div>
        <div className={styles.data_container}>
          <p className={styles.name}>{item.title}</p>
          <p className={styles.area}>{item.theme}</p>
        </div>
      </div>

      <div className={styles.button_container}>
        <div className={styles.button_edit}>
          <div className={styles.button_head}>
            <i className={`${styles.edit_icon} far fa-edit`}></i>
          </div>
          <div className={styles.button_text}>수정</div>
        </div>
      </div>
    </div>
  );
};

export default AdminProgramItem;
