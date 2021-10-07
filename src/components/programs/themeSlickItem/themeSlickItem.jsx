import React, { useEffect, useState } from "react";
import styles from "./themeSlickItem.module.css";

const ThemeSlickItem = ({ item, areaList }) => {
  const [areaData, setAreaData] = useState(null);
  useEffect(() => {
    for (let i = 0; i < areaList.length; i++) {
      if (areaList[i].idx === item.attraction) {
        setAreaData(areaList[i]);
        return;
      }
    }
  }, []);
  return (
    <section className={styles.theme_item}>
      <div className={styles.image_container}>
        <img src={item.photo} alt="area_image" className={styles.image} />
        <div className={styles.area}>
          {areaData && `[${areaData.area}] ${areaData.name}`}
        </div>
      </div>
      <div className={styles.text_container}>
        <div className={styles.area_data_container}>
          <p className={styles.name}>{item.title}</p>
          <p className={styles.desc}>{item.content}</p>
          <p className={styles.rate}>여기에별점</p>
          <p className={styles.price}>{`${item.price}원`}</p>
        </div>
      </div>
    </section>
  );
};

export default ThemeSlickItem;
