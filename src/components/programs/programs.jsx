import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import styles from "./programs.module.css";
import { debounce } from "lodash";
import AreaItem from "./areaItem/areaItem";
import ProgramItem from "./programItem/programItem";
import ProgramsButton from "./programsButton/programsButton";

const Programs = ({ areaList, programList, getReviewList }) => {
  const history = useHistory();
  const location = useLocation();
  const { path } = useParams();
  const [inputValue, setInputValue] = useState(
    location.state ? location.state.query : ""
  ); //location.state 있으면 넣고 아니면 ""
  const [resultAreaList, setResultAreaList] = useState(areaList);
  const [resultProgramList, setResultProgramList] = useState(programList);
  const [switchValue, setSwitchValue] = useState("");
  const [regionValue, setRegionValue] = useState("전체");
  const regionList = [
    "전체",
    "서울",
    "경기",
    "강원",
    "부산",
    "인천",
    "충남·대전",
    "충북",
    "경북·대구",
    "경남",
    "전북",
    "전남·광주",
    "제주",
  ];
  const [regionSelectOpen, setRegionSelectOpen] = useState(false);
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

  const onSelectHandler = (e) => {
    if (e.currentTarget.innerText === "프로그램") {
      history.push(`/programs/${path}`);
    }
  };

  const onSwitchHandler = (e) => {
    setInputValue("");
    setSwitchValue(e.currentTarget.innerText);
  };

  const regionChangeHandler = (e) => {
    setResultAreaList([]);
    setRegionSelectOpen(false);
    const area = e.currentTarget.innerText;
    setRegionValue(area);
    if (area === "전체") {
      setResultAreaList(areaList);
      return;
    }
    const result = [];
    areaList.forEach((item) => {
      item.area === area && result.push(item);
    });
    setResultAreaList(result);
  };

  const onThemeChangeHandler = (e) => {
    setThemeValue(e.currentTarget.innerText);
  };

  const sortChangeHandler = (e) => {
    const sortType = e.currentTarget.innerText;
    setSortValue(sortType);
    //이어서 하기
  };

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const onSearchHandler = () => {
    const result = [];
    if (path === "area") {
      if (inputValue === "") {
        for (let i = 0; i < areaList.length; i++) {
          (regionValue === areaList[i].area || regionValue === "전체") &&
            result.push(areaList[i]);
        }
        setResultAreaList(result);
        return;
      }

      for (let i = 0; i < areaList.length; i++) {
        if (
          areaList[i].name.includes(inputValue) &&
          (regionValue === areaList[i].area || regionValue === "전체")
        ) {
          result.push(areaList[i]);
        }
      }
      setResultAreaList(result);
    } else if (path === "theme") {
      if (inputValue === "") {
        for (let i = 0; i < programList.length; i++) {
          (themeValue === programList[i].theme || themeValue === "전체") &&
            result.push(programList[i]);
        }
        setResultProgramList(result);
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
      setResultProgramList(result);
    }
  };

  const regionSelectOpenHandler = () => {
    setRegionSelectOpen(!regionSelectOpen);
  };

  useEffect(() => {
    onSearchHandler();
  }, [regionValue, themeValue]);

  useEffect(
    debounce(() => {
      onSearchHandler();
    }, 200),
    [inputValue]
  );

  useEffect(() => {
    if (switchValue === "지역별") {
      history.push("/programs/area");
    } else if (switchValue === "전체상품") {
      history.push("/programs/theme");
    }
  }, [switchValue]);

  useEffect(() => {
    if (path === "area") {
      setSwitchValue("지역별");
    } else if (path === "theme") {
      setSwitchValue("전체상품");
    }
  }, []);

  return (
    <section className={styles.programs}>
      <section className={styles.programs_top_banner}></section>
      <section className={styles.select_bar_container}>
        <div
          className={`${styles.select_button} ${styles.on}`}
          onClick={onSelectHandler}
        >
          상품 목록
        </div>
      </section>
      <section className={styles.programs_container}>
        <h1 className={styles.title}>체험 상품</h1>
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
              history.push(`/programs/${path}`);
              window.scrollTo({ top: 0 });
            }}
          >
            체험상품
          </p>
          <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>
          <p
            className={styles.route_button}
            onClick={() => {
              history.push(`/programs/${path}`);
              window.scrollTo({ top: 0 });
            }}
          >
            상품 목록
          </p>
        </div>
        <section className={styles.main_container}>
          <section className={styles.switch_button_container}>
            <button
              className={`${
                switchValue === "지역별"
                  ? `${styles.switch_region_button} ${styles.switch_on}`
                  : `${styles.switch_region_button}`
              }`}
              onClick={onSwitchHandler}
            >
              지역별
            </button>
            <button
              className={`${
                switchValue === "전체상품"
                  ? `${styles.switch_region_button} ${styles.switch_on}`
                  : `${styles.switch_region_button}`
              }`}
              onClick={onSwitchHandler}
            >
              전체상품
            </button>
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
          {path === "area" ? (
            <section className={styles.region_main}>
              <button
                className={styles.region_select_toggle}
                onClick={regionSelectOpenHandler}
              >
                지역 선택
              </button>
              <section
                className={
                  regionSelectOpen
                    ? `${styles.region_select_container} ${styles.region_select_on}`
                    : `${styles.region_select_container} ${styles.region_select_off}`
                }
              >
                {regionList.map((region) => (
                  <ProgramsButton
                    key={region}
                    name={region}
                    value={regionValue}
                    changeHandler={regionChangeHandler}
                  />
                ))}
              </section>

              <section className={styles.program_list}>
                {resultAreaList.length === 0 ? (
                  <p className={styles.no_attraction}>관광지가 없습니다.</p>
                ) : (
                  resultAreaList.map((item) => (
                    <AreaItem
                      key={item.idx}
                      item={item}
                      programList={programList}
                    />
                  ))
                )}
              </section>
            </section>
          ) : (
            <section className={styles.theme_main}>
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
          )}
        </section>
      </section>
    </section>
  );
};

export default Programs;
