import React, { useState } from "react";
import styles from "./mypageReviewWrite.module.css";
import ReactStars from "react-rating-stars-component";
import axios from "axios";

const MypageReviewWrite = ({
  userExpIdx,
  expIdx,
  exp,
  closePopupHandler,
  sessionCheckForLoadPurchaseList,
}) => {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");

  const starValueChangeHandler = (e) => {
    setStars(e);
  };

  const commentChangeHandler = (e) => {
    setComment(e.target.value);
  };

  const submitReview = (userIdx) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/review/insertreview`, {
        userIdx,
        expIdx,
        userExpIdx,
        stars,
        comment,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("리뷰가 작성되었습니다.");
          closePopupHandler();
          sessionCheckForLoadPurchaseList();
        }
      })
      .catch((err) => console.error(err));
  };

  const onSubmitHandler = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (response.data === "") {
          window.alert("로그인 후에 이용해주세요");
          return;
        }
        axios
          .post(`${process.env.REACT_APP_BASEURL}/userexp/getuserexpinfo`, {
            idx: userExpIdx,
          })
          .then((res) => {
            console.log(res.data.userIdx, response.data.idx);
            if (res.data.userIdx !== response.data.idx) {
              window.alert("작성 권한이 없습니다.");
              return;
            }
            submitReview(response.data.idx);
          })
          .catch((err) => console.error(err));
      });
  };

  return (
    <section className={styles.page}>
      <div onClick={closePopupHandler}>
        <i className={`${styles.close_button_icon} fas fa-times`}></i>
      </div>
      <h3 className={styles.title}>리뷰 작성</h3>
      <p className={styles.exp_info}>{`상품명: ${exp}`}</p>
      <div className={styles.container}>
        <div className={styles.part}>
          <p className={styles.text}>별점</p>
          <ReactStars
            count={5}
            edit={true}
            size={36}
            onChange={starValueChangeHandler}
            activeColor="#ffd700"
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
          />
        </div>
        <div className={styles.part}>
          <p className={styles.text}>리뷰</p>
          <textarea
            onChange={commentChangeHandler}
            value={comment}
            className={styles.textarea}
          ></textarea>
        </div>
        <button className={styles.submit_button} onClick={onSubmitHandler}>
          작성
        </button>
      </div>
    </section>
  );
};

export default MypageReviewWrite;
