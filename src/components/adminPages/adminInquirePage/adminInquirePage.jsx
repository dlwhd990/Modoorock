import React, { useEffect, useState } from "react";
import AdminInquireItem from "./adminInquireItem/adminInquireItem";
import styles from "./adminInquirePage.module.css";

const AdminInquirePage = ({ myInquireList, loadMyInquireList, user }) => {
  const [noAnswerList, setNoAnswerList] = useState([]);
  const [viewNoAnswer, setViewNoAnswer] = useState(false);

  const viewNoAnswerButtonHandler = () => {
    setViewNoAnswer(!viewNoAnswer);
  };

  useEffect(() => {
    const result = [];
    myInquireList.forEach((item) => {
      item.answer === null && result.push(item);
    });
    setNoAnswerList(result);
  }, [myInquireList]);

  return (
    <section className={styles.inquire_page}>
      <section className={styles.inquire_top}>
        <div className={styles.title_container}>
          <div className={styles.icon_container_one}>
            <i className={`${styles.head_icon} fas fa-comments`}></i>
          </div>
          <p className={styles.title}>문의 관리</p>
          <p
            className={styles.subtitle}
          >{`${myInquireList.length} 개의 문의`}</p>
          <p className={styles.subtitle_slash}>|</p>
          <p className={styles.subtitle_right}>
            {`${noAnswerList.length} 개의 미답변 문의`}
          </p>
        </div>
        <button
          className={styles.view_no_answer_only_button}
          onClick={viewNoAnswerButtonHandler}
        >
          {viewNoAnswer ? "전체보기" : "미답변만 보기"}
        </button>
      </section>
      <section className={styles.main_list}>
        {viewNoAnswer
          ? noAnswerList.map((article) => (
              <AdminInquireItem
                key={article.idx}
                article={article}
                loadMyInquireList={loadMyInquireList}
                user={user}
              />
            ))
          : myInquireList.map((article) => (
              <AdminInquireItem
                key={article.idx}
                article={article}
                loadMyInquireList={loadMyInquireList}
                user={user}
              />
            ))}
      </section>
    </section>
  );
};

export default AdminInquirePage;
