import React from "react";
import styles from "./aboutUs.module.css";

const AboutUs = (props) => {
  return (
    <section className={styles.mainpage}>
      <section className={styles.about_us_container}>
        <p className={styles.about_us_title}>ABOUT US</p>
        <div className={styles.about_us_desc_container}>
          <p className={styles.about_us_desc}>
            모두락은 기존 관광지를 "관광게이미피케이션"을 결합하여 재 창조 하는
            미션 투어 전문 기업 입니다. 모두락은 기존 관광지를
            "관광게이미피케이션"을 결합하여 재 창조 하는 미션 투어 전문 기업
            입니다.
          </p>
        </div>
      </section>
      <section className={styles.service_container}>
        <p className={styles.service_title}>Programs</p>
        <div className={styles.service_desc_container}>
          <div className={styles.service_desc}>
            <img
              src="https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp"
              alt="service_image"
              className={styles.service_image}
            />
          </div>
          <div className={styles.service_desc}>
            <img
              src="https://static.wixstatic.com/media/9e9163_20a2771344e84a0c8f1aede2d17b64c9~mv2.png/v1/fill/w_715,h_518,al_c,lg_1,q_90/%EB%98%90%EB%B7%B0_PNG.webp"
              alt="service_image"
              className={styles.service_image}
            />
          </div>
        </div>
      </section>
      <section className={styles.history_container}>
        <p className={styles.history_title}>MODOOROCK HISTORY</p>
        <p className={styles.history_content}>예정</p>
      </section>
      <section className={styles.partner_companies_container}>
        <p className={styles.partner_companies_title}>PARTNERS</p>
        <div className={styles.partner_companies_list}>여기에 로고</div>
      </section>
      <section className={styles.company_location_container}>
        <p className={styles.company_location_title}>LOCATION</p>
        <div className={styles.company_location}>
          <p>여기에 회사 위치 이미지</p>
        </div>
      </section>
    </section>
  );
};

export default AboutUs;
