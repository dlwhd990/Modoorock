import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./noticeArticle.module.css";

const NoticeArticle = ({ article }) => {
  const history = useHistory();
  const viewArticle = () => {
    window.scrollTo({ top: 0 });
    history.push(`/customer/notice/${article.idx}`);
  };

  return (
    <section className={styles.articlePreview} onClick={viewArticle}>
      <div className={styles.q}>Q</div>
      <div className={styles.type}>{article.type}</div>
      <div className={styles.title}>{article.title}</div>
      <div className={styles.date}>{article.date}</div>
    </section>
  );
};

export default NoticeArticle;
