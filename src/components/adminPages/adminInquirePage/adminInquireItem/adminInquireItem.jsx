import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./adminInquireItem.module.css";

const AdminInquireItem = ({ article, loadMyInquireList, user }) => {
  const [viewDetail, setViewDetail] = useState(false);
  const [program, setProgram] = useState(null);
  const [answer, setAnswer] = useState("");
  const [writerId, setWriterId] = useState(null);

  const getWriterId = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/getuserinfo`, {
        idx: article.userIdx,
      })
      .then((response) => setWriterId(response.data.id))
      .catch((err) => console.error(err));
  };

  const viewArticle = () => {
    setViewDetail(!viewDetail);
  };

  const answerSubmitHandler = () => {
    if (answer === "") {
      window.alert("답변 내용을 입력해주세요");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/qna/answerqna`, {
        idx: article.idx,
        answer,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("답변이 완료되었습니다.");
          user && loadMyInquireList();
        } else {
          window.alert(
            "에러가 발생했습니다. 페이지를 새로고침한 후에 다시 시도해주세요."
          );
        }
      })
      .catch((err) => console.error(err));
  };

  const getProgramName = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/exp/getexpinfo`, {
        idx: article.expIdx,
      })
      .then((response) => setProgram(response.data))
      .catch((err) => console.error(err));
  };

  const setAnswerHandler = (e) => {
    setAnswer(e.target.value);
  };

  useEffect(() => {
    getProgramName();
    getWriterId();
  }, []);

  return (
    <section className={styles.item}>
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
        <div className={styles.writer}>{writerId && writerId}</div>
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
          {program && (
            <p className={styles.program_title}>{`상품명: ${program.title}`}</p>
          )}

          <div className={styles.inquire_container}>
            <div className={styles.tag_container}>
              <div className={styles.tag}>문의내용</div>
            </div>
            <p className={styles.content}>{article.content}</p>
          </div>
          {article.answer ? (
            <div className={styles.answer_container}>
              <div className={styles.tag_container}>
                <div className={styles.tag}>답변내용</div>
              </div>
              <p className={styles.content}>{article.answer}</p>
            </div>
          ) : (
            <div className={styles.write_answer_input_and_button_container}>
              <textarea
                name="answer"
                id="answer"
                className={styles.write_answer_input}
                onChange={setAnswerHandler}
                spellCheck="false"
                placeholder="답변내용"
              ></textarea>
              <div className={styles.write_answer_button_container}>
                <button
                  className={styles.write_answer_button}
                  onClick={answerSubmitHandler}
                >
                  답변하기
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default AdminInquireItem;
