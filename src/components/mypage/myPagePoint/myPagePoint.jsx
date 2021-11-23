import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styles from "./myPagePoint.module.css";
import MyPagePointItem from "./myPagePointItem/myPagePointItem";

const MyPagePoint = ({ user }) => {
  const target = useRef();
  const [pointList, setPointList] = useState(null);
  const [nowPointList, setNowPointList] = useState(null);
  const [nowLength, setNowLength] = useState(null);
  //const onIntersect = ([entry], observer) => {
  //  console.log(pointList);
  //  if (!pointList) {
  //    return;
  //  }
  //  if (entry.isIntersecting) {
  //    console.log(nowPointList, nowLength);
  //    observer.unobserve(entry.target);
  //    setNowPointList(pointList.slice(0, nowLength));
  //    setNowLength(nowLength + 10);
  //    console.log(pointList.slice(0, nowLength));
  //  }
  //};
  useEffect(() => {
    const loadPointList = (idx) => {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/user/getpointloglist`, {
          idx,
        })
        .then((response) => {
          setPointList(response.data.reverse());
        })
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
  //useEffect(() => {
  //  if (!target.current) {
  //    return;
  //  }
  //  const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
  //  observer.observe(target.current);
  //  return () => observer.disconnect();
  //}, [target.current]);

  return (
    <section className={styles.list}>
      <section className={styles.top}>
        <p
          className={styles.total_point}
        >{`내 포인트: ${user.totalPoint} 점`}</p>
      </section>
      <section className={styles.header}>
        <div className={styles.num}>번호</div>
        <div className={styles.date}>날짜</div>
        <div className={styles.title}>상품명</div>
        <div className={styles.nothing}></div>
        <div className={styles.amount}>포인트</div>
      </section>
      <section className={styles.body}>
        {pointList ? (
          pointList.length > 0 ? (
            <>
              {pointList.map((item, index) => (
                <MyPagePointItem
                  key={item.idx}
                  item={item}
                  index={index}
                  len={pointList.length}
                />
              ))}
            </>
          ) : (
            <p className={styles.nothing}>포인트 내역이 없습니다.</p>
          )
        ) : (
          <></>
        )}
        <div ref={target} className={styles.loading_target}></div>
      </section>
    </section>
  );
};

export default MyPagePoint;
