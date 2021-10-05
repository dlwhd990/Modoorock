import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import QnaArticle from "./qnaArticle/qnaArticle";
import styles from "./qna.module.css";

const Qna = ({ articles, user, loadArticlesAndReplies }) => {
  const history = useHistory();
  const searchTypeRef = useRef();
  const searchInputRef = useRef();
  const [numbering, setNumbering] = useState(1);
  const [sliceList, setSliceList] = useState([]);
  const [resultArticles, setResultArticles] = useState(articles);
  const [tempArticles, setTempArticles] = useState(articles);
  const [cursor, setCursor] = useState(0);
  const articleKeyList = Object.keys(tempArticles).reverse();

  //useEffect(() => {
  //  loadArticlesAndReplies();
  //}, []);

  let pagelength = 0;

  if (articleKeyList.length % 10 === 0) {
    pagelength = parseInt(articleKeyList.length / 10);
  } else if (articleKeyList.length <= 10) {
    pagelength = 1;
  } else {
    pagelength = parseInt(articleKeyList.length / 10) + 1;
  }

  let list = [];

  for (let i = 1; i <= pagelength; i++) {
    list.push(i);
  }

  let pages = [];
  for (let i = 0; i <= pagelength; i++) {
    pages[i] = new Array();
  }

  for (let i = 1; i <= pagelength; i++) {
    for (let j = 10 * (i - 1); j < 10 * i; j++) {
      if (articleKeyList[j] === undefined) {
        break;
      }
      pages[i].push(articleKeyList[j]);
    }
  }

  const pageNumberClick = (e) => {
    setNumbering(parseInt(e.target.textContent));
  };

  const goWrite = () => {
    if (!user) {
      window.alert("로그인 하신 후에 글 작성이 가능합니다.");
      return;
    }
    history.push("/bbs/write");
    window.scrollTo({ top: 0 });
  };

  const onSearchHandler = () => {
    if (!searchInputRef.current || !searchTypeRef.current) {
      return;
    }
    const query = searchInputRef.current.value;
    const type = searchTypeRef.current.value;
    if (query === "") {
      window.alert("검색어를 입력하세요");
      return;
    } else if (query === "?" || query === "#") {
      window.alert("?, #는 검색할 수 없습니다.");
      return;
    }
    searchInputRef.current.value = "";
    history.push(`/bbs/search/${type}/${query}`);
    window.scrollTo({ top: 0 });
    loadArticlesAndReplies();
  };

  const keyHandler = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    onSearchHandler();
  };

  useEffect(() => {
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  useEffect(() => {
    searchInputRef && searchInputRef.current.focus();
  }, [searchInputRef]);

  useEffect(() => {
    setSliceList(list.slice(cursor, cursor + 5));
    setNumbering(cursor + 1);
  }, [cursor]);

  const moveForward = () => {
    if (cursor === 0) {
      return;
    }
    setCursor(cursor - 5);
  };

  const moveBackward = () => {
    if (cursor + 5 > list.length - 1) {
      return;
    }
    setCursor(cursor + 5);
  };

  return (
    <section className={styles.qna}>
      <section className={styles.top}>
        <section className={styles.search}>
          <select
            ref={searchTypeRef}
            name="search_type"
            id="search_type"
            className={styles.search_type_select}
          >
            <option value="all">전체</option>
            <option value="title">제목</option>
            <option value="writer">작성자</option>
          </select>

          <input
            ref={searchInputRef}
            type="text"
            className={styles.search_text_input}
            placeholder="검색어를 입력하세요"
            spellCheck="false"
          />
          <button className={styles.search_button} onClick={onSearchHandler}>
            검색
          </button>
        </section>
      </section>
      <section className={styles.header}>
        <div className={styles.division}>구분</div>
        <div className={styles.title}>제목</div>
        <div className={styles.writer}>작성자</div>
        <div className={styles.date}>작성일</div>
      </section>
      <section className={styles.body}>
        {pages[numbering].map((index) => (
          <QnaArticle
            key={resultArticles[index].idx}
            article={resultArticles[index]}
            where="notice"
          />
        ))}
      </section>
      <section className={styles.bottom}>
        <ul className={styles.page_numbers}>
          {list.length >= 5 && (
            <li className={styles.arrow} onClick={moveForward}>
              <i className="fas fa-chevron-left"></i>
            </li>
          )}
          {sliceList.map((num) => (
            <li
              key={num}
              className={
                numbering === num
                  ? `${styles.page_number} ${styles.page_on}`
                  : `${styles.page_number} ${styles.page_off}`
              }
              onClick={pageNumberClick}
            >
              {num}
            </li>
          ))}
          {list.length >= 5 && (
            <li className={styles.arrow} onClick={moveBackward}>
              <i className="fas fa-chevron-right"></i>
            </li>
          )}
        </ul>
      </section>
    </section>
  );
};

export default Qna;
