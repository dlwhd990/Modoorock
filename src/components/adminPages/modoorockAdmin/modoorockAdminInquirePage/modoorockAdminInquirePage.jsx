import React, { useState, useEffect } from "react";
import ModoorockAdminInquireItem from "./modoorockAdminInquireItem/modoorockAdminInquireItem";
import styles from "./modoorockAdminInquirePage.module.css";

const ModoorockAdminInquirePage = ({ inquireList, loadInquireList }) => {
  const [noAnswerList, setNoAnswerList] = useState([]);
  const [viewNoAnswer, setViewNoAnswer] = useState(false);

  const viewNoAnswerButtonHandler = () => {
    setViewNoAnswer(!viewNoAnswer);
  };

  useEffect(() => {
    const result = [];
    inquireList.forEach((item) => {
      item.answer === null && result.push(item);
    });
    setNoAnswerList(result);
  }, [inquireList]);
  return (
    <section className={styles.inquire_page}>
      <div className={styles.main}>
        <div className={styles.top}>
          <h1 className={styles.title}>문의/답변</h1>
          <button
            className={styles.view_no_answer_only_button}
            onClick={viewNoAnswerButtonHandler}
          >
            {viewNoAnswer ? "전체보기" : "미답변만 보기"}
          </button>
        </div>
        {viewNoAnswer
          ? noAnswerList.map((item) => (
              <ModoorockAdminInquireItem
                key={item.idx}
                article={item}
                loadInquireList={loadInquireList}
              />
            ))
          : inquireList.map((item) => (
              <ModoorockAdminInquireItem
                key={item.idx}
                article={item}
                loadInquireList={loadInquireList}
              />
            ))}
      </div>
    </section>
  );
};

export default ModoorockAdminInquirePage;
