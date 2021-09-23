import React from "react";
import styles from "./mainpage.module.css";
// 디자인 확정 전 까지 보류
const Mainpage = (props) => {
  return (
    <section className={styles.mainpage}>
      <section className={styles.about}>
        <p className={styles.about_title}>모두락을 소개합니다</p>
        <p className={styles.about_desc}>
          시설/콘텐츠의 과잉 투자, 기존 밋밋한 관광 자원에 게임화를 결합하여
          재미있고 액티비티 체험이 가능한 고부가가치 관광 자원으로 재 탄생
          시키고자 합니다. 여행의 재미 문제 해결을 위해 ‘런닝맨’, ‘1박2일’ 과
          같은 인기 방송프로그램에 융합된 게이미피케이션(게임화)을 효과적으로
          결합하여 관광산업에 활력을 불어넣고자 합니다. 국내외 관광객의 이용
          편리성을 높이기 위해 ICT를 도구로 사용하며, 이용만족도를 높이기 위해
          미션가이드를 투입하여 일자리 창출에 기여 합니다.
          즐길거리+체험거리+먹거리 등을 결합하여 고부가가치 상품화 및 지속적인
          운영을 목적으로 합니다.
        </p>
      </section>
    </section>
  );
};

export default Mainpage;
