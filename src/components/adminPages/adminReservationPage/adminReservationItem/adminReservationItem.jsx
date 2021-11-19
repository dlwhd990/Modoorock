import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./adminReservationItem.module.css";
import AdminReservationUserItem from "./adminReservationUserItem/adminReservationUserItem";

const AdminReservationItem = ({ item, myReservationList }) => {
  const [expInfo, setExpInfo] = useState(null);
  const [mainPhoto, setMainPhoto] = useState(null);
  const [timeList, setTimeList] = useState(() => {
    const tmp = myReservationList.filter((data) => data.expIdx === item);
    tmp.sort((a, b) =>
      a.reservationDate > b.reservationDate
        ? 1
        : a.reservationDate === b.reservationDate
        ? a.reservationDate > b.reservationDate
          ? 1
          : -1
        : -1
    );
    const onlyTime = [];
    tmp.forEach((data) => {
      onlyTime.push(data.reservationDate);
    });
    const onlyTimeSet = new Set(onlyTime);
    const result = [...onlyTimeSet];
    return result;
  });
  const [timeSelect, setTimeSelect] = useState("");
  const [userList, setUserList] = useState(null);

  const onTimeSelectChangeHandler = (e) => {
    setTimeSelect(e.target.value);
  };

  useEffect(() => {
    setUserList(() => {
      const result = myReservationList.filter(
        (data) => data.reservationDate === timeSelect
      );
      return result.reverse();
    });
  }, [timeSelect]);

  useEffect(() => {
    const loadExpInfo = () => {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/exp/getexpinfo`, {
          idx: item,
        })
        .then((response) => {
          setExpInfo(response.data);
          const photoList = response.data.photo.split("#");
          setMainPhoto(photoList.filter((item) => item.includes("_main.")));
        })
        .catch((err) => console.error(err));
    };
    loadExpInfo();
  }, []);

  return (
    <div className={styles.item}>
      <div className={styles.data}>
        <img
          src={`${process.env.REACT_APP_BASEURL}-images/Exp/${mainPhoto}`}
          alt="exp_image"
          className={styles.image}
        />
        <div className={styles.data_container}>
          <p className={styles.title}>{expInfo && expInfo.title}</p>
          <select
            className={styles.select}
            onChange={onTimeSelectChangeHandler}
            value={timeSelect}
          >
            <option value="">시간 선택</option>
            {timeList &&
              timeList.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className={styles.user_list}>
        <div className={styles.user_list_top}>{`${
          userList && `${userList.length}건의 예약`
        }`}</div>
        <div className={styles.user_list_container}>
          {userList &&
            userList.map((data) => (
              <AdminReservationUserItem key={data.idx} userIdx={data.userIdx} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminReservationItem;
