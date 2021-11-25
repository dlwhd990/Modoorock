import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import FaqArticle from "./faqArticle/faqArticle";
import styles from "./faq.module.css";
import axios from "axios";
import HelmetComponent from "../../../helmetComponent";

const Faq = ({ articles, getFaqList }) => {
  const [headerSelect, setHeaderSelect] = useState("All");
  const history = useHistory();
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
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (response.data === "" || response.data.idType !== 2) {
          window.alert("관리자만 작성이 가능합니다.");
          return;
        }
        history.push("/customer/faq/write");
        window.scrollTo({ top: 0 });
      })
      .catch((err) => console.error(err));
  };

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
    <section className={styles.faq}>
      <HelmetComponent
        title="FAQ"
        desc="모두락 FAQ"
        url="https://web.modoorock.com/modoorock/customer/faq"
      />
      <section className={styles.header_top} onClick={headerSelectHandler}>
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
            headerSelect === "주문/결제"
              ? `${styles.header_item} ${styles.header_on}`
              : `${styles.header_item} ${styles.header_off}`
          }`}
        >
          주문/결제
        </p>
        <p
          className={`${
            headerSelect === "회원정보"
              ? `${styles.header_item} ${styles.header_on}`
              : `${styles.header_item} ${styles.header_off}`
          }`}
        >
          회원정보
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
      <section className={styles.header_bottom}>
        <div className={styles.nothing}></div>
        <div className={styles.type}>구분</div>
        <div className={styles.title}>제목</div>
        <div className={styles.date}>작성일</div>
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
          글작성
        </button>
      </section>
    </section>
  );
};

export default Faq;
