import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { debounce } from "lodash";
import ProgramItem from "../programItem/programItem";
import styles from "./attraction.module.css";
import axios from "axios";
import { parse } from "date-fns/esm";

const Attraction = ({ areaList, getReviewList }) => {
  const history = useHistory();
  const { path } = useParams();
  const [attractionProgramList, setAttractionProgramList] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [resultProgramList, setResultProgramList] = useState([]);
  const [areaData, setAreaData] = useState(null);
  const [sortValue, setSortValue] = useState("최신순");

  const loadAreaInfo = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/attraction/getattractioninfo`, {
        idx: parseInt(path),
      })
      .then((response) => setAreaData(response.data))
      .catch((err) => console.error(err));
  };

  const loadProgramList = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/exp/getexpattractionlist`, {
        attractionIdx: parseInt(path),
      })
      .then((response) => {
        setAttractionProgramList(response.data);
        setResultProgramList(response.data);
      })
      .catch((err) => console.error(err));
  };

  const onSelectHandler = (e) => {
    if (e.currentTarget.innerText === "프로그램") {
      history.push(`/programs/area`);
    }
  };

  const sortChangeHandler = (e) => {
    const sortType = e.currentTarget.innerText;
    setSortValue(sortType);
    if (sortType === "최신순") {
      setResultProgramList(attractionProgramList);
    } //이어서 하기
  };

  const onSearchHandler = () => {
    const result = [];

    if (inputValue === "") {
      setResultProgramList(attractionProgramList);
      return;
    }

    for (let i = 0; i < attractionProgramList.length; i++) {
      if (attractionProgramList[i].title.includes(inputValue)) {
        result.push(attractionProgramList[i]);
      }
    }
    setResultProgramList(result);
  };

  useEffect(() => {
    loadAreaInfo();
    loadProgramList();
  }, []);

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const inputToSearchHandler = debounce(() => {
      onSearchHandler();
    }, 200);
    attractionProgramList && inputToSearchHandler();
  }, [inputValue, sortValue]);

  return (
    <section className={styles.attraction}>
      <section className={styles.attraction_top_banner}></section>
      <section className={styles.select_bar_container}>
        <div
          className={`${styles.select_button} ${styles.on}`}
          onClick={onSelectHandler}
        >
          상품 목록
        </div>
      </section>
      <section className={styles.attraction_container}>
        <p className={styles.attraction_title}>
          {areaData && `${areaData.name} 투어 패키지`}
        </p>
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
              history.push(`/programs/area`);
              window.scrollTo({ top: 0 });
            }}
          >
            프로그램
          </p>
          <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>
          <p
            className={styles.route_button}
            onClick={() => {
              history.push(`/programs/area`);
              window.scrollTo({ top: 0 });
            }}
          >
            상품 목록
          </p>
          <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>
          <p
            className={styles.route_button}
            onClick={() => {
              history.push(`/programs/attraction/${path}`);
            }}
          >
            {areaData && `${areaData.name} 투어 패키지`}
          </p>
        </div>

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
        <section className={styles.attraction_list_container}>
          {resultProgramList.map((item) => (
            <ProgramItem
              key={item.idx}
              item={item}
              areaList={areaList}
              getReviewList={getReviewList}
            />
          ))}
        </section>
      </section>
    </section>
  );
};

export default Attraction;
