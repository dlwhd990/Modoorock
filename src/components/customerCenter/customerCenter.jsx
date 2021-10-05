import React from "react";
import { useHistory, useParams } from "react-router";
import styles from "./customerCenter.module.css";
import Inquire from "./inquire/inquire";
import Notice from "./notice/notice";
import Qna from "./qna/qna";

const CustomerCenter = ({ noticeArticles }) => {
  const history = useHistory();
  const { path } = useParams();

  const onSelectHandler = (e) => {
    if (e.currentTarget.innerText === "공지사항") {
      history.push("/customer/notice");
    } else if (e.currentTarget.innerText === "문의게시판") {
      history.push("/customer/inquire");
    } else if (e.currentTarget.innerText === "Q&A") {
      history.push("/customer/qna");
    }
  };
  return (
    <section className={styles.customer_center}>
      <section className={styles.customer_top_banner}></section>
      <section className={styles.select_bar_container}>
        <div
          className={
            path === "notice"
              ? `${styles.select_button} ${styles.on}`
              : `${styles.select_button} ${styles.off}`
          }
          onClick={onSelectHandler}
        >
          공지사항
        </div>
        <div
          className={
            path === "qna"
              ? `${styles.select_button} ${styles.on}`
              : `${styles.select_button} ${styles.off}`
          }
          onClick={onSelectHandler}
        >
          Q&A
        </div>
        <div
          className={
            path === "inquire"
              ? `${styles.select_button} ${styles.on}`
              : `${styles.select_button} ${styles.off}`
          }
          onClick={onSelectHandler}
        >
          문의게시판
        </div>
      </section>
      <h1 className={styles.title}>고객센터</h1>
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
            history.push("/customer/notice");
            window.scrollTo({ top: 0 });
          }}
        >
          고객센터
        </p>
        <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>
        <p
          className={styles.route_button}
          onClick={() => {
            if (path === "notice") {
              history.push("/customer/notice");
            } else if (path === "qna") {
              history.push("/customer/qna");
            } else if (path === "inquire") {
              history.push("/customer/inquire");
            }

            window.scrollTo({ top: 0 });
          }}
        >
          {path === "notice"
            ? "공지사항"
            : path === "qna"
            ? "Q&A"
            : "문의게시판"}
        </p>
      </div>
      <section className={styles.main}>
        {path === "notice" ? (
          <Notice articles={noticeArticles} />
        ) : path === "qna" ? (
          <Qna />
        ) : (
          <Inquire />
        )}
      </section>
    </section>
  );
};

export default CustomerCenter;
