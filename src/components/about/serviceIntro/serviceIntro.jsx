import React, { useState } from "react";
import styles from "./serviceIntro.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleSliderThree from "../../slick/three/slickThree";

const ServiceIntro = ({ viewItems }) => {
  return (
    <section className={styles.service_intro}>
      <section className={styles.our_service_container}>
        <p className={styles.our_service_title}>OUR SERVICES</p>
        <p className={styles.our_service_subtitle}>모두락의 주요 서비스 소개</p>
        <div className={styles.our_service_content_container}>
          <div className={styles.our_service_content}>
            <img
              src="https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp"
              alt=""
              className={styles.service_image}
            />
            <p className={styles.service_desc}>임시</p>
          </div>
          <div className={styles.our_service_content}>
            <img
              src="https://static.wixstatic.com/media/9e9163_20a2771344e84a0c8f1aede2d17b64c9~mv2.png/v1/fill/w_715,h_518,al_c,lg_1,q_90/%EB%98%90%EB%B7%B0_PNG.webp"
              alt=""
              className={styles.service_image}
            />
            <p className={styles.service_desc}>임시</p>
          </div>
        </div>
      </section>
      <section className={styles.mission_container}>
        <p className={styles.mission_container_title}>MISSION TOUR</p>
        <p className={styles.mission_container_subtitle}>
          모두락 미션투어 홍보영상
        </p>
        <div className={styles.mission_main}>
          <div className={styles.mission_video_container}>
            <SimpleSliderThree viewItems={viewItems} />
          </div>
        </div>

        <a
          href="https://www.youtube.com/channel/UCdTY_FXXLbtdNXXN9H3pXrg"
          className={styles.youtube_a_tag}
        >
          <button className={styles.go_youtube_button}>
            <i className="fab fa-youtube"></i>
            <span className={styles.go_youtube_button_text}>YOUTUBE</span>
          </button>
        </a>
      </section>
    </section>
  );
};

export default ServiceIntro;
