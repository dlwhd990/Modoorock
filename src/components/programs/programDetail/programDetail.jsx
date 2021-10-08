import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import CustomPaging from "../../slick/customPaging/customPaging";
import styles from "./programDetail.module.css";
import StarRatingComponent from "react-star-rating-component";

//별점 넣는법 알아오기
// 이미지 확대 시킬건지 (작으면 설명 잘 안보이니까)
const ProgramDetail = ({ programList }) => {
  const [program, setProgram] = useState(null);
  const history = useHistory();
  const { path } = useParams();

  const onSelectHandler = (e) => {
    if (e.currentTarget.innerText === "프로그램 소개") {
      window.location.reload();
    }
  };

  useEffect(() => {
    programList.forEach((item) => {
      item.idx === parseInt(path) && setProgram(item);
    });
  }, []);

  return (
    <section className={styles.program_detail}>
      <section className={styles.top_banner}></section>
      <section className={styles.select_bar_container}>
        <div
          className={`${styles.select_button} ${styles.on}`}
          onClick={onSelectHandler}
        >
          프로그램 소개
        </div>
      </section>
      <h1 className={styles.title}>프로그램 상세</h1>
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
            history.push("/contact");

            window.scrollTo({ top: 0 });
          }}
        >
          프로그램 소개
        </p>
        <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>

        <p
          className={styles.route_button}
          onClick={() => {
            history.push("/contact");

            window.scrollTo({ top: 0 });
          }}
        >
          프로그램 상세
        </p>
      </div>
      <section className={styles.program_detail_main}>
        <div className={styles.image_container}>
          <CustomPaging />
        </div>
        <div className={styles.text_container}>
          <div className={styles.text_data_box}>
            <p className={styles.title}>{program && program.title}</p>
            <div className={styles.review_container}>
              <StarRatingComponent
                name="rate2"
                editing={false}
                starCount={5}
                value={4.7}
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProgramDetail;
