import React from "react";
import SimpleSlider from "../slick/slick";
import styles from "./mainpage.module.css";

const Mainpage = ({ viewItems }) => {
  return (
    <section className={styles.mainpage}>
      <section className={styles.about}>
        <p className={styles.about_title}>모두락을 소개합니다</p>
        <p className={styles.about_desc}>
          시설/콘텐츠의 과잉 투자, 기존 밋밋한 관광 자원에 게임화를 결합하여
          재미있고 액티비티 체험이 가능한 고부가가치 관광 자원으로 재 탄생
          시키고자 합니다. 여행의 재미 문제 해결을 위해 ‘런닝맨’, ‘1박2일’ 과
          같은 인기 방송프로그램에 융합된 게이미피케이션(게임화)을 효과적으로
          결합하여 관광산업에 활력을 불어넣고자 합니다.
        </p>
      </section>
      <section className={styles.event_container}>
        <div className={styles.event_search_container}>
          <input
            type="text"
            className={styles.search_input}
            placeholder="찾고 계신 행사를 검색해주세요."
            spellCheck="false"
          />
          <i className={`${styles.search_icon} fas fa-search`}></i>
        </div>
        <div className={styles.event_list}>
          <SimpleSlider viewItems={viewItems} />
        </div>
      </section>
    </section>
  );
};

export default Mainpage;
