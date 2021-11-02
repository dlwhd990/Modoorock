import React from "react";
import styles from "./modoorockAdminAdItem.module.css";
import axios from "axios";

const ModoorockAdminAdItem = ({ item, loadAdvertiseList }) => {
  const onDeleteHandler = () => {
    const confirm = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirm) {
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/advertise/deleteadvertise`, {
        idx: item.idx,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("삭제되었습니다.");
          loadAdvertiseList();
        } else {
          window.alert("에러가 발생했습니다. 새로고침 후에 다시 시도해주세요");
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className={styles.item}>
      <img
        src={`${process.env.REACT_APP_BASEURL}-images/Advertise/${item.thumbnail}`}
        alt="thumbnail"
        className={styles.item_image}
      />
      <div className={styles.item_data_container}>
        <p className={styles.item_title}>{`제목: ${item.title}`}</p>
        <p className={styles.item_content}>
          URL:{" "}
          <a
            href={item.content}
            className={styles.item_content_a_tag}
            target="_blank"
          >
            {item.content}
          </a>
        </p>
      </div>
      <div className={styles.item_button_container}>
        <button className={styles.item_button} onClick={onDeleteHandler}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default ModoorockAdminAdItem;
