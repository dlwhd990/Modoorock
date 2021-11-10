import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./adminProgramItem.module.css";

const AdminProgramItem = ({ item, attractionIdx, loadProgramList }) => {
  const history = useHistory();
  const [mainImage, setMainImage] = useState(null);
  useEffect(() => {
    const imageList = item.photo.split("#");
    const main = imageList.filter((item) => item.includes("_main"));
    setMainImage(main);
  }, []);

  const onDeleteHandler = (e) => {
    e.stopPropagation();
    const confirm = window.confirm(
      "정말로 삭제하시겠습니까? 체험상품을 삭제하면 해당 체험상품에 포함 된 게임들은 모두 삭제됩니다."
    );
    if (!confirm) {
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/exp/deleteexp`, {
        idx: item.idx,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("삭제되었습니다.");
          loadProgramList(attractionIdx);
        } else {
          window.alert("에러가 발생했습니다. 새로고침 후에 다시 시도해주세요");
        }
      })
      .catch((err) => console.error(err));
  };

  const onEditHandler = (e) => {
    e.stopPropagation();
    history.push(`/admin/attraction/view/${attractionIdx}/edit/${item.idx}`);
  };

  const onGameHandler = (e) => {
    e.stopPropagation();
    history.push(`/admin/attraction/view/${attractionIdx}/mission/${item.idx}`);
  };

  return (
    <div className={styles.item}>
      <div onClick={onDeleteHandler}>
        <i className={`${styles.delete_icon} fas fa-times`}></i>
      </div>
      <div className={styles.main}>
        <div className={styles.photo_container}>
          {mainImage && (
            <img
              src={`${process.env.REACT_APP_BASEURL}-images/Exp/${mainImage}`}
              alt="attraction_photo"
              className={styles.photo}
            />
          )}
        </div>
        <div className={styles.data_container}>
          <p className={styles.name}>{item.title}</p>
          <p className={styles.area}>{item.theme}</p>
        </div>
      </div>

      <div className={styles.button_container}>
        <div className={styles.button_mission} onClick={onGameHandler}>
          <div className={styles.button_head}>
            <i className={`${styles.mission_icon} fas fa-gamepad`}></i>
          </div>
          <div className={styles.button_text}>미션관리</div>
        </div>
        <div className={styles.button_edit} onClick={onEditHandler}>
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
