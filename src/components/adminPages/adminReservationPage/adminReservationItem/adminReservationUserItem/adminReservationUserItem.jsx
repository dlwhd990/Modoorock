import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./adminReservationUserItem.module.css";

const AdminReservationUserItem = ({ userIdx }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/getuserinfo`, {
        idx: userIdx,
      })
      .then((response) => setUser(response.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className={styles.item}>
      <p className={styles.id}>{user && `아이디: ${user.id}`}</p>
      <p className={styles.name}>{user && `이름: ${user.name}`}</p>
      <p className={styles.phone}>
        {user &&
          `연락처: ${user.phone.slice(0, 3)}-${user.phone.slice(
            3,
            7
          )}-${user.phone.slice(7)}`}
      </p>
    </div>
  );
};

export default AdminReservationUserItem;
