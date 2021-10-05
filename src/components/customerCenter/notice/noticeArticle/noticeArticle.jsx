import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./noticeArticle.module.css";

const NoticeArticle = ({ article }) => {
  const history = useHistory();
  const viewArticle = () => {
    window.scrollTo({ top: 0 });
    history.push(`/customer/qna/${article.idx}`);
  };

  return (
    <section className={styles.articlePreview} onClick={viewArticle}>
      <div className={styles.division}>공지</div>
      <div className={styles.title}>{article.title}</div>
      <div className={styles.writer}>관리자</div>
      <div className={styles.date}>{article.date}</div>
    </section>
  );
};

export default NoticeArticle;
