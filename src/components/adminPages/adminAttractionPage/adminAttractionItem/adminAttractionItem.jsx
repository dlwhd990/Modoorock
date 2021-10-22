import axios from "axios";
import React from "react";
import { useHistory } from "react-router";
import styles from "./adminAttractionItem.module.css";

const AdminAttractionItem = ({ item, loadMyAttractionList }) => {
  const history = useHistory();

  const itemClickHandler = () => {
    history.push(`/admin/attraction/view/${item.idx}`);
  };

  const onDeleteHandler = (e) => {
    e.stopPropagation();
    const deleteConfirm = window.confirm(
      "관광지가 삭제되면 관광지에 포함되어 있는 체험 상품들까지 전부 삭제되며 되돌릴 수 없습니다. 정말로 관광지를 삭제하시겠습니까? "
    );
    if (!deleteConfirm) {
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/attraction/deleteattraction`, {
        idx: item.idx,
      })
      .then(() => {
        window.alert("관광지가 삭제되었습니다.");
        loadMyAttractionList();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.item} onClick={itemClickHandler}>
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
          <div className={styles.button_text} onClick={onDeleteHandler}>
            삭제
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAttractionItem;
