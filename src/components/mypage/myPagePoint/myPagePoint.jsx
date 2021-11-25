import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import HelmetComponent from "../../../helmetComponent";
import styles from "./myPagePoint.module.css";
import MyPagePointItem from "./myPagePointItem/myPagePointItem";

const MyPagePoint = ({ user }) => {
  const target = useRef();
  const [pointList, setPointList] = useState(null);
  const [pageList, setPageList] = useState([]);
  const [listList, setListList] = useState([]);
  const [numbering, setNumbering] = useState(1);
  const [sliceList, setSliceList] = useState([]);
  const [resultArticles, setResultArticles] = useState(null);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    if (!pointList) {
      return;
    }
    let pagelength = 0;
    const articleKeyList = Object.keys(pointList).reverse();
    if (articleKeyList.length % 10 === 0) {
      pagelength = parseInt(articleKeyList.length / 10);
    } else if (articleKeyList.length <= 10) {
      pagelength = 1;
    } else {
      pagelength = parseInt(articleKeyList.length / 10) + 1;
    }

    let list = [];

    for (let i = 1; i <= pagelength; i++) {
      list.push(i);
    }

    let pages = [];
    for (let i = 0; i <= pagelength; i++) {
      pages[i] = [];
    }

    for (let i = 1; i <= pagelength; i++) {
      for (let j = 10 * (i - 1); j < 10 * i; j++) {
        if (articleKeyList[j] === undefined) {
          break;
        }
        pages[i].push(articleKeyList[j]);
      }
    }
    setPageList(pages);
    setListList(list);
    setResultArticles(pointList);
    setSliceList(list.slice(0, 5));
  }, [pointList]);

  const pageNumberClick = (e) => {
    setNumbering(parseInt(e.target.textContent));
  };

  useEffect(() => {
    setSliceList(listList.slice(cursor, cursor + 5));
    setNumbering(cursor + 1);
  }, [cursor]);

  const moveForward = () => {
    if (cursor === 0) {
      return;
    }
    setCursor(cursor - 5);
  };

  const moveBackward = () => {
    if (cursor + 5 > listList.length - 1) {
      return;
    }
    setCursor(cursor + 5);
  };

  useEffect(() => {
    const loadPointList = (idx) => {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/user/getpointloglist`, {
          idx,
        })
        .then((response) => {
          setPointList(response.data);
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

  return (
    <section className={styles.list}>
      <HelmetComponent
        title="포인트 내역"
        desc="모두락 포인트내역"
        url="https://web.modoorock.com/modoorock/mypage/point"
      />
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
        {pageList.length > 1 &&
          pageList[numbering].map((item) => (
            <MyPagePointItem
              key={item.idx}
              item={pointList[item]}
              index={item}
            />
          ))}
        {pageList.length === 1 && (
          <p className={styles.nothing}>포인트 내역이 없습니다.</p>
        )}
      </section>
      <section className={styles.bottom}>
        <ul className={styles.page_numbers}>
          {listList.length > 5 && (
            <li className={styles.arrow} onClick={moveForward}>
              <i className="fas fa-chevron-left"></i>
            </li>
          )}
          {sliceList &&
            sliceList.map((num) => (
              <li
                key={num}
                className={
                  numbering === num
                    ? `${styles.page_number} ${styles.page_on}`
                    : `${styles.page_number} ${styles.page_off}`
                }
                onClick={pageNumberClick}
              >
                {num}
              </li>
            ))}
          {listList.length > 5 && (
            <li className={styles.arrow} onClick={moveBackward}>
              <i className="fas fa-chevron-right"></i>
            </li>
          )}
        </ul>
      </section>
    </section>
  );
};

export default MyPagePoint;
