import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import AdminProgramGameItem from "./adminProgramGameItem/adminProgramGameItem";
import styles from "./adminProgramMission.module.css";
import AdminProgramGamePopup from "./adminProgramGamePopup/adminProgramGamePopup";
import AdminProgramMissionPopup from "./adminProgramMissionPopup/adminProgramMissionPopup";
import AdminProgramItemUploadPopup from "./adminProgramItemUploadPopup/adminProgramItemUploadPopup";

const AdminProgramMission = ({ user }) => {
  const params = useParams();
  const [item, setItem] = useState(null);
  const [attractionInfo, setAttractionInfo] = useState(null);
  const [gameList, setGameList] = useState(null);
  const [gamePopupOn, setGamePopupOn] = useState(false);
  const [missionPopupOn, setMissionPopupOn] = useState(false);
  const [itemUploadPopupOn, setItemUploadPopupOn] = useState(false);
  const [missionLoader, setMissionLoader] = useState(false);

  const loadAttractionInfo = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/attraction/getattractioninfo`, {
        idx: parseInt(params.path_three),
      })
      .then((response) => setAttractionInfo(response.data))
      .catch((err) => console.error(err));
  };

  const loadGameList = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/game/getgamelist`, {
        expIdx: parseInt(params.path_five),
      })
      .then((response) => setGameList(response.data.reverse()))
      .catch((err) => console.error(err));
  };

  const loadMissionList = (gameIdx, setting) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/mission/getmissionlist`, {
        gameIdx,
      })
      .then((response) => setting && setting(response.data))
      .catch((err) => console.error(err));
  };

  const setMissionLoaderHandler = () => {
    setMissionLoader(!missionLoader);
  };

  const openGamePopupHandler = () => {
    setGamePopupOn(true);
  };

  const closeGamePopupHandler = () => {
    setGamePopupOn(false);
  };

  const openMissionPopupHandler = (e) => {
    e.stopPropagation();
    setMissionPopupOn(parseInt(e.currentTarget.dataset.where));
  };

  const closeMissionPopupHandler = () => {
    setMissionPopupOn(false);
  };

  const openAddItemPopupHandler = (e) => {
    e.stopPropagation();
    setItemUploadPopupOn(e.currentTarget.dataset.missionidx);
  };

  const closeAddItemPopupHandler = () => {
    setItemUploadPopupOn(false);
  };

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/exp/getexpinfo`, {
        idx: params.path_five,
      })
      .then((response) => {
        if (response.data.attractionIdx !== parseInt(params.path_three)) {
          window.alert("????????? ???????????????.");
          window.location.href = "/modoorock";
          return;
        }
        axios
          .post(`${process.env.REACT_APP_BASEURL}/user/session`)
          .then((res) => {
            if (res.data.idx !== response.data.userIdx) {
              window.alert("?????? ????????? ????????????.");
              window.location.href = "/modoorock";
              return;
            }
            setItem(response.data);
            loadAttractionInfo();
            loadGameList();
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
          <p className={styles.subtitle}>????????????</p>
        </div>
        <button className={styles.add_button} onClick={openGamePopupHandler}>
          ?????? ??????
        </button>
      </section>
      <p className={styles.alert}>
        ????????? ??????????????? ?????? ????????? ???????????????. (?????? ?????? ??? ????????? ????????????
        ????????? ???????????????.)
      </p>
      <section className={styles.game_list}>
        {gameList &&
          gameList.map((item) => (
            <AdminProgramGameItem
              key={item.idx}
              item={item}
              openMissionPopupHandler={openMissionPopupHandler}
              loadGameList={loadGameList}
              loadMissionList={loadMissionList}
              missionLoader={missionLoader}
              setMissionLoaderHandler={setMissionLoaderHandler}
              openAddItemPopupHandler={openAddItemPopupHandler}
            />
          ))}
      </section>
      {gamePopupOn && (
        <section className={styles.popup_filter}>
          <AdminProgramGamePopup
            closeGamePopupHandler={closeGamePopupHandler}
            attractionInfo={attractionInfo}
            loadGameList={loadGameList}
            path={params}
          />
        </section>
      )}
      {missionPopupOn && (
        <section className={styles.popup_filter}>
          <AdminProgramMissionPopup
            closeMissionPopupHandler={closeMissionPopupHandler}
            user={user}
            loadMissionList={loadMissionList}
            setMissionLoaderHandler={setMissionLoaderHandler}
            gameIdx={missionPopupOn}
          />
        </section>
      )}
      {itemUploadPopupOn && (
        <section className={styles.popup_filter}>
          <AdminProgramItemUploadPopup
            user={user}
            closeAddItemPopupHandler={closeAddItemPopupHandler}
            missionIdx={itemUploadPopupOn}
          />
        </section>
      )}
    </section>
  );
};

export default AdminProgramMission;
