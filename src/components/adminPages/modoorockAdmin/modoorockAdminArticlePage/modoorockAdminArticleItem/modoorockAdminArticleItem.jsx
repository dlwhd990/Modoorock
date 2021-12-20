import axios from "axios";
import React, { useState } from "react";
import styles from "./modoorockAdminArticleItem.module.css";

const ModoorockAdminArticleItem = ({
  item,
  selected,
  loadNoticeList,
  loadFaqList,
}) => {
  const [viewDetail, setViewDetail] = useState(false);

  const onViewDetailHandler = () => {
    setViewDetail(!viewDetail);
  };

  const onDeleteHandler = (e) => {
    e.stopPropagation();
    const confirm = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirm) {
      return;
    }
    const path = selected === "공지사항" ? "notice" : "faq";
    axios
      .post(`${process.env.REACT_APP_BASEURL}/${path}/delete${path}`, {
        idx: item.idx,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("삭제되었습니다.");
          loadNoticeList();
          loadFaqList();
        } else {
          window.alert("에러가 발생했습니다. 새로고침 후에 다시 시도해주세요");
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className={styles.container}>
      <div className={styles.item} onClick={onViewDetailHandler}>
        <div className={styles.division}>{item.type}</div>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.writer}>관리자</div>
        <div className={styles.date}>{item.date}</div>
        <div className={styles.delete_container}>
          <button className={styles.delete} onClick={onDeleteHandler}>
            삭제
          </button>
        </div>
      </div>
      <div
        className={`${
          viewDetail ? `${styles.content} ${styles.on}` : `${styles.content}`
        }`}
      >
        <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
      </div>
    </div>
  );
};

export default ModoorockAdminArticleItem;
