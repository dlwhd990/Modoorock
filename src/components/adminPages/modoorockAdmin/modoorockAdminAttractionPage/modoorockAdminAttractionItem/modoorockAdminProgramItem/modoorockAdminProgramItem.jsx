import React from "react";
import styles from "./modoorockAdminProgramItem.module.css";
import axios from "axios";

const ModoorockAdminProgramItem = ({ item, loadProgramList }) => {
  const programDeleteButtonHandler = (e) => {
    e.stopPropagation();
    const confirm = window.confirm("정말로 체험상품을 삭제하시겠습니까?");
    if (!confirm) {
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/exp/deleteexp`, {
        idx: item.idx,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("삭제가 완료되었습니다.");
          loadProgramList();
        } else {
          window.alert("에러가 발생했습니다. 새로고침 후에 다시 시도해주세요");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className={styles.item}>
      <button
        className={styles.delete_button}
        onClick={programDeleteButtonHandler}
      >
        삭제
      </button>
      <img
        src={`${process.env.REACT_APP_BASEURL}-images/Exp/${item.photo}`}
        alt="program_image"
        className={styles.image}
      />
      <div className={styles.data_container}>
        <div className={styles.title_and_theme}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.theme}>{item.theme}</p>
        </div>
        <p className={styles.content}>{item.content}</p>
      </div>
    </section>
  );
};

export default ModoorockAdminProgramItem;
