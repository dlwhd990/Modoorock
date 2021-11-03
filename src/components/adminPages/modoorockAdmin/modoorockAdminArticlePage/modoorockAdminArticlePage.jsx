import React, { useState } from "react";
import ModoorockAdminArticleItem from "./modoorockAdminArticleItem/modoorockAdminArticleItem";
import styles from "./modoorockAdminArticlePage.module.css";

const ModoorockAdminArticlePage = ({
  noticeList,
  faqList,
  inquireList,
  loadNoticeList,
  loadFaqList,
}) => {
  const [selected, setSelected] = useState("공지사항");
  const onSelectHandler = (e) => {
    setSelected(e.currentTarget.innerText);
  };
  return (
    <section className={styles.article_page}>
      <section className={styles.select_container}>
        <div
          className={`${
            selected === "공지사항"
              ? `${styles.select_bar} ${styles.first} ${styles.on}`
              : `${styles.select_bar} ${styles.first}`
          }`}
          onClick={onSelectHandler}
        >
          공지사항
        </div>
        <div
          className={`${
            selected === "FAQ"
              ? `${styles.select_bar} ${styles.second} ${styles.on}`
              : `${styles.select_bar} ${styles.second}`
          }`}
          onClick={onSelectHandler}
        >
          FAQ
        </div>
      </section>
      <section className={styles.list}>
        {selected === "공지사항"
          ? noticeList.map((item) => (
              <ModoorockAdminArticleItem
                key={item.idx}
                item={item}
                selected={selected}
                loadNoticeList={loadNoticeList}
                loadFaqList={loadFaqList}
              />
            ))
          : faqList.map((item) => (
              <ModoorockAdminArticleItem
                key={item.idx}
                item={item}
                selected={selected}
                loadNoticeList={loadNoticeList}
                loadFaqList={loadFaqList}
              />
            ))}
      </section>
    </section>
  );
};

export default ModoorockAdminArticlePage;
