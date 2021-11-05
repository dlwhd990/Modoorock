import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import AdminProgramGameItem from "./adminProgramGameItem/adminProgramGameItem";
import styles from "./adminProgramMission.module.css";
import AdminProgramGamePopup from "./adminProgramGamePopup/adminProgramGamePopup";
import AdminProgramMissionPopup from "./adminProgramMissionPopup/adminProgramMissionPopup";

const AdminProgramMission = (props) => {
  const params = useParams();
  const [item, setItem] = useState(null);
  const [attractionInfo, setAttractionInfo] = useState(null);
  const [gamePopupOn, setGamePopupOn] = useState(false);
  const [missionPopupOn, setMissionPopupOn] = useState(false);

  const loadAttractionInfo = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/attraction/getattractioninfo`, {
        idx: parseInt(params.path_three),
      })
      .then((response) => setAttractionInfo(response.data))
      .catch((err) => console.error(err));
  };

  const openGamePopupHandler = () => {
    setGamePopupOn(true);
  };

  const closeGamePopupHandler = () => {
    setGamePopupOn(false);
  };

  const openMissionPopupHandler = (e) => {
    e.stopPropagation();
    setMissionPopupOn(true);
  };

  const closeMissionPopupHandler = () => {
    setMissionPopupOn(false);
  };

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/exp/getexpinfo`, {
        idx: params.path_five,
      })
      .then((response) => {
        if (response.data.attractionIdx !== parseInt(params.path_three)) {
          window.alert("잘못된 접근입니다.");
          window.location.href = "/";
          return;
        }
        axios
          .post(`${process.env.REACT_APP_BASEURL}/user/session`)
          .then((res) => {
            if (res.data.idx !== response.data.userIdx) {
              window.alert("접근 권한이 없습니다.");
              window.location.href = "/";
              return;
            }
            setItem(response.data);
            loadAttractionInfo();
          });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className={styles.mission_page}>
      <section className={styles.mission_top}>
        <div className={styles.title_container}>
          <div className={styles.icon_container_one}>
            <i className={`${styles.head_icon} fas fa-map-marker-alt`}></i>
          </div>
          <p className={styles.title}>
            {item && attractionInfo && `${attractionInfo.name} - ${item.title}`}
          </p>
          <p className={styles.subtitle}>미션관리</p>
        </div>
        <button className={styles.add_button} onClick={openGamePopupHandler}>
          게임 추가
        </button>
      </section>
      <section className={styles.game_list}>
        <AdminProgramGameItem
          openMissionPopupHandler={openMissionPopupHandler}
        />
        <AdminProgramGameItem
          openMissionPopupHandler={openMissionPopupHandler}
        />
        <AdminProgramGameItem
          openMissionPopupHandler={openMissionPopupHandler}
        />
      </section>
      {gamePopupOn && (
        <section className={styles.popup_filter}>
          <AdminProgramGamePopup
            closeGamePopupHandler={closeGamePopupHandler}
            path={params}
            attractionInfo={attractionInfo}
          />
        </section>
      )}
      {missionPopupOn && (
        <section className={styles.popup_filter}>
          <AdminProgramMissionPopup
            closeMissionPopupHandler={closeMissionPopupHandler}
          />
        </section>
      )}
    </section>
  );
};

export default AdminProgramMission;
