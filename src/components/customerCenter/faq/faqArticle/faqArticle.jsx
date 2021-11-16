import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./faqArticle.module.css";

const FaqArticle = ({ article }) => {
  const history = useHistory();
  const [viewDetail, setViewDetail] = useState(false);
  const viewArticle = () => {
    setViewDetail(!viewDetail);
  };

  return (
    <section className={styles.article_preview}>
      <section className={styles.q_container} onClick={viewArticle}>
        <div className={styles.q}>Q</div>
        <div className={styles.type}>{article.type}</div>
        <div className={styles.title}>{article.title}</div>
        <div className={styles.date}>{`${article.date.slice(
          0,
          4
        )}/${article.date.slice(5, 7)}/${article.date.slice(8, 10)}`}</div>
      </section>

      <section
        className={
          viewDetail
            ? `${styles.detail} ${styles.detail_on}`
            : `${styles.detail} ${styles.detail_off}`
        }
      >
        <p className={styles.content}>{article.content}</p>
      </section>
    </section>
  );
};

export default FaqArticle;
