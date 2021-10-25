import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./noticeView.module.css";
import axios from "axios";

const NoticeView = (props) => {
  const { path } = useParams();
  const [article, setArticle] = useState(null);

  const viewNoticeHandler = (idx) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/notice/getnoticeinfo`, {
        idx,
      })
      .then((response) => setArticle(response.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    viewNoticeHandler(path);
  }, []);

  return (
    <section className={styles.notice_view}>
      {article && (
        <div className={styles.main}>
          <p className={styles.title}>{article.title}</p>
          <p className={styles.content}>{article.content}</p>
        </div>
      )}
    </section>
  );
};

export default NoticeView;
