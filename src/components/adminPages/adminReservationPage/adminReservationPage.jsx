import React from "react";
import styles from "./adminReservationPage.module.css";

const AdminReservationPage = (props) => {
  return (
    <section className={styles.reservation_page}>
      <section className={styles.reservation_top}>
        <div className={styles.title_container}>
          <div className={styles.icon_container_one}>
            <i className={`${styles.head_icon} far fa-calendar-check`}></i>
          </div>
          <p className={styles.title}>예약 관리</p>
          <p className={styles.subtitle}>{`예약 내역 확인`}</p>
        </div>
      </section>
      <section className={styles.main_list}></section>
    </section>
  );
};

export default AdminReservationPage;
