import axios from "axios";
import React from "react";
import styles from "./modoorockAdminUserItem.module.css";

const ModoorockAdminUserItem = ({ item, loadUserList }) => {
  const changeToUser = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/updateauth`, {
        idx: item.idx,
        idType: 0,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("회원 권한이 변경되었습니다.");
          loadUserList();
        }
      })
      .catch((err) => console.error(err));
  };

  const changeToAdmin = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/updateauth`, {
        idx: item.idx,
        idType: 1,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("회원 권한이 변경되었습니다.");
          loadUserList();
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <section className={styles.item}>
      <p className={styles.idx}>{item.idx}</p>
      <p className={styles.id}>{item.id}</p>
      <p className={styles.name}>{item.name}</p>
      <p className={styles.phone}>{item.phone}</p>
      <p className={styles.grade}>
        {item.idType === 0
          ? "일반회원"
          : item.idType === 1
          ? "관광지관리자"
          : "모두락관리자"}
      </p>
      <p className={styles.date}>{item.registryDate.slice(0, 10)}</p>
      <div className={styles.change_grade}>
        <button className={styles.change_grade_button} onClick={changeToUser}>
          일반회원
        </button>
        <button className={styles.change_grade_button} onClick={changeToAdmin}>
          관광지관리자
        </button>
      </div>
    </section>
  );
};

export default ModoorockAdminUserItem;
