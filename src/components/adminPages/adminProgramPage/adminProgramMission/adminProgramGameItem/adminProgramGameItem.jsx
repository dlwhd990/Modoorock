import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminProgramMissionItem from "../adminProgramMissionItem/adminProgramMissionItem";
import styles from "./adminProgramGameItem.module.css";

const AdminProgramGameItem = ({
  item,
  openMissionPopupHandler,
  loadGameList,
  loadMissionList,
  missionLoader,
  setMissionLoaderHandler,
  openAddItemPopupHandler,
}) => {
  const [viewDetail, setViewDetail] = useState(false);
  const [missionList, setMissionList] = useState(null);

  const viewDetailHandler = () => {
    setViewDetail(!viewDetail);
  };

  const onDeleteHandler = (e) => {
    e.stopPropagation();
    axios
      .post(`${process.env.REACT_APP_BASEURL}/game/deletegame`, {
        idx: item.idx,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("삭제가 완료되었습니다.");
          loadGameList();
        } else {
          window.alert("에러가 발생했습니다. 새로고침 후에 다시 시도해주세요");
        }
      })
      .catch((err) => console.error(err));
  };

  const setMissionListHandler = (data) => {
    setMissionList(data);
  };

  useEffect(() => {
    loadMissionList(item.idx, setMissionListHandler);
  }, [missionLoader]);

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
        <button
          className={styles.delete_mission_button}
          onClick={onDeleteHandler}
        >
          <i className={`${styles.delete_button_icon} fas fa-times`}></i>
        </button>
      </div>
      {viewDetail && (
        <div className={styles.detail}>
          {missionList &&
            missionList.map((item) => (
              <AdminProgramMissionItem
                key={item.idx}
                item={item}
                setMissionLoaderHandler={setMissionLoaderHandler}
                openAddItemPopupHandler={openAddItemPopupHandler}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default AdminProgramGameItem;
