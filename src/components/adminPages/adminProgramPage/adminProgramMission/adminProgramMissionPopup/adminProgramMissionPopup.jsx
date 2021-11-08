import React, { useState } from "react";
import AdminProgramMissionUploadFour from "../adminProgramMissionUploadForm/adminProgramMissionUploadFour/adminProgramMissionUploadFour";
import AdminProgramMissionUploadInstruction from "../adminProgramMissionUploadForm/adminProgramMissionUploadInstruction/adminProgramMissionUploadInstruction";
import AdminProgramMissionUploadItemMission from "../adminProgramMissionUploadForm/adminProgramMissionUploadItemMission/adminProgramMissionUploadItemMission";
import AdminProgramMissionUploadOx from "../adminProgramMissionUploadForm/adminProgramMissionUploadOx/adminProgramMissionUploadOx";
import AdminProgramMissionUploadPhoto from "../adminProgramMissionUploadForm/adminProgramMissionUploadPhoto/adminProgramMissionUploadPhoto";
import AdminProgramMissionUploadShort from "../adminProgramMissionUploadForm/adminProgramMissionUploadShort/adminProgramMissionUploadShort";
import AdminProgramMissionUploadSurvey from "../adminProgramMissionUploadForm/adminProgramMissionUploadSurvey/adminProgramMissionUploadSurvey";
import AdminProgramMissionUploadTopper from "../adminProgramMissionUploadForm/adminProgramMissionUploadTopper/adminProgramMissionUploadTopper";
import AdminProgramMissionUploadVideo from "../adminProgramMissionUploadForm/adminProgramMissionUploadVideo/adminProgramMissionUploadVideo";
import styles from "./adminProgramMissionPopup.module.css";

const AdminProgramMissionPopup = ({
  closeMissionPopupHandler,
  user,
  gameIdx,
}) => {
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
            토퍼 미션
          </div>
          <div className={styles.type_item} onClick={onTypeSelectHandler}>
            아이템 미션
          </div>
        </div>
      )}
      {type === "단답형 미션" && (
        <AdminProgramMissionUploadShort
          closeMissionPopupHandler={closeMissionPopupHandler}
          user={user}
        />
      )}
      {type === "OX 퀴즈 미션" && (
        <AdminProgramMissionUploadOx
          closeMissionPopupHandler={closeMissionPopupHandler}
          user={user}
          gameIdx={gameIdx}
        />
      )}
      {type === "4지선다" && (
        <AdminProgramMissionUploadFour
          closeMissionPopupHandler={closeMissionPopupHandler}
          user={user}
        />
      )}
      {type === "지시 미션" && (
        <AdminProgramMissionUploadInstruction
          closeMissionPopupHandler={closeMissionPopupHandler}
          user={user}
        />
      )}
      {type === "설문 미션" && (
        <AdminProgramMissionUploadSurvey
          closeMissionPopupHandler={closeMissionPopupHandler}
          user={user}
        />
      )}
      {type === "사진 미션" && (
        <AdminProgramMissionUploadPhoto
          closeMissionPopupHandler={closeMissionPopupHandler}
          user={user}
        />
      )}
      {type === "동영상 미션" && (
        <AdminProgramMissionUploadVideo
          closeMissionPopupHandler={closeMissionPopupHandler}
          user={user}
        />
      )}
      {type === "토퍼 미션" && (
        <AdminProgramMissionUploadTopper
          closeMissionPopupHandler={closeMissionPopupHandler}
          user={user}
        />
      )}
      {type === "아이템 미션" && (
        <AdminProgramMissionUploadItemMission
          closeMissionPopupHandler={closeMissionPopupHandler}
          user={user}
        />
      )}
    </section>
  );
};

export default AdminProgramMissionPopup;
