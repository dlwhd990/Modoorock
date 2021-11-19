import React, { useState } from "react";
import styles from "./adminFirstPage.module.css";
import AdminFirstPageAttractionItem from "./adminFirstPageAttractionItem/adminFirstPageAttractionItem";
import AdminFirstPageInquireItem from "./adminFirstPageInquireItem/adminFirstPageInquireItem";
import AdminFirstPagePointItem from "./adminFirstPagePointItem/adminFirstPagePointItem";

const AdminFirstPage = ({ myAttractionList, myInquireList, myPointList }) => {
  return (
    <section className={styles.first_page}>
      <section className={styles.top}>
        <div className={styles.top_item}>
          <div className={styles.top_item_head}>
            <div className={styles.icon_container_one}>
              <i className={`${styles.head_icon} fas fa-map-marker-alt`}></i>
            </div>

            <p className={styles.head_text}>
              <span className={styles.head_text_big}>
                {myAttractionList.length}
              </span>{" "}
              개의 관광지
            </p>
          </div>
          <div className={styles.top_item_main}>
            {myAttractionList.map((item) => (
              <AdminFirstPageAttractionItem key={item.idx} item={item} />
            ))}
          </div>
        </div>
        <div className={styles.top_item}>
          <div className={styles.top_item_head}>
            <div className={styles.icon_container_two}>
              <i className={`${styles.head_icon} fas fa-comments`}></i>
            </div>

            <p className={styles.head_text}>
              <span className={styles.head_text_big}>
                {myInquireList.length}
              </span>{" "}
              개의 문의
            </p>
          </div>
          <div className={styles.top_item_main}>
            {myInquireList.map((item) => (
              <AdminFirstPageInquireItem key={item.idx} item={item} />
            ))}
          </div>
        </div>
        <div className={styles.top_item}>
          <div className={styles.top_item_head}>
            <div className={styles.icon_container_three}>
              <i className={`${styles.head_icon} fas fa-coins`}></i>
            </div>

            <p className={styles.head_text}>
              <span className={styles.head_text_big}>12</span> 개의 심사 대기
              포인트
            </p>
          </div>
          <div className={styles.top_item_main}>
            {myPointList.map((item) => (
              <AdminFirstPagePointItem key={item.userMissionIdx} item={item} />
            ))}
          </div>
        </div>
      </section>
      <section className={styles.bottom}></section>
    </section>
  );
};

export default AdminFirstPage;
