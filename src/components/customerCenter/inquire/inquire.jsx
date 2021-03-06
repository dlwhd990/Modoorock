import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import InquireArticle from "./inquireArticle/inquireArticle";
import styles from "./inquire.module.css";
import axios from "axios";
import HelmetComponent from "../../../helmetComponent";

const Inquire = ({ articles, getInquireList, user }) => {
  const history = useHistory();
  const searchInputRef = useRef();
  const [searchInput, setSearchInput] = useState("");
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
    if (!user) {
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
    pages.length <= numbering && setNumbering(numbering - 1);
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
          window.alert("????????? ????????? ???????????????.");
          return;
        }
        history.push("/customer/inquire/write");
        window.scrollTo({ top: 0 });
      })
      .catch((err) => console.error(err));
  };

  const searchInputChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const onSearchHandler = () => {
    if (!searchInput) {
      return;
    }
    const query = searchInput;

    if (query === "") {
      window.alert("???????????? ???????????????");
      return;
    } else if (query === "?" || query === "#") {
      window.alert("?, #??? ????????? ??? ????????????.");
      return;
    }
    searchInputRef.current.value = "";
    setSearchInput("");
    history.push(`/customer/inquire/search/${query}`);
    getInquireList();
  };

  const keyHandler = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    onSearchHandler();
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    window.addEventListener("keypress", keyHandler);
    return () => {
      window.removeEventListener("keypress", keyHandler);
    };
  }, [keyHandler]);

  useEffect(() => {
    if (!user) {
      return;
    }
    searchInputRef && searchInputRef.current.focus();
  }, [searchInputRef]);

  useEffect(() => {
    if (!user) {
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

  if (user) {
    return (
      <section className={styles.inquire}>
        <HelmetComponent
          title="???????????????"
          desc="????????? ???????????????"
          url="https://web.modoorock.com/modoorock/customer/inquire"
        />
        <section className={styles.top}>
          <section className={styles.search}>
            <input
              value={searchInput}
              onChange={searchInputChangeHandler}
              ref={searchInputRef}
              type="text"
              className={styles.search_text_input}
              placeholder="???????????? ???????????????"
              spellCheck="false"
            />
            <button className={styles.search_button} onClick={onSearchHandler}>
              ??????
            </button>
          </section>
        </section>
        <section className={styles.header}>
          <div className={styles.division}>??????</div>
          <div className={styles.title}>??????</div>
          <div className={styles.writer}></div>
          <div className={styles.date}>?????????</div>
        </section>
        <section className={styles.body}>
          {pageList.length > 1 &&
            pageList[numbering].map((index) => (
              <InquireArticle
                key={resultArticles[index].idx}
                article={resultArticles[index]}
                getInquireList={getInquireList}
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
            ????????????
          </button>
        </section>
      </section>
    );
  } else {
    return (
      <section className={styles.not_user}>????????? ?????? ?????? ???????????????</section>
    );
  }
};

export default Inquire;
