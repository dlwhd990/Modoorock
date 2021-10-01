import React from "react";
import styles from "./aboutUs.module.css";

const AboutUs = (props) => {
  return (
    <section className={styles.about_us}>
      <section className={styles.about_us_container}>
        <h1 className={styles.title}>회사소개</h1>
        <div className={styles.route_button_container}>
          <i className={`${styles.home_icon} fas fa-home`}></i>
          <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>
          <p className={styles.route_button}>소개</p>
          <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>
          <p className={styles.route_button}>회사소개</p>
        </div>

        <section className={styles.about_us_main_container}>
          <div className={styles.about_us_main}>
            <div className={styles.about_us_main_image_container}>
              <img
                src="/Modoorock/images/about_us_main_image.png"
                alt="main_image"
                className={styles.about_us_main_image}
              />
              <img
                src="/Modoorock/images/about_middle_circle.png"
                alt=""
                className={styles.about_us_main_circle}
              />
            </div>
            <div className={styles.about_us_main_intro_container}>
              <p className={styles.about_us_main_intro}>
                모두락은 기존 관광지를
              </p>
              <p className={`${styles.about_us_main_intro} ${styles.blue}`}>
                "관광게이미피케이션"을 결합하여 재 창조하는
              </p>
              <p className={styles.about_us_main_intro}>
                미션 투어 전문 기업입니다.
              </p>
              <div className={styles.short_divide_line}></div>
              <p className={styles.about_us_main_intro_desc}>
                시설/콘텐츠의 과잉 투자, 기존 밋밋한 관광 자원에 게임화를
                결합하여 <br></br> 재미있고 액티비티 체험이 가능한 고부가가치
                관광 자원으로 재 탄생 시키고자 합니다.
              </p>
              <p className={styles.about_us_main_intro_desc}>
                여행의 재미 문제 해결을 위해 ‘런닝맨’, ‘1박2일’ 과 같은 인기
                방송프로그램에 융합된<br></br>게이미피케이션(게임화)을
                효과적으로 결합하여 관광산업에 활력을 불어넣고자 합니다.
              </p>
              <p className={styles.about_us_main_intro_desc}>
                국내외 관광객의 이용 편리성을 높이기 위해 ICT를 도구로 사용하며,
                <br></br>이용만족도를 높이기 위해 미션가이드를 투입하여 일자리
                창출에 기여 합니다.
              </p>
              <p className={styles.about_us_main_intro_desc}>
                즐길거리+체험거리+먹거리 등을 결합하여 고부가가치 상품화 및
                지속적인 운영을 목적으로 합니다.
              </p>
            </div>
          </div>
          <div className={styles.about_us_main_history_container}>
            <h1 className={styles.about_us_main_history_title}>MODOOROCK</h1>
            <h1 className={styles.about_us_main_history_title}>HISTORY</h1>
            <div className={styles.short_divide_line_white}></div>
            <div className={styles.about_us_main_history_content_container}>
              <div className={styles.about_us_main_history_content}>
                <div
                  className={
                    styles.about_us_main_history_content_text_container
                  }
                >
                  <p className={styles.about_us_main_history_content_title}>
                    2015
                  </p>
                  <p className={styles.about_us_main_history_content_text}>
                    서울시 북촌한옥마을 IoT 실증 (도심관광활성화 분야) 지원 사업
                    선정
                  </p>
                </div>
                <div
                  className={`${styles.about_us_main_history_content_text_container} ${styles.long}`}
                >
                  <p className={styles.about_us_main_history_content_title}>
                    2016
                  </p>
                  <p className={styles.about_us_main_history_content_text}>
                    한국글로벌비즈협도조한 MOU 체결 ('또뷰' IoT 스마트 앨범사업)
                    <br></br>
                    마포구 외국인 팸투어 미션팜 & 또뷰 플랫폼 지원<br></br>
                    예산 윤봉길의사 매헌학교 체험관광 게이미피케이션<br></br>
                    미션팜 & 또뷰 플랫폼 공급<br></br>
                    수제화 명장 전태수 작가 MOU체결 ('Q-mode' 객체광고사업)
                    <br></br>
                    서울시 자치구 IoT확대사업 참여 추진 (서대문구청, 마포구청
                    <br></br>
                    백화마을 6차산업 체험관광 게이미피케이션 미션팜&또뷰
                    플랫폼공급
                  </p>
                </div>
                <div
                  className={
                    styles.about_us_main_history_content_text_container
                  }
                >
                  <p className={styles.about_us_main_history_content_title}>
                    2017
                  </p>
                  <p className={styles.about_us_main_history_content_text}>
                    관광게이미피케이션 ' 북촌런닝맨' 패키지 체험관광상품 런칭
                  </p>
                </div>
              </div>
              <div className={styles.about_us_main_history_content}>
                <div
                  className={
                    styles.about_us_main_history_content_text_container
                  }
                >
                  <p className={styles.about_us_main_history_content_title}>
                    2018
                  </p>
                  <p className={styles.about_us_main_history_content_text}>
                    KTO, 관광벤처기업 지정
                  </p>
                </div>
                <div
                  className={`${styles.about_us_main_history_content_text_container} ${styles.long}`}
                >
                  <p className={styles.about_us_main_history_content_title}>
                    2019
                  </p>
                  <p className={styles.about_us_main_history_content_text}>
                    KTO, MICE 육성기업 선정<br></br>
                    문화체육관광부 DMZ투어 개발 <br></br>
                    '남산골 런닝맨' 직영 <br></br>
                    '청계천 진로체험' 운영 <br></br>
                    수원 '전통시장' 미션투어 체험상품 개발 및 운영
                  </p>
                </div>
                <div
                  className={
                    styles.about_us_main_history_content_text_container
                  }
                >
                  <p className={styles.about_us_main_history_content_title}>
                    2020
                  </p>
                  <p className={styles.about_us_main_history_content_text}>
                    할로윈 축제 비대면 미션투어 개발 및 운영<br></br>
                    생태관광거점 미션투어 상품 개발
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.about_us_partners_container}>
          <h1 className={styles.about_us_partners_title}>PARTNERS</h1>
          <p className={styles.about_us_partners_subtitle}>
            모두락과 함께하는 파트너입니다.
          </p>
          <div className={styles.short_divide_line_under_title}></div>
          <div className={styles.about_us_partners_image_container}>
            <div className={styles.about_us_partners_image_four_div}>
              {" "}
              <div className={styles.about_us_partners_image_box}>
                <img
                  src="/Modoorock/images/about_partners_1.png"
                  alt="partners_image"
                  className={styles.about_us_partners_image}
                />
                <img
                  src="/Modoorock/images/about_partners_2.png"
                  alt="partners_image"
                  className={styles.about_us_partners_image}
                />
              </div>
              <div className={styles.about_us_partners_image_box}>
                <img
                  src="/Modoorock/images/about_partners_3.png"
                  alt="partners_image"
                  className={styles.about_us_partners_image}
                />
                <img
                  src="/Modoorock/images/about_partners_4.png"
                  alt="partners_image"
                  className={styles.about_us_partners_image}
                />
              </div>
            </div>
            <div className={styles.about_us_partners_image_four_div}>
              <div className={styles.about_us_partners_image_box}>
                <img
                  src="/Modoorock/images/about_partners_5.png"
                  alt="partners_image"
                  className={styles.about_us_partners_image}
                />
                <img
                  src="/Modoorock/images/about_partners_6.png"
                  alt="partners_image"
                  className={styles.about_us_partners_image}
                />
              </div>
              <div className={styles.about_us_partners_image_box}>
                <img
                  src="/Modoorock/images/about_partners_7.png"
                  alt="partners_image"
                  className={styles.about_us_partners_image}
                />
                <img
                  src="/Modoorock/images/about_partners_8.png"
                  alt="partners_image"
                  className={styles.about_us_partners_image}
                />
              </div>
            </div>
          </div>
        </section>
        <section className={styles.about_us_map_container}>
          <h1 className={styles.about_us_map_title}>ADDRESS MAP</h1>
          <p className={styles.about_us_map_subtitle}>오시는 길</p>
          <div className={styles.short_divide_line_under_title}></div>
          <img
            src="/Modoorock/images/about_map.png"
            alt="partners_image"
            className={styles.about_us_map_image}
          />
        </section>
      </section>
    </section>
  );
};

export default AboutUs;
