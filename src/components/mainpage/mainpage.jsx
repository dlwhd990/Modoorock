import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import SimpleSliderThree from "../slick/three/slickThree";
import styles from "./mainpage.module.css";
import MainProgramItem from "./mainProgramItem/mainProgramItem";
import { Helmet } from "react-helmet";

const Mainpage = ({ programList, viewItems, getReviewList }) => {
  const history = useHistory();
  const [inputValue, setInputValue] = useState("");
  const [latestSixProgramList, setLatestSixProgramList] = useState([]);

  const onInputValueChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const onSearchHandler = () => {
    window.scrollTo({ top: 0 });
    history.push({
      pathname: `/programs/search/${inputValue}`,
    });
  };

  const goUpButtonHandler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const videoAllShowHandler = () => {
    window.location.href =
      "https://www.youtube.com/channel/UCdTY_FXXLbtdNXXN9H3pXrg";
  };

  const keyHandler = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    onSearchHandler();
  };

  useEffect(() => {
    window.addEventListener("keypress", keyHandler);
    return () => {
      window.removeEventListener("keypress", keyHandler);
    };
  }, [keyHandler]);

  useEffect(() => {
    programList && setLatestSixProgramList(programList.slice(0, 6));
  }, [programList]);

  return (
    <section className={styles.mainpage}>
      <Helmet
        title="모두락"
        desc="모두락은 기존 관광지를 관광게이미피케이션을 결합하여 새 창조하는 미션 투어 전문기업입니다."
        url="https://web.modoorock.com/modoorock"
      />
      <div className={styles.about_filter}></div>
      <section className={styles.about}>
        <p className={styles.about_title}>
          보고, 맛보고, 만들고, <br></br>즐기는 문화 체험 관광
        </p>
        <p className={styles.about_desc}>
          모두락은 기존 관광지를 "관광게이미피케이션"을 결합하여<br></br>새
          창조하는 미션 투어 전문기업입니다.
        </p>
      </section>
      <section className={styles.program_and_video_container}>
        <div className={styles.program_intro_container}>
          <p className={styles.program_intro_title_green}>최근 업데이트 된</p>
          <div className={styles.program_intro_title_container}>
            <div className={styles.program_intro_without_button}>
              <span className={styles.program_intro_title_blue}>미션투어!</span>
              <span className={styles.program_intro_title}>
                액티비티 체험상품
              </span>
            </div>

            <button
              className={styles.program_show_all_button}
              onClick={() => {
                history.push("/programs/theme");
                window.scrollTo({ top: 0 });
              }}
            >
              전체보기
            </button>
          </div>
          <p className={styles.program_intro_desc}>
            게임화된 투어로 재미있고 액티비티 체험이 가득해요
          </p>
        </div>
        <div className={styles.program_search_container}>
          <input
            type="text"
            value={inputValue}
            onChange={onInputValueChangeHandler}
            className={styles.search_input}
            placeholder="찾고 계신 상품을 검색해주세요."
            spellCheck="false"
          />
          <div onClick={onSearchHandler}>
            <i className={`${styles.search_icon} fas fa-search`}></i>
          </div>
        </div>
        <div className={styles.program_list_container}>
          {latestSixProgramList.map((item) => (
            <MainProgramItem
              key={item.idx}
              item={item}
              getReviewList={getReviewList}
            />
          ))}
        </div>
        <div className={styles.video_top_filter}>
          <p className={styles.video_top_intro_title_green}>MISSION TOUR</p>
          <div className={styles.video_top_intro_title_container}>
            <span className={styles.video_top_intro_title_blue}>미션투어!</span>
            <span className={styles.video_top_intro_title}>소/개/영/상</span>
          </div>
        </div>
        <div className={styles.video_main_container}>
          <div className={styles.slick_container}>
            <SimpleSliderThree viewItems={viewItems} />
          </div>
          <div className={styles.go_up_button} onClick={goUpButtonHandler}>
            <i className={`${styles.go_up_icon} fas fa-arrow-up`}></i>
          </div>
          <button
            className={styles.video_show_all_button}
            onClick={videoAllShowHandler}
          >
            전체보기
          </button>
        </div>
      </section>
    </section>
  );
};

export default Mainpage;
