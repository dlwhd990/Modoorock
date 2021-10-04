import React, { useEffect, useState } from "react";
import ProgramItem from "./programItem/programItem";
import { useHistory } from "react-router-dom";
import styles from "./programs.module.css";
import { debounce } from "lodash";

const Programs = ({ programList }) => {
  const history = useHistory();
  const [inputValue, setInputValue] = useState("");
  const [resultProgramList, setResultProgramList] = useState([]);

  const onSelectHandler = (e) => {
    if (e.currentTarget.innerText === "프로그램") {
      history.push("/programs");
    }
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

  return (
    <section className={styles.programs}>
      <section className={styles.programs_top_banner}></section>
      <section className={styles.select_bar_container}>
        <div
          className={`${styles.select_button} ${styles.on}`}
          onClick={onSelectHandler}
        >
          프로그램
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
              history.push("/introduce/about");
              window.scrollTo({ top: 0 });
            }}
          >
            프로그램
          </p>
          <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>
          <p
            className={styles.route_button}
            onClick={() => {
              history.push("/introduce/about");
              window.scrollTo({ top: 0 });
            }}
          >
            프로그램 소개
          </p>
        </div>
        <div className={styles.search_container}>
          <input
            type="text"
            className={styles.search_input}
            onChange={inputChangeHandler}
            placeholder="찾으시는 상품을 검색해보세요"
            spellCheck="false"
          />
          <i className={`${styles.search_icon} fas fa-search`}></i>
        </div>

        <section className={styles.program_list}>
          {resultProgramList.map((item) => (
            <ProgramItem key={item.idx} item={item} />
          ))}
        </section>
      </section>
    </section>
  );
};

export default Programs;
