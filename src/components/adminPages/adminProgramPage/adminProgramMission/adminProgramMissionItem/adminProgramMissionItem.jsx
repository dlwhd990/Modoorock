import React from "react";
import styles from "./adminProgramMissionItem.module.css";

// 미션도 디테일 보는것이 필요?
// mission_type_and_name = 임시
const AdminProgramMissionItem = (props) => {
  return (
    <div className={styles.mission_item}>
      <div className={styles.mission_top}>
        <div className={styles.division}>미션</div>
        <p className={styles.mission_type_and_name}>OX퀴즈 - 문화재</p>
        <button className={styles.add_mission_button}>
          <i className={`${styles.add_button_icon} fas fa-edit`}></i>
        </button>
        <button className={styles.delete_mission_button}>
          <i className={`${styles.delete_button_icon} fas fa-times`}></i>
        </button>
      </div>
    </div>
  );
};

export default AdminProgramMissionItem;
