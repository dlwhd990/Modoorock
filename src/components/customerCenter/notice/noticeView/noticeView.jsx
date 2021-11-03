import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import styles from "./noticeView.module.css";
import axios from "axios";
import LoadingPage from "../../../loadingPage/loadingPage";

const NoticeView = (props) => {
  const history = useHistory();
  const { path } = useParams();
  const [article, setArticle] = useState(null);

  const onSelectHandler = (e) => {
    if (e.currentTarget.innerText === "공지사항") {
      history.push("/customer/notice");
    } else if (e.currentTarget.innerText === "문의게시판") {
      history.push("/customer/inquire");
    } else if (e.currentTarget.innerText === "FAQ") {
      history.push("/customer/faq");
    }
  };

  const viewNoticeHandler = (idx) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/notice/getnoticeinfo`, {
        idx,
      })
      .then((response) => setArticle(response.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    viewNoticeHandler(path);
  }, []);

  return (
    <section className={styles.notice_view}>
      <div className={styles.main}>
        <section className={styles.notice_view}>
          <section className={styles.customer_top_banner}></section>
          <section className={styles.select_bar_container}>
            <div
              className={`${styles.select_button} ${styles.on}`}
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
        </section>
        {article ? (
          <section>
            <h1 className={styles.title}>공지사항</h1>
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
                  history.push("/customer/notice");
                  window.scrollTo({ top: 0 });
                }}
              >
                공지사항
              </p>
            </div>
            <article className={styles.article}>
              <div className={styles.article_top}>
                <div className={styles.article_top_div}>
                  <p className={styles.type}>{article.type}</p>
                  <p className={styles.article_title}>{article.title}</p>
                </div>
                <div className={styles.article_top_div_two}>
                  <p className={styles.name}>관리자</p>
                  <p className={styles.date}>{article.date}</p>
                </div>
              </div>
              <div className={styles.article_content}>{article.content}</div>
            </article>
          </section>
        ) : (
          <LoadingPage />
        )}
      </div>
    </section>
  );
};

export default NoticeView;
