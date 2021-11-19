import React, { useEffect, useState } from "react";
import styles from "./adminFirstPagePointItem.module.css";
import axios from "axios";
import { useHistory } from "react-router";

const AdminFirstPagePointItem = ({ item }) => {
  const history = useHistory();
  const [userId, setUserId] = useState(null);
  const [isVideo, setIsVideo] = useState(() => {
    const n = item.file.length;
    const extension = item.file.slice(n - 4, n);
    if (extension === ".mov" || extension === ".mp4") {
      return true;
    }
    return false;
  });

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
    <div className={styles.item} onClick={() => history.push("/admin/point")}>
      <div className={styles.main}>
        {isVideo ? (
          <video controls className={styles.item_video}>
            <source
              src={`${process.env.REACT_APP_BASEURL}-images/UserMission/${item.file}`}
              type="video/mp4"
            />
            지원 가능한 영상이 없습니다.
          </video>
        ) : (
          <img
            src={`${process.env.REACT_APP_BASEURL}-images/UserMission/${item.file}`}
            alt="user_photo"
            className={styles.item_photo}
          />
        )}

        <div className={styles.data_container}>
          <p className={styles.data_name}>{item.title}</p>
          <p className={styles.data_area}>{`${userId && userId}`}</p>
        </div>
      </div>

      <i className={`${styles.icon} fas fa-chevron-right`}></i>
    </div>
  );
};
export default AdminFirstPagePointItem;
