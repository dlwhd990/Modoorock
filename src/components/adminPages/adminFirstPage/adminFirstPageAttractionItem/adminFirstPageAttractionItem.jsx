import React from "react";
import { useHistory } from "react-router";
import styles from "./adminFirstPageAttractionItem.module.css";

const AdminFirstPageAttractionItem = ({ item }) => {
  const history = useHistory();
  const onClickHandler = () => {
    history.push(`/admin/attraction/view/${item.idx}`);
  };
  return (
    <div className={styles.item} onClick={onClickHandler}>
      <div className={styles.main}>
        <img
          src={`${process.env.REACT_APP_BASEURL}-images/Attraction/${item.photo}`}
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
