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
    <section className={styles.articlePreview}>
      <section className={styles.q_container} onClick={viewArticle}>
        <div className={styles.q}>Q</div>
        <div className={styles.type}>{article.type}</div>
        <div className={styles.title}>{article.title}</div>
        <div className={styles.date}>{article.date}</div>
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
