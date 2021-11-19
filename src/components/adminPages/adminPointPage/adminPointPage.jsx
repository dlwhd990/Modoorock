import React from "react";
import AdminPointItem from "./adminPointItem/adminPointItem";
import styles from "./adminPointPage.module.css";

const AdminPointPage = ({ myPointList }) => {
  return (
    <section className={styles.point_page}>
      <section className={styles.point_top}>
        <div className={styles.title_container}>
          <div className={styles.icon_container_one}>
            <i className={`${styles.head_icon} fas fa-coins`}></i>
          </div>
          <p className={styles.title}>포인트 관리</p>
          <p
            className={styles.subtitle}
          >{`${myPointList.length} 개의 심사 대기 포인트`}</p>
        </div>
      </section>
      <section className={styles.main_list}>
        {myPointList.map((item) => (
          <AdminPointItem key={item.userMissionIdx} item={item} />
        ))}
      </section>
    </section>
  );
};
export default AdminPointPage;
