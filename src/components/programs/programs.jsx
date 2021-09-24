import React, { useEffect, useRef, useState } from "react";
import ProgramItem from "./programItem/programItem";
import styles from "./programs.module.css";
import { debounce } from "lodash";

const Programs = (props) => {
  const inputRef = useRef();
  const [programList, setProgramList] = useState([
    {
      id: 0,
      image_url:
        "https://static.wixstatic.com/media/9e9163_dc64f2b4cbc941a5b6dd2a01ff9ac565~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_013.webp",
      title: "포켓동물원",
      subtitle: "전설의 동물을 찾아라!",
      location: "[과천 - 서울대공원]",
    },
    {
      id: 1,
      image_url:
        "https://static.wixstatic.com/media/9e9163_1ea9c918e2104ccb89214c92a219e3e6~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_014.webp",
      title: "캠프통 스튜디오",
      subtitle: "압구정 카페 캠프통",
      location: "[압구정 - 캠프통 카페]",
    },
    {
      id: 2,
      image_url:
        "https://static.wixstatic.com/media/9e9163_65f96fc9a5b44f2db81195bf369909a6~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_010.webp",
      title: "어바웃타임",
      subtitle: "시간약탈자를 찾아서",
      location: "[합천 - 드라마 세트장]",
    },
    {
      id: 3,
      image_url:
        "https://static.wixstatic.com/media/9e9163_dc64f2b4cbc941a5b6dd2a01ff9ac565~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_013.webp",
      title: "포켓동물원",
      subtitle: "전설의 동물을 찾아라!",
      location: "[과천 - 서울대공원]",
    },
    {
      id: 4,
      image_url:
        "https://static.wixstatic.com/media/9e9163_1ea9c918e2104ccb89214c92a219e3e6~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_014.webp",
      title: "캠프통 스튜디오",
      subtitle: "압구정 카페 캠프통",
      location: "[압구정 - 캠프통 카페]",
    },
    {
      id: 5,
      image_url:
        "https://static.wixstatic.com/media/9e9163_65f96fc9a5b44f2db81195bf369909a6~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_010.webp",
      title: "어바웃타임",
      subtitle: "시간약탈자를 찾아서",
      location: "[합천 - 드라마 세트장]",
    },
  ]);
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
