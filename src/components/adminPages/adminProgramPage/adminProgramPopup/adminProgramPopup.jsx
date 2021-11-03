import React, { useEffect, useState } from "react";
import styles from "./adminProgramPopup.module.css";
const AdminProgramPopup = ({ item, closePopupHandler }) => {
  const [imageList, setImageList] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  useEffect(() => {
    const tmpList = item.photo.split("#");
    const result = [];
    tmpList.forEach((image) => {
      image.includes("_main") ? setMainImage(image) : result.push(image);
    });
    setImageList(result);
  }, []);
  return (
    <section className={styles.popup}>
      <div className={styles.close_icon_container} onClick={closePopupHandler}>
        <i className={`${styles.close_icon} fas fa-times`}></i>
      </div>
      <p className={styles.title}>{item.title}</p>
      <div className={styles.image_container}>
        {mainImage && (
          <img
            src={`${process.env.REACT_APP_BASEURL}-images/Exp/${mainImage}`}
            alt="program_image"
            className={styles.program_image}
          />
        )}
        {imageList &&
          imageList.map((item) => (
            <img
              key={item}
              src={`${process.env.REACT_APP_BASEURL}-images/Exp/${item}`}
              alt="program_image"
              className={styles.program_image}
            />
          ))}
      </div>
      <div className={styles.count_container}>
        여기에 일정 시간별 판매개수 리스트 넣을 생각이고 기타 더 넣어야 할
        내용들 있으면 자리내서 넣을 것
      </div>
    </section>
  );
};

export default AdminProgramPopup;
