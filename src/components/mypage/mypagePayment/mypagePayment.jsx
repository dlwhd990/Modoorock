import axios from "axios";
import React, { useEffect, useState } from "react";
import HelmetComponent from "../../../helmetComponent";
import styles from "./mypagePayment.module.css";
import MypagePaymentItem from "./mypagePaymentItem/mypagePaymentItem";
import MypageReviewWrite from "./mypageReviewWrite/mypageReviewWrite";

const MypagePayment = (props) => {
  const [pageList, setPageList] = useState([]);
  const [listList, setListList] = useState([]);
  const [numbering, setNumbering] = useState(1);
  const [sliceList, setSliceList] = useState([]);
  const [resultArticles, setResultArticles] = useState(null);
  const [cursor, setCursor] = useState(0);
  const [purchaseList, setPurchaseList] = useState(null);
  const [userExpList, setUserExpList] = useState(null);
  const [popupValue, setPopupValue] = useState(null);

  useEffect(() => {
    if (!userExpList) {
      return;
    }
    let pagelength = 0;
    const articleKeyList = Object.keys(purchaseList).reverse();
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
    setResultArticles(userExpList);
    setSliceList(list.slice(0, 5));
  }, [userExpList]);

  useEffect(() => {
    console.log(resultArticles);
    console.log(pageList);
    console.log(listList);
  }, [resultArticles, pageList, listList]);

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

  const popupValueChangeHandler = (dataset) => {
    setPopupValue({
      userExpIdx: dataset.userexpidx,
      expIdx: dataset.expidx,
      exp: dataset.exp,
    });
  };

  const closePopupHandler = () => {
    setPopupValue(null);
  };

  const loadPurchaseList = (userIdx) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/userexp/getuserexplist`, {
        userIdx,
      })
      .then((response) => {
        setPurchaseList(response.data);
      })
      .catch((err) => console.error(err));
  };
  const sessionCheckForLoadPurchaseList = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (response.data === "") {
          window.alert("로그인 후에 사용 가능합니다.");
          return;
        }
        loadPurchaseList(response.data.idx);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    sessionCheckForLoadPurchaseList();
  }, []);

  const loadExpInfo = async () => {
    const result = [];
    if (!purchaseList) {
      return;
    }
    for (const item of purchaseList) {
      await axios
        .post(`${process.env.REACT_APP_BASEURL}/exp/getexpinfo`, {
          idx: item.expIdx,
        })
        .then((response) =>
          result.push({ purchaseData: item, expData: response.data })
        )
        .catch((err) => console.error(err));
    }
    setUserExpList(result);
  };

  useEffect(() => {
    loadExpInfo();
  }, [purchaseList]);

  return (
    <section className={styles.list}>
      <HelmetComponent
        title="결제 내역"
        desc="모두락 결제내역"
        url="https://web.modoorock.com/modoorock/mypage/payment"
      />
      <section className={styles.top}></section>
      <section className={styles.header}>
        <div className={styles.num}>번호</div>
        <div className={styles.date}>결제일자</div>
        <div className={styles.title}>상품명</div>
        <div className={styles.price}>가격</div>
        <div className={styles.review}>리뷰작성</div>
      </section>
      <section className={styles.body}>
        {userExpList && resultArticles && pageList.length > 1 ? (
          pageList[numbering].map((item) => (
            <MypagePaymentItem
              key={item}
              index={item}
              item={resultArticles[item]}
              loadExpInfo={loadExpInfo}
              popupValueChangeHandler={popupValueChangeHandler}
              sessionCheckForLoadPurchaseList={sessionCheckForLoadPurchaseList}
            />
          ))
        ) : pageList.length === 1 ? (
          <p className={styles.nothing}>결제 내역이 없습니다.</p>
        ) : (
          <></>
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

      {popupValue && (
        <div className={styles.filter}>
          <MypageReviewWrite
            userExpIdx={parseInt(popupValue.userExpIdx)}
            expIdx={parseInt(popupValue.expIdx)}
            exp={popupValue.exp}
            closePopupHandler={closePopupHandler}
            sessionCheckForLoadPurchaseList={sessionCheckForLoadPurchaseList}
          />
        </div>
      )}
    </section>
  );
};

export default MypagePayment;
