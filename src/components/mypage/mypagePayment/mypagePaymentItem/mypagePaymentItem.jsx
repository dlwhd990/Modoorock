import React from "react";
import { useHistory } from "react-router";
import styles from "./mypagePaymentItem.module.css";

const MypagePaymentItem = ({ item, index, len, popupValueChangeHandler }) => {
  const history = useHistory();
  const goToExp = (e) => {
    history.push(`/programs/view/${e.target.dataset.idx}`);
  };
  return (
    <div className={styles.item}>
      <div className={styles.num}>{len - index}</div>
      <div className={styles.date}>{item.purchaseData.payDate}</div>
      <div
        className={styles.title}
        data-idx={item.expData.idx}
        onClick={goToExp}
      >
        {item.expData.title}
      </div>
      <div className={styles.price}>
        {`${item.expData.price.toLocaleString("ko-KR")}원`}
      </div>
      <div
        className={`${
          item.purchaseData.reviewCheck === 0
            ? `${styles.review} ${styles.write}`
            : `${styles.review} ${styles.already}`
        }`}
        data-userexpidx={item.purchaseData.idx}
        data-expidx={item.expData.idx}
        data-exp={item.expData.title}
        data-check={item.purchaseData.reviewCheck === 0 ? "on" : "off"}
        onClick={popupValueChangeHandler}
      >
        {item.purchaseData.reviewCheck === 0 ? "리뷰작성" : "작성완료"}
      </div>
    </div>
  );
};

export default MypagePaymentItem;
