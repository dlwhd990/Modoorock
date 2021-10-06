import React from "react";
import styles from "./themeItem.module.css";

const ThemeItem = (props) => {
  return (
    <section className={styles.theme_item}>
      <div className={styles.image_container}>
        <img
          src="/Modoorock/images/service_right.png"
          alt="area_image"
          className={styles.image}
        />
        <div className={styles.area}>[서울] 경복궁</div>
      </div>
      <div className={styles.text_container}>
        <div className={styles.area_data_container}>
          <p className={styles.name}>2021 월림픽에 도전하라!</p>
          <p className={styles.desc}>
            인천 월미도에서 2021 월림픽에 도전해보세요!
          </p>
          <p className={styles.rate}>여기에별점</p>
        </div>

        <p className={styles.price}>15,000원</p>
      </div>
    </section>
  );
};

export default ThemeItem;
