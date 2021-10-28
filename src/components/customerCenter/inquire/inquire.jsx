import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import InquireArticle from "./inquireArticle/inquireArticle";
import styles from "./inquire.module.css";
import axios from "axios";

const Inquire = ({ articles, getInquireList, loggedin }) => {
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
    getInquireList();
  }, []);

  useEffect(() => {
    if (!loggedin) {
      return;
    }
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

  const pageNumberClick = (e) => {
    setNumbering(parseInt(e.target.textContent));
  };

  const goWrite = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (!response.data === "") {
          window.alert("회원만 작성이 가능합니다.");
          return;
        }
        history.push("/customer/inquire/write");
        window.scrollTo({ top: 0 });
      })
      .catch((err) => console.error(err));
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
    history.push(`/customer/inquire/search/${type}/${query}`);
    window.scrollTo({ top: 0 });
    getInquireList();
  };

  const keyHandler = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    onSearchHandler();
  };

  useEffect(() => {
    if (!loggedin) {
      return;
    }
    window.addEventListener("keydown", keyHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, []);

  useEffect(() => {
    if (!loggedin) {
      return;
    }
    searchInputRef && searchInputRef.current.focus();
  }, [searchInputRef]);

  useEffect(() => {
    if (!loggedin) {
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
    if (cursor + 5 > listList.length - 1) {
      return;
    }
    setCursor(cursor + 5);
  };

  if (loggedin) {
    return (
      <section className={styles.inquire}>
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
          {pageList.length > 1 &&
            pageList[numbering].map((index) => (
              <InquireArticle
                key={resultArticles[index].idx}
                article={resultArticles[index]}
              />
            ))}
        </section>
        <section className={styles.bottom}>
          <ul className={styles.page_numbers}>
            {listList.length >= 5 && (
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
            {listList.length >= 5 && (
              <li className={styles.arrow} onClick={moveBackward}>
                <i className="fas fa-chevron-right"></i>
              </li>
            )}
          </ul>
          <button className={styles.write_button} onClick={goWrite}>
            모두락 이용문의
          </button>
        </section>
      </section>
    );
  } else {
    return (
      <section className={styles.not_loggedin}>
        로그인 후에 확인해주세요
      </section>
    );
  }
};

export default Inquire;
