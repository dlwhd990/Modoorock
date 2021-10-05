import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./inquireArticle.module.css";

const InquireArticle = ({ article }) => {
  const history = useHistory();
  const viewArticle = () => {
    window.scrollTo({ top: 0 });
    history.push(`/customer/inquire/${article.idx}`);
  };

  return (
    <section className={styles.articlePreview} onClick={viewArticle}>
      <div className={styles.division}>
        <div
          className={`${
            article.answer.length > 0
              ? `${styles.division_box} ${styles.complete}`
              : `${styles.division_box} ${styles.incomplete}`
          }`}
        >
          {article.answer.length > 0 ? "답변완료" : "미답변"}
        </div>
      </div>
      <div className={styles.title}>{article.title}</div>
      <div className={styles.writer}>{article.writer}</div>
      <div className={styles.date}>{article.date}</div>
    </section>
  );
};

export default InquireArticle;
