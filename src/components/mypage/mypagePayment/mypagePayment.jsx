import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./mypagePayment.module.css";
import MypagePaymentItem from "./mypagePaymentItem/mypagePaymentItem";
import MypageReviewWrite from "./mypageReviewWrite/mypageReviewWrite.module.css/mypageReviewWrite";

const MypagePayment = (props) => {
  const [purchaseList, setPurchaseList] = useState(null);
  const [userExpList, setUserExpList] = useState(null);
  const [popupValue, setPopupValue] = useState(null);

  const popupValueChangeHandler = (e) => {
    const dataset = e.currentTarget.dataset;
    if (dataset.check === "off") {
      return;
    }
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
      .catch((err) => console.log(err));
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

  useEffect(() => {
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
      setUserExpList(result.reverse());
    };
    loadExpInfo();
  }, [purchaseList]);

  return (
    <section className={styles.list}>
      <section className={styles.top}></section>
      <section className={styles.header}>
        <div className={styles.num}>번호</div>
        <div className={styles.date}>결제일자</div>
        <div className={styles.title}>상품명</div>
        <div className={styles.price}>가격</div>
        <div className={styles.review}>리뷰작성</div>
      </section>
      <section className={styles.body}>
        {userExpList && userExpList.length > 0 ? (
          userExpList.map((item, index) => (
            <MypagePaymentItem
              key={item.purchaseData.idx}
              item={item}
              index={index}
              len={userExpList.length}
              popupValueChangeHandler={popupValueChangeHandler}
            />
          ))
        ) : (
          <p className={styles.nothing}>결제 내역이 없습니다.</p>
        )}
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
