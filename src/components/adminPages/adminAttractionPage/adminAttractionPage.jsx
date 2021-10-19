import React from "react";
import AdminAttractionItem from "./adminAttractionItem/adminAttractionItem";
import styles from "./adminAttractionPage.module.css";

const AdminAttractionPage = ({ myAttractionList }) => {
  return (
    <section className={styles.attraction_page}>
      <section className={styles.attraction_top}>
        <p className={styles.title}>관광지 관리</p>
        <button className={styles.add_button}>관광지 추가</button>
      </section>
      <section className={styles.main_list}>
        {myAttractionList.map((item) => (
          <AdminAttractionItem key={item.idx} item={item} />
        ))}
      </section>
    </section>
  );
};
export default AdminAttractionPage;
