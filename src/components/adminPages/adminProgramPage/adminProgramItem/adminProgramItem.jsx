import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./adminProgramItem.module.css";

const AdminProgramItem = ({ item, attractionIdx }) => {
  const history = useHistory();
  const [mainImage, setMainImage] = useState(null);
  useEffect(() => {
    const imageList = item.photo.split("#");
    const main = imageList.filter((item) => item.includes("_main"));
    setMainImage(main);
  }, []);

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
