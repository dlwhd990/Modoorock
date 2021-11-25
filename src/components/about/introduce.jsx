import React from "react";
import { useHistory, useParams } from "react-router-dom";
import styles from "./introduce.module.css";
import AboutUs from "./aboutUs/aboutUs";
import ServiceIntro from "./serviceIntro/serviceIntro";
import HelmetComponent from "../../helmetComponent";

const Introduce = ({ viewItems }) => {
  const history = useHistory();
  const { path } = useParams();

  const onSelectHandler = (e) => {
    if (e.currentTarget.innerText === "회사 소개") {
      history.push("/introduce/about");
    } else {
      history.push("/introduce/service");
    }
  };

  return (
    <section className={styles.introduce}>
      <HelmetComponent
        title="회사소개"
        desc="모두락은 기존 관광지를 관광게이미피케이션을 결합하여 새 창조하는 미션 투어 전문기업입니다."
        url="https://web.modoorock.com/modoorock/introduce/service/"
      />
      <section className={styles.about_us_top_banner}></section>
      <section className={styles.select_bar_container}>
        <div
          className={
            path === "about"
              ? `${styles.select_button} ${styles.on}`
              : `${styles.select_button} ${styles.off}`
          }
          onClick={onSelectHandler}
        >
          회사 소개
        </div>
        <div
          className={
            path === "service"
              ? `${styles.select_button} ${styles.on}`
              : `${styles.select_button} ${styles.off}`
          }
          onClick={onSelectHandler}
        >
          서비스 소개
        </div>
      </section>

      {path === "about" ? (
        <AboutUs />
      ) : path === "service" ? (
        <ServiceIntro viewItems={viewItems} />
      ) : (
        <></>
      )}
    </section>
  );
};
export default Introduce;
