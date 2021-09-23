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
      <section className={styles.service_container}>
        <p className={styles.service_title}>Main Services</p>
        <div className={styles.service_desc_container}>
          <div className={styles.service_desc}>
            <img
              src="https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp"
              alt="service_image"
              className={styles.service_image}
            />
            <p className={styles.service_desc_title}>STORE FORM</p>
            <p className={styles.service_desc_subtitle}>
              게이미피케이션이 융합된 문화체험관광
            </p>
            <ul className={styles.service_desc_list}>
              <li className={styles.service_desc_list_item}>
                모두락의 다양한 상품을 만나볼수 있습니다.
              </li>
              <li className={styles.service_desc_list_item}>
                보고, 맛보고, 만들고, 즐기는 문화체험 관광삼품을 제공합니다.
              </li>
              <li className={styles.service_desc_list_item}>
                앱을 통해 특정 코스에서 다양한 미션을 즐길 수
                있습니다(관광+게이미피케이션)
              </li>
            </ul>
          </div>
          <div className={styles.service_desc}>
            <img
              src="https://static.wixstatic.com/media/9e9163_20a2771344e84a0c8f1aede2d17b64c9~mv2.png/v1/fill/w_715,h_518,al_c,lg_1,q_90/%EB%98%90%EB%B7%B0_PNG.webp"
              alt="service_image"
              className={styles.service_image}
            />
            <p className={styles.service_desc_title}>TTO VIEW</p>
            <p className={styles.service_desc_subtitle}>
              IoT 스마트 앨범 포토관광 기념카드
            </p>
            <ul className={styles.service_desc_list}>
              <li className={styles.service_desc_list_item}>
                모두락의 다양한 상품을 만나볼수 있습니다.
              </li>
              <li className={styles.service_desc_list_item}>
                보고, 맛보고, 만들고, 즐기는 문화체험 관광삼품을 제공합니다.
              </li>
              <li className={styles.service_desc_list_item}>
                앱을 통해 특정 코스에서 다양한 미션을 즐길 수
                있습니다(관광+게이미피케이션)
              </li>
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Mainpage;
