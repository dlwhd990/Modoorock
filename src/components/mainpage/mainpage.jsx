import React from "react";
import SimpleSlider from "../slick/slick";
import styles from "./mainpage.module.css";

const Mainpage = ({ viewItems }) => {
  return (
    <section className={styles.mainpage}>
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
      <section className={styles.program_container}>
        <div className={styles.program_search_container}>
          <input
            type="text"
            className={styles.search_input}
            placeholder="찾고 계신 상품을 검색해주세요."
            spellCheck="false"
          />
          <i className={`${styles.search_icon} fas fa-search`}></i>
        </div>
        <div className={styles.program_list}>
          <SimpleSlider viewItems={viewItems} />
        </div>
      </section>
    </section>
  );
};

export default Mainpage;
