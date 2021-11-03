import React, { useState, useEffect } from "react";
import styles from "./inquireArticle.module.css";
import axios from "axios";

const InquireArticle = ({ article, getInquireList }) => {
  const [viewDetail, setViewDetail] = useState(false);
  const [program, setProgram] = useState(null);
  const viewArticle = () => {
    setViewDetail(!viewDetail);
  };

  const deleteHandler = () => {
    const confirm = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirm) {
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/qna/deleteqna`, {
        idx: article.idx,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("삭제되었습니다.");
          getInquireList();
        } else {
          window.alert("에러가 발생했습니다. 새로고침 후에 다시 시도해주세요");
        }
      })
      .catch((err) => console.error(err));
  };

  const getProgramName = () => {
    if (article.expIdx === 0) {
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/exp/getexpinfo`, {
        idx: article.expIdx,
      })
      .then((response) => setProgram(response.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getProgramName();
    return () => {
      setProgram(null);
    };
  }, []);

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
          <div className={styles.inquire_div_and_title_container}>
            <p className={styles.inquire_div}>
              {program ? "분류: 체험상품 문의" : "분류: 모두락 이용문의"}
            </p>
            {program && <p className={styles.slash}>|</p>}
            {program && (
              <p
                className={styles.program_title}
              >{`상품명: ${program.title}`}</p>
            )}
          </div>
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
          <button className={styles.delete_button} onClick={deleteHandler}>
            삭제하기
          </button>
        </div>
      </section>
    </section>
  );
};

export default InquireArticle;
