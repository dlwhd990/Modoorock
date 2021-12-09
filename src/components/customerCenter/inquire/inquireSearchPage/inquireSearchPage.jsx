import React, { useEffect, useState, useRef } from "react";
import styles from "./inquireSearchPage.module.css";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import InquireArticle from "../inquireArticle/inquireArticle";
import HelmetComponent from "../../../../helmetComponent";

const InquireSearchPage = ({ inquireArticles, getInquireList }) => {
  const history = useHistory();
  const { query } = useParams();
  const searchInputRef = useRef();
  const [searchInput, setSearchInput] = useState("");
  const [pageList, setPageList] = useState([]);
  const [listList, setListList] = useState([]);
  const [numbering, setNumbering] = useState(1);
  const [sliceList, setSliceList] = useState(null);
  const [resultArticles, setResultArticles] = useState(null);
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    getInquireList();
  }, []);

  const articles = inquireArticles.filter((item) => item.title.includes(query));

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
  }, [query]);

  const pageNumberClick = (e) => {
    setNumbering(parseInt(e.target.textContent));
  };

  const searchInputChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const goWrite = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (response.data === "" || response.data.idType !== 2) {
          window.alert("관리자만 작성이 가능합니다.");
          return;
        }
        history.push("/customer/notice/write");
        window.scrollTo({ top: 0 });
      })
      .catch((err) => console.error(err));
  };

  const onSearchHandler = () => {
    if (!searchInput) {
      window.alert("검색어를 입력해주세요");
      return;
    }
    if (searchInput === "?" || searchInput === "#") {
      window.alert("?, #는 검색할 수 없습니다.");
      return;
    }
    setSearchInput("");
    searchInputRef.current.value = "";
    history.push(`/customer/inquire/search/${searchInput}`);
    getInquireList();
  };

  const keyHandler = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    onSearchHandler();
  };

  useEffect(() => {
    window.addEventListener("keypress", keyHandler);
    return () => {
      window.removeEventListener("keypress", keyHandler);
    };
  }, [keyHandler]);

  useEffect(() => {
    searchInputRef && searchInputRef.current.focus();
  }, [searchInputRef]);

  useEffect(() => {
    listList.slice(cursor, cursor + 5).length !== 0 &&
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

  return (
    <section className={styles.search_result}>
      {query && (
        <HelmetComponent
          title="문의게시판 검색결과"
          desc={`문의게시판 검색결과-${query}`}
          url={`https://web.modoorock.com/modoorock/customer/inquire/search/${query}`}
        />
      )}
      <section className={styles.customer_top_banner}></section>
      <section className={styles.select_bar_container}>
        <div className={styles.select_button}>검색결과</div>
      </section>
      <h1 className={styles.search_title}>문의게시판 검색결과</h1>
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
            history.push("/customer/notice");
            window.scrollTo({ top: 0 });
          }}
        >
          문의게시판 검색결과
        </p>
      </div>
      <section className={styles.qna}>
        <section className={styles.top}>
          <section className={styles.search}>
            <input
              onChange={searchInputChangeHandler}
              value={searchInput}
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
          <div className={styles.header_title}>제목</div>
          <div className={styles.writer}>작성자</div>
          <div className={styles.date}>작성일</div>
        </section>
        <section className={styles.body}>
          {pageList.length > 1 &&
            pageList[numbering].map((index) => (
              <InquireArticle
                key={resultArticles[index].idx}
                article={resultArticles[index]}
                where="inquire"
              />
            ))}
          {pageList.length === 1 && (
            <p className={styles.nothing}>검색 결과가 없습니다.</p>
          )}
        </section>
        <section className={styles.bottom}>
          <ul className={styles.page_numbers}>
            {listList.length > 5 && (
              <li className={styles.arrow} onClick={moveForward}>
                <i className="fas fa-chevron-left"></i>
              </li>
            )}
            {sliceList &&
              sliceList.map((num) => (
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
            글작성
          </button>
        </section>
      </section>
    </section>
  );
};

export default InquireSearchPage;
