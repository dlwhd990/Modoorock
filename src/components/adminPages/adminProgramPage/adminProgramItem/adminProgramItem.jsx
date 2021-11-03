import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./adminProgramItem.module.css";

const AdminProgramItem = ({ item, popupHandler }) => {
  const history = useHistory();
  const [mainImage, setMainImage] = useState(null);
  useEffect(() => {
    const imageList = item.photo.split("#");
    imageList.forEach((item) => {
      item.includes("_main") && setMainImage(item);
    });
  }, []);

  const onEditHandler = (e) => {
    e.stopPropagation();
    console.log("dd");
  };

  return (
    <div className={styles.item} onClick={() => popupHandler(item)}>
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
        <div className={styles.button_edit}>
          <div className={styles.button_head}>
            <i className={`${styles.edit_icon} far fa-edit`}></i>
          </div>
          <div className={styles.button_text} onClick={onEditHandler}>
            수정
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProgramItem;
