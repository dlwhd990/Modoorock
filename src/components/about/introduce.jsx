import React from "react";
import { useHistory, useParams } from "react-router";
import styles from "./introduce.module.css";
import AboutUs from "./aboutUs/aboutUs";
import ServiceIntro from "./serviceIntro/serviceIntro";

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
