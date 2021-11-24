import axios from "axios";
import React from "react";
import { useHistory } from "react-router";
import styles from "./mypagePaymentItem.module.css";
const MypagePaymentItem = ({
  item,
  index,
  len,
  popupValueChangeHandler,
  sessionCheckForLoadPurchaseList,
}) => {
  const history = useHistory();

  const deleteReview = () => {
    console.log(item);
    axios
      .post(`${process.env.REACT_APP_BASEURL}/review/deletereview`, {
        userExpIdx: item.purchaseData.idx,
      })
      .then((response) => {
        console.log(response);
        if (response.data === "success") {
          window.alert("삭제되었습니다.");
          sessionCheckForLoadPurchaseList();
        } else {
          window.alert("에러가 발생했습니다. 새로고침 후에 다시 시도해주세요");
        }
      })
      .catch((err) => console.error(err));
  };

  const onButtonClickHandler = (e) => {
    if (e.target.dataset.check === "already") {
      deleteReview();
    } else if (e.target.dataset.check === "off") {
      return;
    } else {
      popupValueChangeHandler(e.target.dataset);
    }
  };

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
            : `${styles.review} ${styles.delete}`
        }`}
        data-userexpidx={item.purchaseData.idx}
        data-expidx={item.expData.idx}
        data-exp={item.expData.title}
        data-check={
          item.expData === ""
            ? "off"
            : item.purchaseData.reviewCheck === 0
            ? "on"
            : "already"
        }
        onClick={onButtonClickHandler}
      >
        {item.expData === ""
          ? "작성불가"
          : item.purchaseData.reviewCheck === 0
          ? "리뷰작성"
          : "리뷰삭제"}
      </div>
    </div>
  );
};

export default MypagePaymentItem;
