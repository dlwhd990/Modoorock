import React from "react";
import { useHistory, useParams } from "react-router";
import AdminAttractionItem from "./adminAttractionItem/adminAttractionItem";
import styles from "./adminAttractionPage.module.css";

const AdminAttractionPage = ({ loadMyAttractionList, myAttractionList }) => {
  const history = useHistory();
  const addAttractionHandler = () => {
    history.push("/admin/attraction/add");
  };

  return (
    <section className={styles.attraction_page}>
      <section className={styles.attraction_top}>
        <div className={styles.title_container}>
          <div className={styles.icon_container_one}>
            <i className={`${styles.head_icon} fas fa-map-marker-alt`}></i>
          </div>
          <p className={styles.title}>관광지 관리</p>
          <p
            className={styles.subtitle}
          >{`${myAttractionList.length} 개의 관광지`}</p>
        </div>
        <button className={styles.add_button} onClick={addAttractionHandler}>
          관광지 추가
        </button>
      </section>
      <section className={styles.main_list}>
        {myAttractionList.map((item) => (
          <AdminAttractionItem
            key={item.idx}
            item={item}
            loadMyAttractionList={loadMyAttractionList}
          />
        ))}
      </section>
    </section>
  );
};
export default AdminAttractionPage;
