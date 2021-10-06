import React from "react";
import styles from "./areaItem.module.css";

const AreaItem = (props) => {
  return (
    <section className={styles.area_item}>
      <div className={styles.image_container}>
        <img
          src="/Modoorock/images/service_right.png"
          alt="area_image"
          className={styles.image}
        />
        <div className={styles.region}>서울</div>
      </div>
      <div className={styles.text_container}>
        <div className={styles.area_data_container}>
          <p className={styles.name}>경복궁</p>
          <p className={styles.desc}>
            서울특별시 종로구 세종로에 있는 조선전기에 창건되어 정궁으로 이용된
            궁궐, 정궁, 사적
          </p>
        </div>

        <p className={styles.number_of_programs}>45개의 상품</p>
      </div>
    </section>
  );
};

export default AreaItem;
