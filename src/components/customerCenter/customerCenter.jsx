import React from "react";
import { useHistory, useParams } from "react-router";
import styles from "./customerCenter.module.css";
import Inquire from "./inquire/inquire";
import Faq from "./faq/faq";
import Notice from "./notice/notice";

const CustomerCenter = ({
  user,
  noticeArticles,
  faqArticles,
  inquireArticles,
  getNoticeList,
  getFaqList,
  getInquireList,
}) => {
  const history = useHistory();
  const { path } = useParams();

  const onSelectHandler = (e) => {
    if (e.currentTarget.innerText === "공지사항") {
      history.push("/customer/notice");
    } else if (e.currentTarget.innerText === "문의게시판") {
      history.push("/customer/inquire");
    } else if (e.currentTarget.innerText === "FAQ") {
      history.push("/customer/faq");
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
        {path === "notice" ? "공지사항" : path === "faq" ? "FAQ" : "문의게시판"}
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
            ? "공지사항"
            : path === "faq"
            ? "FAQ"
            : "문의게시판"}
        </p>
      </div>
      <section className={styles.main}>
        {path === "notice" ? (
          <Notice articles={noticeArticles} getNoticeList={getNoticeList} />
        ) : path === "faq" ? (
          <Faq articles={faqArticles} getFaqList={getFaqList} />
        ) : (
          <Inquire
            user={user}
            articles={inquireArticles}
            getInquireList={getInquireList}
          />
        )}
      </section>
    </section>
  );
};

export default CustomerCenter;
