import React, { useEffect, useState } from "react";
import styles from "./searchResultPage.module.css";
import { useHistory, useParams } from "react-router";

const SearchResultPage = ({ noticeArticles, faqArticles, inquireArticles }) => {
  const history = useHistory();
  const { path, type, query } = useParams();
  const [resultArticles, setResultArticles] = useState(null);
  const onSelectHandler = () => {
    console.log("보류");
  };

  //useEffect(() => {
  //공지사항 => 타입 필요없음 (모두 관리자 글이기 때문에 작성자 항목 삭제)
  //FAQ => 실시간 검색으로 사용할까 생각중, 또는 타입을 상품, 사이트 이용 이런걸로 할지
  //문의게시판 => 자기글만 보는건지부터 확인
  //},[])
  return (
    <section className={styles.search_result}>
      <section className={styles.customer_top_banner}></section>
      <section className={styles.select_bar_container}>
        <div className={styles.select_button} onClick={onSelectHandler}>
          검색결과
        </div>
      </section>
      <h1 className={styles.title}>
        {path === "notice" ? "공지사항" : path === "faq" ? "FAQ" : "문의게시판"}
      </h1>
      <div className={styles.route_button_container}>
        <div
          className={styles.home_icon_container}
          onClick={() => {
            history.push("/");
            window.scrollTo({ top: 0 });
          }}
        >
          <i className={`${styles.home_icon} fas fa-home`}></i>
        </div>

        <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>
        <p
          className={styles.route_button}
          onClick={() => {
            history.push("/customer/notice");
            window.scrollTo({ top: 0 });
          }}
        >
          고객센터
        </p>
        <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>
        <p
          className={styles.route_button}
          onClick={() => {
            if (path === "notice") {
              history.push("/customer/notice");
            } else if (path === "faq") {
              history.push("/customer/faq");
            } else if (path === "inquire") {
              history.push("/customer/inquire");
            }

            window.scrollTo({ top: 0 });
          }}
        >
          {path === "notice"
            ? "공지사항 검색결과"
            : path === "faq"
            ? "FAQ 검색결과"
            : "문의게시판 검색결과"}
        </p>
      </div>
    </section>
  );
};

export default SearchResultPage;
