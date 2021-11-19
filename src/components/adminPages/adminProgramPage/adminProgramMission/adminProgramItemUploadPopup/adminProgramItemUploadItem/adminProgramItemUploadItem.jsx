import axios from "axios";
import React from "react";
import styles from "./adminProgramItemUploadItem.module.css";

const AdminProgramItemUploadItem = ({ item, loadItemList }) => {
  const onDeleteHandler = () => {
    const confirm = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirm) {
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/item/deleteitem`, {
        idx: item.idx,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("삭제되었습니다.");
          loadItemList();
        } else {
          window.alert("에러가 발생했습니다. 새로고침 후에 다시 시도해주세요.");
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className={styles.item}>
      <div onClick={onDeleteHandler}>
        <i className={`${styles.delete_button} fas fa-times`}></i>
      </div>
      <img
        src={`${process.env.REACT_APP_BASEURL}-images/Item/${item.photo}`}
        alt="item_image"
        className={styles.image}
      />
      <div className={styles.data_container}>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.content}>{item.content}</p>
        <p
          className={styles.point}
        >{`점수: ${item.point}점 | QR코드번호: ${item.idx}`}</p>
      </div>
    </div>
  );
};

export default AdminProgramItemUploadItem;
