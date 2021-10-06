import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import QnaArticle from "./qnaArticle/qnaArticle";
import styles from "./qna.module.css";

const Qna = ({ articles, user, loadArticlesAndReplies }) => {
  const [headerSelect, setHeaderSelect] = useState("All");
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
    pages[i] = [];
  }

  for (let i = 1; i <= pagelength; i++) {
    for (let j = 10 * (i - 1); j < 10 * i; j++) {
      if (articleKeyList[j] === undefined) {
        break;
      }
      pages[i].push(articleKeyList[j]);
    }
  }

  const headerSelectHandler = (e) => {
    if (e.target.tagName !== "P") {
      return;
    }
    setResultArticles([]);
    setHeaderSelect(e.target.innerText);
    setNumbering(1);
    if (e.target.innerText === "All") {
      setTempArticles(articles);
      setResultArticles(articles);
      return;
    }
    const tmp = [];
    for (let i = 0; i < articles.length; i++) {
      if (articles[i].type === e.target.innerText) {
        tmp.push(articles[i]);
      }
    }
    setTempArticles(tmp);
    const articleKeyList = Object.keys(tmp).reverse();
    pagelength = 0;

    if (articleKeyList.length % 10 === 0) {
      pagelength = parseInt(articleKeyList.length / 10);
    } else if (articleKeyList.length <= 10) {
      pagelength = 1;
    } else {
      pagelength = parseInt(articleKeyList.length / 10) + 1;
    }

    list = [];
    for (let i = 1; i <= pagelength; i++) {
      list.push(i);
    }

    pages = [];
    for (let i = 0; i <= pagelength; i++) {
      pages[i] = [];
    }

    for (let i = 1; i <= pagelength; i++) {
      for (let j = 10 * (i - 1); j < 10 * i; j++) {
        if (articleKeyList[j] === undefined) {
          break;
        }
        pages[i].push(articleKeyList[j]);
      }
    }
    setResultArticles(tmp);
    setSliceList(list.slice(cursor, cursor + 5));
  };

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
    <section className={styles.notice}>
      <section className={styles.top}>
        <section className={styles.search}>
          <input
            ref={searchInputRef}
            type="text"
            className={styles.search_text_input}
            placeholder="질문을 입력하세요"
            spellCheck="false"
          />
          <button className={styles.search_button} onClick={onSearchHandler}>
            검색
          </button>
        </section>
      </section>
      <section className={styles.header} onClick={headerSelectHandler}>
        <p
          className={`${
            headerSelect === "All"
              ? `${styles.header_item} ${styles.header_on}`
              : `${styles.header_item} ${styles.header_off}`
          }`}
        >
          All
        </p>
        <p
          className={`${
            headerSelect === "상품"
              ? `${styles.header_item} ${styles.header_on}`
              : `${styles.header_item} ${styles.header_off}`
          }`}
        >
          상품
        </p>
        <p
          className={`${
            headerSelect === "주문/배송/반품"
              ? `${styles.header_item} ${styles.header_on}`
              : `${styles.header_item} ${styles.header_off}`
          }`}
        >
          주문/배송/반품
        </p>
        <p
          className={`${
            headerSelect === "멤버쉽"
              ? `${styles.header_item} ${styles.header_on}`
              : `${styles.header_item} ${styles.header_off}`
          }`}
        >
          멤버쉽
        </p>
        <p
          className={`${
            headerSelect === "사이트 이용"
              ? `${styles.header_item} ${styles.header_on}`
              : `${styles.header_item} ${styles.header_off}`
          }`}
        >
          사이트 이용
        </p>
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
