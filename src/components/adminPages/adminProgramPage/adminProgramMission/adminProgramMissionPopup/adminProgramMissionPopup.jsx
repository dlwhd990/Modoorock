import React from "react";
import styles from "./adminProgramMissionPopup.module.css";

const AdminProgramMissionPopup = ({ closeMissionPopupHandler }) => {
  return (
    <section className={styles.popup}>
      <div className={styles.popup_top}>
        <div onClick={closeMissionPopupHandler}>
          <i className={`${styles.close_popup_button} fas fa-times`}></i>
        </div>
        <p className={styles.popup_title}>미션 추가</p>
      </div>
      <div className={styles.type_select_container}>
        <div className={styles.type_item}>단답형 미션</div>
        <div className={styles.type_item}>OX 퀴즈 미션</div>
        <div className={styles.type_item}>4지선다</div>
        <div className={styles.type_item}>지시 미션</div>
        <div className={styles.type_item}>설문 미션</div>
        <div className={styles.type_item}>사진 미션</div>
        <div className={styles.type_item}>동영상 미션</div>
        <div className={styles.type_item}>아이템 미션</div>
        <div className={styles.type_item}>토퍼 미션</div>
      </div>
    </section>
  );
};

export default AdminProgramMissionPopup;
