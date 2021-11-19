import React, { useState } from "react";
import AdminReservationItem from "./adminReservationItem/adminReservationItem";
import styles from "./adminReservationPage.module.css";

const AdminReservationPage = ({ myReservationList }) => {
  const [expIdxList, setExpIdxList] = useState(() => {
    const tmpList = myReservationList.map((item) => item.expIdx);
    const tmpSet = new Set(tmpList);
    const result = [...tmpSet];
    return result;
  });
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
      <section className={styles.main_list}>
        {expIdxList.map((item) => (
          <AdminReservationItem
            key={item}
            item={item}
            myReservationList={myReservationList}
          />
        ))}
      </section>
    </section>
  );
};

export default AdminReservationPage;
