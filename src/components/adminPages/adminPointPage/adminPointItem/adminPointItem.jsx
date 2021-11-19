import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./adminPointItem.module.css";

const AdminPointItem = ({ item, loadPointList }) => {
  const [userId, setUserId] = useState(null);
  const [isVideo, setIsVideo] = useState(() => {
    const n = item.file.length;
    const extension = item.file.slice(n - 4, n);
    if (extension === ".mov" || extension === ".mp4") {
      return true;
    }
    return false;
  });

  const onAddPointButtonHandler = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (response.data === "" || response.data.idx !== item.userIdx) {
          window.alert("권한이 없습니다.");
          return;
        }
        addPoint();
      })
      .catch((err) => console.error(err));
  };

  const finishMission = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/usermission/finishusermission`, {
        idx: item.userMissionIdx,
        point: item.point,
      })
      .then((response) => loadPointList())
      .catch((err) => console.error(err));
  };

  const addPoint = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/addpoint`, {
        point: item.point,
        idx: item.pointUserIdx,
        log: isVideo
          ? `${item.title} - 동영상미션`
          : `${item.title} - 사진미션`,
      })
      .then((response) => {
        console.log(response);
        if (response.data !== "success") {
          window.alert("에러가 발생했습니다. 새로고침 후에 다시 시도해주세요");
          return;
        }
        axios
          .post(`${process.env.REACT_APP_BASEURL}/usergame/addpoint`, {
            point: item.point,
            idx: item.userGameIdx,
          })
          .then((res) => {
            if (res.data === "success") {
              window.alert("포인트 지급이 완료되었습니다.");
              finishMission();
            } else {
              window.alert(
                "에러가 발생했습니다. 새로고침 후에 다시 시도해주세요"
              );
            }
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const getUserId = () => {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/user/getuserinfo`, {
          idx: item.pointUserIdx,
        })
        .then((response) => setUserId(response.data.id))
        .catch((err) => console.error(err));
    };
    getUserId();
  }, []);
  return (
    <div className={styles.item}>
      {isVideo ? (
        <video controls className={styles.video}>
          <source
            src={`${process.env.REACT_APP_BASEURL}-images/UserMission/${item.file}`}
            type="video/mp4"
          />
          지원 가능한 영상이 없습니다.
        </video>
      ) : (
        <img
          src={`${process.env.REACT_APP_BASEURL}-images/UserMission/${item.file}`}
          alt="user_image"
          className={styles.image}
        />
      )}
      <div className={styles.data_container}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.user_id}>{`${userId && `아이디: ${userId}`}`}</p>
      </div>
      <div className={styles.button_container}>
        <button className={styles.button} onClick={onAddPointButtonHandler}>
          포인트지급
        </button>
      </div>
    </div>
  );
};

export default AdminPointItem;
