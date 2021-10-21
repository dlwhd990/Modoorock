import React, { useState } from "react";
import styles from "./inquireArticle.module.css";

const InquireArticle = ({ article }) => {
  const [viewDetail, setViewDetail] = useState(false);
  const viewArticle = () => {
    setViewDetail(!viewDetail);
  };

  return (
    <section className={styles.articlePreview}>
      <section className={styles.inquire} onClick={viewArticle}>
        <div className={styles.division}>
          <div
            className={`${
              article.answer
                ? `${styles.division_box} ${styles.complete}`
                : `${styles.division_box} ${styles.incomplete}`
            }`}
          >
            {article.answer ? "답변완료" : "미답변"}
          </div>
        </div>
        <div className={styles.title}>{article.title}</div>
        <div className={styles.writer}>{article.writer}</div>
        <div className={styles.date}>{article.date}</div>
      </section>
      <section
        className={
          viewDetail
            ? `${styles.detail} ${styles.detail_on}`
            : `${styles.detail} ${styles.detail_off}`
        }
      >
        <div className={styles.content_container}>
          <div className={styles.inquire_container}>
            <div className={styles.tag_container}>
              <div className={styles.tag}>문의내용</div>
            </div>
            <p className={styles.content}>{article.content}</p>
          </div>
          {article.answer && (
            <div className={styles.answer_container}>
              <div className={styles.tag_container}>
                <div className={styles.tag}>답변내용</div>
              </div>
              <p className={styles.content}>{article.answer}</p>
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default InquireArticle;
