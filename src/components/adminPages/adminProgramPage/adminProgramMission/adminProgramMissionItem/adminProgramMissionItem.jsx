import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./adminProgramMissionItem.module.css";

const AdminProgramMissionItem = ({
  item,
  setMissionLoaderHandler,
  openAddItemPopupHandler,
}) => {
  const [data, setData] = useState(null);
  const [typeName, setTypeName] = useState(null);

  const onDeleteHandler = (e) => {
    if (!data) {
      window.alert("잠시 후에 다시 시도해주세요");
      return;
    }
    e.stopPropagation();
    const confirm = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirm) {
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/mission/deletemission`, {
        missionIdx: data.missionIdx,
      })
      .then((response) => {
        if (response.data === "success") {
          setMissionLoaderHandler();
          window.alert("삭제되었습니다.");
        } else {
          window.alert("에러가 발생했습니다. 새로고침 후에 다시 시도해주세요");
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const getMissionData = () => {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/mission/getmission`, {
          idx: item.idx,
          typeIdx: item.typeIdx,
        })
        .then((response) => setData(response.data))
        .catch((err) => console.error(err));
    };

    const getTypeName = () => {
      switch (item.typeIdx) {
        case 1:
          setTypeName("단답형");
          break;
        case 2:
          setTypeName("OX퀴즈");
          break;
        case 3:
          setTypeName("4지선다");
          break;
        case 4:
          setTypeName("지시미션");
          break;
        case 5:
          setTypeName("설문미션");
          break;
        case 6:
          setTypeName("사진미션");
          break;
        case 7:
          setTypeName("동영상");
          break;
        case 8:
          setTypeName("토퍼");
          break;
        case 9:
          setTypeName("아이템");
          break;
        default:
      }
    };
    getMissionData();
    getTypeName();
  }, []);

  return (
    <div className={styles.mission_item}>
      <div className={styles.mission_top}>
        <div className={styles.division}>미션</div>
        <p className={styles.mission_type_and_name}>
          {typeName && data && `${typeName} - ${data.title}`}
        </p>
        {item.typeIdx === 9 ? (
          <button
            className={styles.add_mission_button}
            data-missionidx={item.idx}
            onClick={openAddItemPopupHandler}
          >
            <i className={`${styles.add_button_icon} fas fa-edit`}></i>
          </button>
        ) : (
          <button className={styles.add_mission_button_none}></button>
        )}
        <button
          className={styles.delete_mission_button}
          onClick={onDeleteHandler}
        >
          <i className={`${styles.delete_button_icon} fas fa-times`}></i>
        </button>
      </div>
    </div>
  );
};

export default AdminProgramMissionItem;
