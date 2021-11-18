import React from "react";
import { useHistory, useParams } from "react-router";
import styles from "./mypage.module.css";
import MypageMain from "./mypageMain/mypageMain";
import MypagePayment from "./mypagePayment/mypagePayment";
import MyPagePoint from "./myPagePoint/myPagePoint";

const Mypage = ({ user, sessionCheck, userLogout }) => {
  const history = useHistory();
  const { path } = useParams();

  const onSelectHandler = (e) => {
    if (e.currentTarget.innerText === "내 정보") {
      history.push("/mypage/main");
    } else if (e.currentTarget.innerText === "결제내역") {
      history.push("/mypage/payment");
    } else if (e.currentTarget.innerText === "포인트내역") {
      history.push("/mypage/point");
    }
  };

  return (
    <section className={styles.mypage}>
      <section className={styles.customer_top_banner}></section>
      <section className={styles.select_bar_container}>
        <div
          className={
            path === "main"
              ? `${styles.select_button} ${styles.on}`
              : `${styles.select_button} ${styles.off}`
          }
          onClick={onSelectHandler}
        >
          내 정보
        </div>
        <div
          className={
            path === "payment"
              ? `${styles.select_button} ${styles.on}`
              : `${styles.select_button} ${styles.off}`
          }
          onClick={onSelectHandler}
        >
          결제내역
        </div>
        <div
          className={
            path === "point"
              ? `${styles.select_button} ${styles.on}`
              : `${styles.select_button} ${styles.off}`
          }
          onClick={onSelectHandler}
        >
          포인트내역
        </div>
      </section>
      <h1 className={styles.title}>
        {path === "main"
          ? "내 정보"
          : path === "payment"
          ? "결제내역"
          : "포인트내역"}
      </h1>
      <div className={styles.route_button_container}>
        <div
          className={styles.home_icon_container}
          onClick={() => {
            history.push("/");
            window.scrollTo({ top: 0 });
          }}
        >
          <i className={`${styles.home_icon} fas fa-home`}></i>
        </div>

        <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>
        <p
          className={styles.route_button}
          onClick={() => {
            history.push("/mypage/main");
            window.scrollTo({ top: 0 });
          }}
        >
          마이페이지
        </p>
        <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>
        <p
          className={styles.route_button}
          onClick={() => {
            if (path === "main") {
              history.push("/mypage/main");
            } else if (path === "payment") {
              history.push("/mypage/payment");
            }

            window.scrollTo({ top: 0 });
          }}
        >
          {path === "main"
            ? "내 정보"
            : path === "payment"
            ? "결제내역"
            : "포인트내역"}
        </p>
      </div>
      <section className={styles.main}>
        {path === "main" ? (
          <MypageMain
            user={user}
            sessionCheck={sessionCheck}
            userLogout={userLogout}
          />
        ) : path === "payment" ? (
          <MypagePayment user={user} />
        ) : (
          <MyPagePoint user={user} />
        )}
      </section>
    </section>
  );
};

export default Mypage;
