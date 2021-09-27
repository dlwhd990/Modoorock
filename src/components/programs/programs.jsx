import React, { useEffect, useRef, useState } from "react";
import ProgramItem from "./programItem/programItem";
import styles from "./programs.module.css";
import { debounce } from "lodash";

const Programs = ({ programList }) => {
  const [inputValue, setInputValue] = useState("");
  const [resultProgramList, setResultProgramList] = useState([]);

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
      <section className={styles.top_banner}></section>
      <section className={styles.main}>
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
        <div className={styles.content_container}>
          {resultProgramList.map((item) => (
            <ProgramItem key={item.id} program={item} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default Programs;
