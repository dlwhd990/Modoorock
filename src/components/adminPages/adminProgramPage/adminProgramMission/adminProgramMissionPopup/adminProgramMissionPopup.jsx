import React, { useState } from "react";
import AdminProgramMissionUploadShort from "../adminProgramMissionUploadForm/adminProgramMissionUploadShort/adminProgramMissionUploadShort";
import styles from "./adminProgramMissionPopup.module.css";

const AdminProgramMissionPopup = ({ closeMissionPopupHandler }) => {
  const [type, setType] = useState(null);
  const onTypeSelectHandler = (e) => {
    setType(e.currentTarget.innerText);
  };
  return (
    <section className={styles.popup}>
      <div className={styles.popup_top}>
        <div onClick={closeMissionPopupHandler}>
          <i className={`${styles.close_popup_button} fas fa-times`}></i>
        </div>
        <p className={styles.popup_title}>미션 추가</p>
        {type && <p className={styles.popup_subtitle}>{type}</p>}
      </div>
      {!type && (
        <div className={styles.type_select_container}>
          <div className={styles.type_item} onClick={onTypeSelectHandler}>
            단답형 미션
          </div>
          <div className={styles.type_item} onClick={onTypeSelectHandler}>
            OX 퀴즈 미션
          </div>
          <div className={styles.type_item} onClick={onTypeSelectHandler}>
            4지선다
          </div>
          <div className={styles.type_item} onClick={onTypeSelectHandler}>
            지시 미션
          </div>
          <div className={styles.type_item} onClick={onTypeSelectHandler}>
            설문 미션
          </div>
          <div className={styles.type_item} onClick={onTypeSelectHandler}>
            사진 미션
          </div>
          <div className={styles.type_item} onClick={onTypeSelectHandler}>
            동영상 미션
          </div>
          <div className={styles.type_item} onClick={onTypeSelectHandler}>
            아이템 미션
          </div>
          <div className={styles.type_item} onClick={onTypeSelectHandler}>
            토퍼 미션
          </div>
        </div>
      )}
      {type === "단답형 미션" && <AdminProgramMissionUploadShort />}
    </section>
  );
};

export default AdminProgramMissionPopup;
