import React from "react";
import SimpleSliderThree from "../slick/three/slickThree";
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
        <div className={styles.program_intro_container}>
          <p className={styles.program_intro_company_name}>MODOOROCK</p>
          <div className={styles.program_intro_title_container}>
            <span className={styles.program_intro_title_blue}>미션투어!</span>
            <span className={styles.program_intro_title}>프로그램 상품</span>
          </div>
          <p className={styles.program_intro_desc}>
            게임화된 투어로 재미있고 액티비티 체험이 가득해요
          </p>
        </div>
        <div className={styles.program_search_container}>
          <input
            type="text"
            className={styles.search_input}
            placeholder="찾고 계신 상품을 검색해주세요."
            spellCheck="false"
          />
          <i className={`${styles.search_icon} fas fa-search`}></i>
        </div>
        <div className={styles.program_list_container}>
          <div className={styles.program_list}>
            <div className={styles.program_item}>
              <img
                src="https://static.wixstatic.com/media/9e9163_dc64f2b4cbc941a5b6dd2a01ff9ac565~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_013.webp"
                alt="program_image"
                className={styles.program_image}
              />
              <div className={styles.program_desc_container}>
                <p className={styles.program_desc}>
                  [월미도]2021 월림픽: 랭킹에 도전하라_★x3
                </p>
                <p className={styles.program_price}>25,000원</p>
              </div>
            </div>
            <div className={styles.program_item}>
              <img
                src="https://static.wixstatic.com/media/9e9163_dc64f2b4cbc941a5b6dd2a01ff9ac565~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_013.webp"
                alt="program_image"
                className={styles.program_image}
              />
              <div className={styles.program_desc_container}>
                <p className={styles.program_desc}>
                  [월미도]2021 월림픽: 랭킹에 도전하라_★x3
                </p>
                <p className={styles.program_price}>25,000원</p>
              </div>
            </div>
            <div className={styles.program_item}>
              <img
                src="https://static.wixstatic.com/media/9e9163_dc64f2b4cbc941a5b6dd2a01ff9ac565~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_013.webp"
                alt="program_image"
                className={styles.program_image}
              />
              <div className={styles.program_desc_container}>
                <p className={styles.program_desc}>
                  [월미도]2021 월림픽: 랭킹에 도전하라_★x3
                </p>
                <p className={styles.program_price}>25,000원</p>
              </div>
            </div>
          </div>
          <div className={styles.program_list}>
            <div className={styles.program_item}>
              <img
                src="https://static.wixstatic.com/media/9e9163_dc64f2b4cbc941a5b6dd2a01ff9ac565~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_013.webp"
                alt="program_image"
                className={styles.program_image}
              />
              <div className={styles.program_desc_container}>
                <p className={styles.program_desc}>
                  [월미도]2021 월림픽: 랭킹에 도전하라_★x3
                </p>
                <p className={styles.program_price}>25,000원</p>
              </div>
            </div>
            <div className={styles.program_item}>
              <img
                src="https://static.wixstatic.com/media/9e9163_dc64f2b4cbc941a5b6dd2a01ff9ac565~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_013.webp"
                alt="program_image"
                className={styles.program_image}
              />
              <div className={styles.program_desc_container}>
                <p className={styles.program_desc}>
                  [월미도]2021 월림픽: 랭킹에 도전하라_★x3
                </p>
                <p className={styles.program_price}>25,000원</p>
              </div>
            </div>
            <div className={styles.program_item}>
              <img
                src="https://static.wixstatic.com/media/9e9163_dc64f2b4cbc941a5b6dd2a01ff9ac565~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_013.webp"
                alt="program_image"
                className={styles.program_image}
              />
              <div className={styles.program_desc_container}>
                <p className={styles.program_desc}>
                  [월미도]2021 월림픽: 랭킹에 도전하라_★x3
                </p>
                <p className={styles.program_price}>25,000원</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.video_top_filter}>
          <p className={styles.video_top_intro_company_name}>MISSION TOUR</p>
          <div className={styles.video_top_intro_title_container}>
            <span className={styles.video_top_intro_title_blue}>미션투어!</span>
            <span className={styles.video_top_intro_title}>홍/보/영/상</span>
          </div>
        </div>
        <div className={styles.video_main_container}>
          <div className={styles.slick_container}>
            <SimpleSliderThree viewItems={viewItems} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Mainpage;
