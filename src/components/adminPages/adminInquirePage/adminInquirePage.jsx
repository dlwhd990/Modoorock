import React from "react";
import styles from "./adminInquirePage.module.css";

const AdminInquirePage = ({ myInquireList }) => {
  return (
    <section className={styles.inquire_page}>
      <section className={styles.inquire_top}>
        <div className={styles.title_container}>
          <div className={styles.icon_container_one}>
            <i className={`${styles.head_icon} fas fa-comments`}></i>
          </div>
          <p className={styles.title}>문의 관리</p>
          <p
            className={styles.subtitle}
          >{`${myInquireList.length} 개의 문의`}</p>
        </div>
      </section>
      <section className={styles.main_list}></section>
    </section>
  );
};

export default AdminInquirePage;
