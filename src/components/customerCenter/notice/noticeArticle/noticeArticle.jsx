import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./noticeArticle.module.css";

const NoticeArticle = ({ article }) => {
  const history = useHistory();
  const viewArticle = () => {
    window.scrollTo({ top: 0 });
    history.push(`/customer/notice/view/${article.idx}`);
  };

  return (
    <section className={styles.article_preview} onClick={viewArticle}>
      <div className={styles.division}>공지</div>
      <div className={styles.title}>{article.title}</div>
      <div className={styles.writer}>관리자</div>
      <div className={styles.date}>{`${article.date.slice(
        0,
        4
      )}/${article.date.slice(5, 7)}/${article.date.slice(8, 10)}`}</div>
    </section>
  );
};

export default NoticeArticle;
