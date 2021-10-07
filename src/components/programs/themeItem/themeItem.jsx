import React from "react";
import styles from "./themeItem.module.css";

const ThemeItem = ({ item, areaData }) => {
  return (
    <section className={styles.theme_item}>
      <div className={styles.image_container}>
        <img src={item.photo} alt="area_image" className={styles.image} />
        <div
          className={styles.area}
        >{`[${areaData.area}] ${areaData.name}`}</div>
      </div>
      <div className={styles.text_container}>
        <div className={styles.area_data_container}>
          <p className={styles.name}>{item.title}</p>
          <p className={styles.desc}>{item.content}</p>
          <p className={styles.rate}>여기에별점</p>
        </div>

        <p className={styles.price}>{`${item.price}원`}</p>
      </div>
    </section>
  );
};

export default ThemeItem;
