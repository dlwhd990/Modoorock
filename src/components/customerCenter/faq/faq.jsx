import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import FaqArticle from "./faqArticle/faqArticle";
import styles from "./faq.module.css";

const Faq = ({ articles, user, getFaqList }) => {
  const [headerSelect, setHeaderSelect] = useState("All");
  const history = useHistory();
  const searchTypeRef = useRef();
  const searchInputRef = useRef();
  const [pageList, setPageList] = useState([]);
  const [listList, setListList] = useState([]);
  const [numbering, setNumbering] = useState(1);
  const [sliceList, setSliceList] = useState([]);
  const [resultArticles, setResultArticles] = useState(articles);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    getFaqList();
  }, []);

  useEffect(() => {
    let pagelength = 0;
    const articleKeyList = Object.keys(articles).reverse();
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
    setPageList(pages);
    setListList(list);
    setResultArticles(articles);
    setSliceList(list.slice(0, 5));
  }, [articles]);

  const headerSelectHandler = (e) => {
    if (e.target.tagName !== "P") {
      return;
    }
    setHeaderSelect(e.target.innerText);
    setNumbering(1);
    const tmp = [];
    if (e.target.innerText === "All") {
      for (let i = 0; i < articles.length; i++) {
        tmp.push(articles[i]);
      }
    } else {
      for (let i = 0; i < articles.length; i++) {
        if (articles[i].type === e.target.innerText) {
          tmp.push(articles[i]);
        }
      }
    }

    const articleKeyList = Object.keys(tmp).reverse();
    let pagelength = 0;

    if (articleKeyList.length % 10 === 0) {
      pagelength = parseInt(articleKeyList.length / 10);
    } else if (articleKeyList.length <= 10) {
      pagelength = 1;
    } else {
      pagelength = parseInt(articleKeyList.length / 10) + 1;
    }

    const list = [];
    for (let i = 1; i <= pagelength; i++) {
      list.push(i);
    }

    const pages = [];
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

    setCursor(0);
    setPageList(pages);
    setListList(list);
    setResultArticles(tmp);

    setSliceList(list.slice(0, 5));
  };

  const pageNumberClick = (e) => {
    setNumbering(parseInt(e.target.textContent));
  };

  const goWrite = () => {
    //로그인 여부 확인 코드 나중에 작성
    history.push("/customer/faq/write");
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
    history.push(`/bbs/search/${type}/${query}`); //추후변경
    window.scrollTo({ top: 0 });
    getFaqList();
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
    if (listList.length === 0) {
      return;
    }
    setSliceList(listList.slice(cursor, cursor + 5));
    setNumbering(cursor + 1);
  }, [cursor]);

  const moveForward = () => {
    if (cursor === 0) {
      return;
    }
    setCursor(cursor - 5);
  };

  const moveBackward = () => {
    if (listList.length === 0) {
      return;
    }
    if (cursor + 5 > listList.length - 1) {
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
        <p
          className={`${
            headerSelect === "test"
              ? `${styles.header_item} ${styles.header_on}`
              : `${styles.header_item} ${styles.header_off}`
          }`}
        >
          test
        </p>
      </section>
      <section className={styles.body}>
        {pageList.length > 1 &&
          pageList[numbering].map((index) => (
            <FaqArticle
              key={resultArticles[index].idx}
              article={resultArticles[index]}
            />
          ))}
      </section>
      <section className={styles.bottom}>
        <ul className={styles.page_numbers}>
          {listList.length > 5 && (
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
          {listList.length > 5 && (
            <li className={styles.arrow} onClick={moveBackward}>
              <i className="fas fa-chevron-right"></i>
            </li>
          )}
        </ul>

        <button className={styles.write_button} onClick={goWrite}>
          글쓰기
        </button>
      </section>
    </section>
  );
};

export default Faq;
