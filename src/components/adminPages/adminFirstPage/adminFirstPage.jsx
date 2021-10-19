import React from "react";
import styles from "./adminFirstPage.module.css";

const AdminFirstPage = (props) => {
  return (
    <section className={styles.first_page}>
      <section className={styles.top}>
        <div className={styles.top_item}>
          <div className={styles.top_item_head}>
            <div className={styles.icon_container_one}>
              <i className={`${styles.head_icon} fas fa-map-marker-alt`}></i>
            </div>

            <p className={styles.head_text}>
              <span className={styles.head_text_big}>6</span> 개의 관광지
            </p>
          </div>
          <div className={styles.top_item_main}></div>
        </div>
        <div className={styles.top_item}>
          <div className={styles.top_item_head}>
            <div className={styles.icon_container_two}>
              <i className={`${styles.head_icon} fas fa-comments`}></i>
            </div>

            <p className={styles.head_text}>
              <span className={styles.head_text_big}>2</span> 개의 문의
            </p>
          </div>
          <div className={styles.top_item_main}></div>
        </div>
        <div className={styles.top_item}>
          <div className={styles.top_item_head}>
            <div className={styles.icon_container_three}>
              <i className={`${styles.head_icon} fas fa-coins`}></i>
            </div>

            <p className={styles.head_text}>
              <span className={styles.head_text_big}>12</span> 개의 포인트 내역
            </p>
          </div>
          <div className={styles.top_item_main}></div>
        </div>
      </section>
      <section className={styles.bottom}></section>
    </section>
  );
};

export default AdminFirstPage;
