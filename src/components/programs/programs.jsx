import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styles from "./programs.module.css";
import { debounce } from "lodash";
import AreaItem from "./areaItem/areaItem";
import ProgramsThemeSlick from "../slick/programsTheme/programsTheme";

const Programs = ({ areaList, programList }) => {
  const history = useHistory();
  const { path } = useParams();
  const [inputValue, setInputValue] = useState("");
  const [resultProgramList, setResultProgramList] = useState([]);
  const [resultAreaList, setResultAreaList] = useState(areaList);
  const [switchValue, setSwitchValue] = useState("지역");
  const [regionValue, setRegionValue] = useState("전체");
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

  const onSelectHandler = (e) => {
    if (e.currentTarget.innerText === "프로그램") {
      history.push(`/programs/${path}`);
    }
  };

  const onSwitchHandler = (e) => {
    setSwitchValue(e.currentTarget.innerText);
  };

  const regionChangeHandler = (e) => {
    setResultAreaList([]);
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

  const inputChangeHandler = debounce((e) => {
    setResultProgramList([]);
    setInputValue(e.target.value);
  }, 200);

  const onSearchHandler = () => {
    const result = [];

    if (inputValue === "") {
      for (let i = 0; i < programList.length; i++) {
        result.push(programList[i]);
      }
      setResultProgramList(result);
      return;
    }

    for (let i = 0; i < programList.length; i++) {
      if (programList[i].title.includes(inputValue)) {
        result.push(programList[i]);
      }
    }
    setResultProgramList(result);
  };

  useEffect(() => {
    onSearchHandler();
  }, [inputValue]);

  useEffect(() => {
    if (switchValue === "지역") {
      history.push("/programs/area");
    } else if (switchValue === "테마") {
      history.push("/programs/theme");
    }
  }, [switchValue]);

  return (
    <section className={styles.programs}>
      <section className={styles.programs_top_banner}></section>
      <section className={styles.select_bar_container}>
        <div
          className={`${styles.select_button} ${styles.on}`}
          onClick={onSelectHandler}
        >
          프로그램 소개
        </div>
      </section>
      <section className={styles.programs_container}>
        <h1 className={styles.title}>프로그램 소개</h1>
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
            프로그램
          </p>
          <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>
          <p
            className={styles.route_button}
            onClick={() => {
              history.push(`/programs/${path}`);
              window.scrollTo({ top: 0 });
            }}
          >
            프로그램 소개
          </p>
        </div>
        <section className={styles.main_container}>
          <section className={styles.switch_button_container}>
            <button
              className={`${
                switchValue === "지역"
                  ? `${styles.switch_region_button} ${styles.switch_on}`
                  : `${styles.switch_region_button}`
              }`}
              onClick={onSwitchHandler}
            >
              지역
            </button>
            <button
              className={`${
                switchValue === "테마"
                  ? `${styles.switch_region_button} ${styles.switch_on}`
                  : `${styles.switch_region_button}`
              }`}
              onClick={onSwitchHandler}
            >
              테마
            </button>
          </section>
          <section className={styles.search_container}>
            <input
              type="text"
              className={styles.search_input}
              onChange={inputChangeHandler}
              placeholder="찾으시는 상품을 검색해보세요"
              spellCheck="false"
            />
            <i className={`${styles.search_icon} fas fa-search`}></i>
          </section>
          {path === "area" ? (
            <section className={styles.region_main}>
              <section className={styles.region_select_container}>
                <div
                  className={`${
                    regionValue === "전체"
                      ? `${styles.region_select} ${styles.region_on}`
                      : `${styles.region_select}`
                  }`}
                  onClick={regionChangeHandler}
                >
                  전체
                </div>
                <div
                  className={`${
                    regionValue === "서울"
                      ? `${styles.region_select} ${styles.region_on}`
                      : `${styles.region_select}`
                  }`}
                  onClick={regionChangeHandler}
                >
                  서울
                </div>
                <div
                  className={`${
                    regionValue === "경기"
                      ? `${styles.region_select} ${styles.region_on}`
                      : `${styles.region_select}`
                  }`}
                  onClick={regionChangeHandler}
                >
                  경기
                </div>
                <div
                  className={`${
                    regionValue === "강원"
                      ? `${styles.region_select} ${styles.region_on}`
                      : `${styles.region_select}`
                  }`}
                  onClick={regionChangeHandler}
                >
                  강원
                </div>
                <div
                  className={`${
                    regionValue === "부산"
                      ? `${styles.region_select} ${styles.region_on}`
                      : `${styles.region_select}`
                  }`}
                  onClick={regionChangeHandler}
                >
                  부산
                </div>
                <div
                  className={`${
                    regionValue === "인천"
                      ? `${styles.region_select} ${styles.region_on}`
                      : `${styles.region_select}`
                  }`}
                  onClick={regionChangeHandler}
                >
                  인천
                </div>
                <div
                  className={`${
                    regionValue === "충남"
                      ? `${styles.region_select} ${styles.region_on}`
                      : `${styles.region_select}`
                  }`}
                  onClick={regionChangeHandler}
                >
                  충남
                </div>
                <div
                  className={`${
                    regionValue === "충북"
                      ? `${styles.region_select} ${styles.region_on}`
                      : `${styles.region_select}`
                  }`}
                  onClick={regionChangeHandler}
                >
                  충북
                </div>
                <div
                  className={`${
                    regionValue === "대전"
                      ? `${styles.region_select} ${styles.region_on}`
                      : `${styles.region_select}`
                  }`}
                  onClick={regionChangeHandler}
                >
                  대전
                </div>
                <div
                  className={`${
                    regionValue === "경북"
                      ? `${styles.region_select} ${styles.region_on}`
                      : `${styles.region_select}`
                  }`}
                  onClick={regionChangeHandler}
                >
                  경북
                </div>
                <div
                  className={`${
                    regionValue === "대구"
                      ? `${styles.region_select} ${styles.region_on}`
                      : `${styles.region_select}`
                  }`}
                  onClick={regionChangeHandler}
                >
                  대구
                </div>
                <div
                  className={`${
                    regionValue === "경남"
                      ? `${styles.region_select} ${styles.region_on}`
                      : `${styles.region_select}`
                  }`}
                  onClick={regionChangeHandler}
                >
                  경남
                </div>
                <div
                  className={`${
                    regionValue === "전북"
                      ? `${styles.region_select} ${styles.region_on}`
                      : `${styles.region_select}`
                  }`}
                  onClick={regionChangeHandler}
                >
                  전북
                </div>
                <div
                  className={`${
                    regionValue === "전남"
                      ? `${styles.region_select} ${styles.region_on}`
                      : `${styles.region_select}`
                  }`}
                  onClick={regionChangeHandler}
                >
                  전남
                </div>
                <div
                  className={`${
                    regionValue === "광주"
                      ? `${styles.region_select} ${styles.region_on}`
                      : `${styles.region_select}`
                  }`}
                  onClick={regionChangeHandler}
                >
                  광주
                </div>
                <div
                  className={`${
                    regionValue === "울산"
                      ? `${styles.region_select} ${styles.region_on}`
                      : `${styles.region_select}`
                  }`}
                  onClick={regionChangeHandler}
                >
                  울산
                </div>
                <div
                  className={`${
                    regionValue === "제주"
                      ? `${styles.region_select} ${styles.region_on}`
                      : `${styles.region_select}`
                  }`}
                  onClick={regionChangeHandler}
                >
                  제주
                </div>
              </section>

              <section className={styles.program_list}>
                {resultAreaList.map((item) => (
                  <AreaItem
                    key={item.idx}
                    item={item}
                    programList={programList}
                  />
                ))}
              </section>
            </section>
          ) : (
            <section className={styles.theme_main}>
              {themeList.map((theme) => (
                <section
                  key={theme.idx}
                  className={styles.theme_content_container}
                >
                  <div className={styles.theme_content_top}>
                    <div className={styles.theme_title_container}>
                      <span className={styles.theme_title}>{theme.title}</span>
                      <span className={styles.theme_subtitle}>
                        {theme.subtitle}
                      </span>
                    </div>
                    <button
                      className={styles.theme_show_all_button}
                      value={theme.title}
                    >
                      더보기
                    </button>
                  </div>
                  <div className={styles.theme_slick_container}>
                    <ProgramsThemeSlick
                      viewItems={programList}
                      areaList={areaList}
                    />
                  </div>
                </section>
              ))}
            </section>
          )}
        </section>
      </section>
    </section>
  );
};

export default Programs;
