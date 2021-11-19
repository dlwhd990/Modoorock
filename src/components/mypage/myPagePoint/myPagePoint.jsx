import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./myPagePoint.module.css";
import MyPagePointItem from "./myPagePointItem/myPagePointItem";

const MyPagePoint = ({ user }) => {
  const [pointList, setPointList] = useState(null);
  useEffect(() => {
    const loadPointList = (idx) => {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/user/getpointloglist`, {
          idx,
        })
        .then((response) => setPointList(response.data.reverse()))
        .catch((err) => console.error(err));
    };
    const sessionUserCheck = () => {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/user/session`)
        .then((response) => {
          if (response.data === "" || user.idx !== response.data.idx) {
            window.alert("권한이 없습니다.");
            return;
          }
          loadPointList(response.data.idx);
        });
    };
    sessionUserCheck();
  }, []);
  return (
    <section className={styles.list}>
      <section className={styles.top}></section>
      <section className={styles.header}>
        <div className={styles.num}>번호</div>
        <div className={styles.date}>획득일자</div>
        <div className={styles.title}>상품명</div>
        <div className={styles.nothing}></div>
        <div className={styles.amount}>포인트</div>
      </section>
      <section className={styles.body}>
        {pointList ? (
          pointList.length > 0 ? (
            pointList.map((item, index) => (
              <MyPagePointItem
                key={item.idx}
                item={item}
                index={index}
                len={pointList.length}
              />
            ))
          ) : (
            <p className={styles.nothing}>포인트 내역이 없습니다.</p>
          )
        ) : (
          <></>
        )}
      </section>
    </section>
  );
};

export default MyPagePoint;
