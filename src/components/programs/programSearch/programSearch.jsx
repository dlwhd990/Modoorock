import styles from "./programSearch.module.css";
import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import ProgramsButton from "../programsButton/programsButton";
import axios from "axios";
import ProgramItem from "../programItem/programItem";

const ProgramSearch = ({ programList, getReviewList }) => {
  const history = useHistory();
  const { query } = useParams();
  const [inputValue, setInputValue] = useState(query ? query : "");
  const [resultProgramList, setResultProgramList] = useState(programList);
  const [themeValue, setThemeValue] = useState("전체");
  const themeList = [
    "전체",
    "농촌체험",
    "액티비티",
    "단체",
    "친구",
    "가족",
    "연인",
  ];

  const [sortValue, setSortValue] = useState("최신순");
  const [allReviewList, setAllReviewList] = useState();
  const [regionSelectOpen, setRegionSelectOpen] = useState(false);

  const onThemeChangeHandler = (e) => {
    setThemeValue(e.currentTarget.innerText);
  };

  const loadAllReviewList = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/review/getreviewlist`, {
        expIdx: -1,
      })
      .then((response) => setAllReviewList(response.data))
      .catch((err) => console.error(err));
  };

  const sortWithStar = (result) => {
    const sortResult = [];
    const scores = {};
    const counts = {};
    const tmp = [];
    allReviewList.forEach((item) => {
      result.forEach((data) => {
        if (item.expIdx === data.idx) {
          tmp.push(item);
          return false;
        }
      });
    });
    tmp.forEach((item) => {
      if (!scores[item.expIdx]) {
        scores[item.expIdx] = item.stars;
      } else {
        scores[item.expIdx] += item.stars;
      }
      if (!counts[item.expIdx]) {
        counts[item.expIdx] = 1;
      } else {
        counts[item.expIdx] += 1;
      }
    });

    const keyList = Object.keys(scores);
    keyList.forEach((key) => {
      scores[key] = scores[key] / counts[key];
    });
    const sortable = [];
    for (let scoreKey in scores) {
      sortable.push([parseInt(scoreKey), scores[scoreKey]]);
    }
    result.forEach((item) => {
      if (!scores[item.idx]) {
        sortable.push([item.idx, 0]);
      }
    });
    sortable.sort((a, b) => {
      return b[1] - a[1];
    });

    sortable.forEach((item) => {
      result.forEach((data) => {
        if (data.idx === item[0]) {
          sortResult.push(data);
          return false;
        }
      });
    });
    return sortResult;
  };

  const sortHandler = (sortType, result) => {
    if (sortType === "최신순") {
      result.sort((a, b) => {
        if (b.date > a.date) {
          return 1;
        } else if (b.date < a.date) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (sortType === "판매량") {
      result.sort((a, b) => {
        if (b.count > a.count) {
          return 1;
        } else if (b.count < a.count) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (sortType === "평점높은순") {
      return sortWithStar(result);
    }
    return result;
  };

  const sortChangeHandler = (e) => {
    const sortType = e.currentTarget.innerText;
    setSortValue(sortType);
  };

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const onSearchHandler = () => {
    const result = [];
    if (inputValue === "") {
      for (let i = 0; i < programList.length; i++) {
        (themeValue === programList[i].theme || themeValue === "전체") &&
          result.push(programList[i]);
      }
      setResultProgramList(sortHandler(sortValue, result));
      return;
    }

    for (let i = 0; i < programList.length; i++) {
      if (
        programList[i].title.includes(inputValue) &&
        (themeValue === programList[i].theme || themeValue === "전체")
      ) {
        result.push(programList[i]);
      }
    }
    setResultProgramList(sortHandler(sortValue, result));
  };

  const regionSelectOpenHandler = () => {
    setRegionSelectOpen(!regionSelectOpen);
  };

  useEffect(() => {
    onSearchHandler();
  }, [themeValue, sortValue]);

  const keyHandler = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    history.push(`/programs/search/${inputValue}`);
  };

  useEffect(() => {
    window.addEventListener("keypress", keyHandler);
    return () => {
      window.removeEventListener("keypress", keyHandler);
    };
  }, [keyHandler]);

  useEffect(() => {
    onSearchHandler();
    loadAllReviewList();
  }, [query]);

  return (
    <section className={styles.theme_main}>
      <section className={styles.programs_top_banner}></section>
      <section className={styles.select_bar_container}>
        <div className={`${styles.select_button} ${styles.on}`}>검색결과</div>
      </section>
      <section className={styles.programs_container}>
        <h1 className={styles.title}>{`검색결과 - ${
          query.length > 6 ? query.slice(0, 6) + "..." : query
        }`}</h1>
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
          <p className={styles.route_button}>체험상품</p>
          <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>
          <p className={styles.route_button}>검색결과</p>
        </div>
      </section>

      <section className={styles.search_container}>
        <input
          type="text"
          value={inputValue}
          className={styles.search_input}
          onChange={inputChangeHandler}
          placeholder="찾으시는 상품을 검색해보세요"
          spellCheck="false"
        />
        <i className={`${styles.search_icon} fas fa-search`}></i>
      </section>
      <button
        className={styles.region_select_toggle}
        onClick={regionSelectOpenHandler}
      >
        테마 선택
      </button>
      <section
        className={
          regionSelectOpen
            ? `${styles.region_select_container} ${styles.region_select_on}`
            : `${styles.region_select_container} ${styles.region_select_off}`
        }
      >
        {themeList.map((theme) => (
          <ProgramsButton
            key={theme}
            name={theme}
            value={themeValue}
            changeHandler={onThemeChangeHandler}
          />
        ))}
      </section>
      <ul className={styles.sort_button_container}>
        <li
          className={
            sortValue === "최신순"
              ? `${styles.sort_button} ${styles.sort_on}`
              : `${styles.sort_button}`
          }
          onClick={sortChangeHandler}
        >
          최신순
        </li>

        <li
          className={
            sortValue === "평점높은순"
              ? `${styles.sort_button} ${styles.sort_on}`
              : `${styles.sort_button}`
          }
          onClick={sortChangeHandler}
        >
          평점높은순
        </li>
        <li
          className={
            sortValue === "판매량"
              ? `${styles.sort_last_button} ${styles.sort_on}`
              : `${styles.sort_last_button}`
          }
          onClick={sortChangeHandler}
        >
          판매량
        </li>
      </ul>
      <section className={styles.program_list}>
        {resultProgramList.length === 0 ? (
          <p className={styles.no_attraction}>체험상품이 없습니다.</p>
        ) : (
          resultProgramList.map((item) => (
            <ProgramItem
              key={item.idx}
              item={item}
              getReviewList={getReviewList}
            />
          ))
        )}
      </section>
    </section>
  );
};

export default ProgramSearch;
