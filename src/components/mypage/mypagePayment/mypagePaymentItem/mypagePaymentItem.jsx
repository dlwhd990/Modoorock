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
      <div className={styles.date}>{`${item.purchaseData.payDate.slice(
        0,
        4
      )}/${item.purchaseData.payDate.slice(
        5,
        7
      )}/${item.purchaseData.payDate.slice(8, 10)}`}</div>
      <div
        className={styles.title}
        data-idx={item.expData.idx}
        onClick={goToExp}
      >
        {item.expData !== "" ? item.expData.title : "판매 종료된 체험상품"}
      </div>
      <div className={styles.price}>
        {`${item.expData && `${item.expData.price.toLocaleString("ko-KR")}원`}`}
      </div>
      <div
        className={`${
          item.expData === ""
            ? `${styles.review} ${styles.already}`
            : item.purchaseData.reviewCheck === 0
            ? `${styles.review} ${styles.write}`
            : `${styles.review} ${styles.already}`
        }`}
        data-userexpidx={item.purchaseData.idx}
        data-expidx={item.expData.idx}
        data-exp={item.expData.title}
        data-check={
          item.expData === ""
            ? "off"
            : item.purchaseData.reviewCheck === 0
            ? "on"
            : "off"
        }
        onClick={popupValueChangeHandler}
      >
        {item.expData === ""
          ? "작성불가"
          : item.purchaseData.reviewCheck === 0
          ? "리뷰작성"
          : "작성완료"}
      </div>
    </div>
  );
};

export default MypagePaymentItem;
