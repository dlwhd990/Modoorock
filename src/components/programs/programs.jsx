import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import styles from "./programs.module.css";
import { debounce } from "lodash";
import AreaItem from "./areaItem/areaItem";
import ProgramsButton from "./programsButton/programsButton";
import axios from "axios";
import HelmetComponent from "../../helmetComponent";
import ProgramsThemeSlick from "../slick/programsTheme/programsTheme";

const Programs = ({ areaList, programList, getReviewList }) => {
  const history = useHistory();
  const location = useLocation();
  const { path } = useParams();
  const [inputValue, setInputValue] = useState(
    location.state ? location.state.query : ""
  );
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
    {
      idx: 0,
      title: "농촌체험",
      subtitle: "농촌을 체험해보세요",
    },
    {
      idx: 1,
      title: "액티비티",
      subtitle: "다양한 체험",
    },
    {
      idx: 2,
      title: "단체",
      subtitle: "다함께 즐기기 좋은",
    },
    {
      idx: 3,
      title: "친구",
      subtitle: "친구끼리 즐기기 좋은",
    },
    {
      idx: 4,
      title: "가족",
      subtitle: "가족끼리 사이좋게",
    },
    {
      idx: 5,
      title: "연인",
      subtitle: "연인을 위한 패키지",
    },
  ];
  const [sortValue, setSortValue] = useState("최신순");
  const [allReviewList, setAllReviewList] = useState();

  const [themeDivision, setThemeDivision] = useState(null);

  useEffect(() => {
    const tmp = {
      rural: [],
      activity: [],
      group: [],
      friend: [],
      family: [],
      lover: [],
    };
    programList.forEach((item) => {
      if (item.theme === "농촌체험") {
        tmp.rural.push(item);
      } else if (item.theme === "액티비티") {
        tmp.activity.push(item);
      } else if (item.theme === "단체") {
        tmp.group.push(item);
      } else if (item.theme === "친구") {
        tmp.friend.push(item);
      } else if (item.theme === "가족") {
        tmp.family.push(item);
      } else if (item.theme === "연인") {
        tmp.lover.push(item);
      }
    });
    setThemeDivision(tmp);
  }, []);

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
    if (path === "area") {
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
    }
  };

  const keyHandler = (e) => {
    if (e.key !== "Enter" || path === "area") {
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

  const regionSelectOpenHandler = () => {
    setRegionSelectOpen(!regionSelectOpen);
  };

  useEffect(() => {
    onSearchHandler();
  }, [regionValue, themeValue, sortValue]);

  useEffect(
    debounce(() => {
      onSearchHandler();
    }, 200),
    [inputValue]
  );

  useEffect(() => {
    if (switchValue === "지역별") {
      history.push("/programs/area");
    } else if (switchValue === "테마별") {
      history.push("/programs/theme");
    }
  }, [switchValue]);

  useEffect(() => {
    loadAllReviewList();
    if (path === "area") {
      setSwitchValue("지역별");
    } else if (path === "theme") {
      setSwitchValue("테마별");
    }
  }, []);

  return (
    <section className={styles.programs}>
      <HelmetComponent
        title="체험 상품"
        desc="모두락에는 다양한 체험 상품들이 준비되어 있습니다. 체험 상품과 함께 미션투어를 즐겨보세요."
        url="https://web.modoorock.com/modoorock/programs/area"
      />
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
                switchValue === "테마별"
                  ? `${styles.switch_region_button} ${styles.switch_on}`
                  : `${styles.switch_region_button}`
              }`}
              onClick={onSwitchHandler}
            >
              테마별
            </button>
          </section>
          <section className={styles.search_container}>
            <input
              type="text"
              value={inputValue}
              className={styles.search_input}
              onChange={inputChangeHandler}
              placeholder={
                switchValue === "지역별"
                  ? "찾으시는 지역을 검색해보세요"
                  : "찾으시는 상품을 검색해보세요"
              }
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
            path === "theme" && (
              <section className={styles.theme_main}>
                {themeList.map((theme) => (
                  <section
                    key={theme.idx}
                    className={styles.theme_content_container}
                  >
                    <div className={styles.theme_content_top}>
                      <div className={styles.theme_title_container}>
                        <span className={styles.theme_title}>
                          {theme.title}
                        </span>
                        <span className={styles.theme_subtitle}>
                          {theme.subtitle}
                        </span>
                      </div>
                    </div>
                    <div className={styles.theme_slick_container}>
                      {themeDivision && theme.title === "농촌체험" && (
                        <ProgramsThemeSlick
                          viewItems={themeDivision.rural}
                          areaList={areaList}
                          getReviewList={getReviewList}
                        />
                      )}
                      {themeDivision && theme.title === "액티비티" && (
                        <ProgramsThemeSlick
                          viewItems={themeDivision.activity}
                          areaList={areaList}
                          getReviewList={getReviewList}
                        />
                      )}
                      {themeDivision && theme.title === "단체" && (
                        <ProgramsThemeSlick
                          viewItems={themeDivision.group}
                          areaList={areaList}
                          getReviewList={getReviewList}
                        />
                      )}
                      {themeDivision && theme.title === "친구" && (
                        <ProgramsThemeSlick
                          viewItems={themeDivision.friend}
                          areaList={areaList}
                          getReviewList={getReviewList}
                        />
                      )}
                      {themeDivision && theme.title === "가족" && (
                        <ProgramsThemeSlick
                          viewItems={themeDivision.family}
                          areaList={areaList}
                          getReviewList={getReviewList}
                        />
                      )}
                      {themeDivision && theme.title === "연인" && (
                        <ProgramsThemeSlick
                          viewItems={themeDivision.lover}
                          areaList={areaList}
                          getReviewList={getReviewList}
                        />
                      )}
                    </div>
                  </section>
                ))}
              </section>
            )
          )}
        </section>
      </section>
    </section>
  );
};

export default Programs;
