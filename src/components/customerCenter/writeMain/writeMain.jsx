import React from "react";
import { useHistory, useParams } from "react-router";
import FaqWrite from "../faq/faqWrite/faqWrite";
import InquireWrite from "../inquire/inquireWrite/inquireWrite";
import NoticeWrite from "../notice/noticeWrite/noticeWrite";
import styles from "./writeMain.module.css";

const WriteMain = () => {
  const history = useHistory();
  const { path } = useParams();

  const onSelectHandler = (e) => {
    const confirm = window.confirm(
      "이 페이지에서 벗어나게 되면 현재까지 작성하신 내용이 모두 사라집니다. 정말로 이동하시겠습니까?"
    );
    if (!confirm) {
      return;
    }
    if (e.currentTarget.innerText === "공지사항") {
      history.push("/customer/notice/write");
    } else if (e.currentTarget.innerText === "문의게시판") {
      history.push("/customer/inquire/write");
    } else if (e.currentTarget.innerText === "FAQ") {
      history.push("/customer/faq/write");
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
            path === "faq"
              ? `${styles.select_button} ${styles.on}`
              : `${styles.select_button} ${styles.off}`
          }
          onClick={onSelectHandler}
        >
          FAQ
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
      <h1 className={styles.title}>
        {path === "notice"
          ? "공지사항 글쓰기"
          : path === "faq"
          ? "FAQ 글쓰기"
          : "문의게시판 글쓰기"}
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
            } else if (path === "faq") {
              history.push("/customer/faq");
            } else if (path === "inquire") {
              history.push("/customer/inquire");
            }

            window.scrollTo({ top: 0 });
          }}
        >
          {path === "notice"
            ? "공지사항 글쓰기"
            : path === "faq"
            ? "FAQ 글쓰기"
            : "문의게시판 글쓰기"}
        </p>
      </div>
      <section className={styles.main}>
        {path === "faq" ? (
          <FaqWrite />
        ) : path === "notice" ? (
          <NoticeWrite />
        ) : (
          <InquireWrite />
        )}
      </section>
    </section>
  );
};

export default WriteMain;
