import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./modoorockAdminReportItem.module.css";

const ModoorockAdminReportItem = ({ item, loadReportList }) => {
  const [reportUser, setReportUser] = useState(null);
  const [reviewUser, setReviewUser] = useState(null);
  console.log(item);
  const getReportUserInfo = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/getuserinfo`, {
        idx: item.userIdx,
      })
      .then((response) => setReportUser(response.data.id))
      .catch((err) => console.error(err));
  };

  const getReviewUserInfo = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/getuserinfo`, {
        idx: item.reviewUserIdx,
      })
      .then((response) => setReviewUser(response.data.id))
      .catch((err) => console.error(err));
  };

  const onCancelButtonHandler = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/report/deletereport`, {
        idx: item.idx,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("신고가 취소되었습니다.");
          loadReportList();
          return;
        }
        window.alert("에러가 발생했습니다. 새로고침 후에 다시 시도해주세요");
      })
      .catch((err) => console.error(err));
  };

  const onReportDeleteHandler = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/report/deletereviewreport`, {
        idx: item.idx,
        reviewIdx: item.reviewIdx,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("리뷰가 삭제되었습니다.");
          loadReportList();
          return;
        }
        window.alert("에러가 발생했습니다. 새로고침 후에 다시 시도해주세요");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getReportUserInfo();
    getReviewUserInfo();
  });
  return (
    <div className={styles.item}>
      <p className={styles.idx}>번호</p>
      <p className={styles.report_user}>{reportUser && reportUser}</p>
      <div className={styles.reason_container}>
        <p className={styles.comment}>{`리뷰 내용: ${item.comment}`}</p>
        <p className={styles.reason}>{`신고 사유: ${item.reason}`}</p>
      </div>
      <p className={styles.review_user}>{reviewUser && reviewUser}</p>

      <div className={styles.button_container}>
        <button className={styles.button} onClick={onCancelButtonHandler}>
          취소
        </button>
        <button className={styles.button} onClick={onReportDeleteHandler}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default ModoorockAdminReportItem;
