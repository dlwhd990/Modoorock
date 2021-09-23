import React from "react";
import styles from "./mainpage.module.css";

const Mainpage = (props) => {
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
          <div className={styles.service_desc}>회사서비스 이미지</div>
          <div className={styles.service_desc}>회사서비스 이미지</div>
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

export default Mainpage;
