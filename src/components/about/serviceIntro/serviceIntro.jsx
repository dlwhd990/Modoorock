import styles from "./serviceIntro.module.css";
import { useHistory } from "react-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ServiceVideo from "../../slick/serviceVideo/serviceVideo";

const ServiceIntro = ({ viewItems }) => {
  const history = useHistory();
  return (
    <section className={styles.service_intro}>
      <h1 className={styles.title}>서비스 소개</h1>
      <div className={styles.route_button_container}>
        <div
          className={styles.home_icon_container}
          onClick={() => {
            history.push("/");
            window.scrollTo({ top: 0 });
          }}
        >
          <i className={`${styles.home_icon} fas fa-home`}></i>
        </div>

        <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>
        <p
          className={styles.route_button}
          onClick={() => {
            history.push("/introduce/about");
            window.scrollTo({ top: 0 });
          }}
        >
          소개
        </p>
        <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>
        <p
          className={styles.route_button}
          onClick={() => {
            history.push("/introduce/about");
            window.scrollTo({ top: 0 });
          }}
        >
          서비스 소개
        </p>
      </div>
      <section className={styles.our_service_container}>
        <p className={styles.our_service_title}>OUR SERVICES</p>
        <p className={styles.our_service_subtitle}>모두락의 주요 서비스 소개</p>
        <div className={styles.our_service_content_container}>
          <div className={styles.service_content_left}>
            <div className={styles.filter}></div>
            <p className={styles.content_top_text}>TRAVEL</p>
            <div className={styles.content_bottom_text_container}>
              <p className={styles.content_title}>여행 가이드와 함께</p>
              <p className={styles.content_desc}>
                모두락의 가이드와 함께 여행을 즐겨보세요
              </p>
            </div>
          </div>
          <div className={styles.service_content_right}>
            <div className={styles.filter}></div>
            <p className={styles.content_top_text}>GAME</p>
            <div className={styles.content_bottom_text_container}>
              <p className={styles.content_title}>게임과 함께</p>
              <p className={styles.content_desc}>
                게임과 함께 더 재밌게 여행하세요 (사진은 변경예정)
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.video_container}>
        <p className={styles.video_container_title}>MISSION TOUR</p>
        <p className={styles.video_container_subtitle}>
          모두락 미션투어 소개영상
        </p>
        <div className={styles.video_main}>
          <ServiceVideo viewItems={viewItems} />
        </div>
      </section>
    </section>
  );
};

export default ServiceIntro;
