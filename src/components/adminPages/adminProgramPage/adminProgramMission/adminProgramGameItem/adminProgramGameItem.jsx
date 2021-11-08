import React, { useState } from "react";
import AdminProgramMissionItem from "../adminProgramMissionItem/adminProgramMissionItem";
import styles from "./adminProgramGameItem.module.css";

const AdminProgramGameItem = ({ item, openMissionPopupHandler }) => {
  const [viewDetail, setViewDetail] = useState(false);
  const viewDetailHandler = () => {
    setViewDetail(!viewDetail);
  };

  return (
    <div className={styles.game_item}>
      <div className={styles.game_top} onClick={viewDetailHandler}>
        <div className={styles.division}>게임</div>
        <p className={styles.game_number}>{item.password}</p>
        <button
          className={styles.add_mission_button}
          data-where={item.idx}
          onClick={openMissionPopupHandler}
        >
          <i className={`${styles.add_button_icon} fas fa-plus`}></i>
        </button>
        <button className={styles.delete_mission_button}>
          <i className={`${styles.delete_button_icon} fas fa-times`}></i>
        </button>
      </div>
      {viewDetail && (
        <div className={styles.detail}>
          <AdminProgramMissionItem />
          <AdminProgramMissionItem />
        </div>
      )}
    </div>
  );
};

export default AdminProgramGameItem;
