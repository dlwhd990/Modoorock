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
    if (e.currentTarget.innerText === "프로그램 상세") {
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
          프로그램 상세
        </div>
      </section>

      <section className={styles.program_detail_main}>
        <div className={styles.image_container}>
          <CustomPaging />
        </div>
        <div className={styles.text_container}>
          <div className={styles.text_data_box}>
            <p className={styles.name}>{program && program.title}</p>
            <p className={styles.price}>
              {program && `${program.price.toLocaleString("ko-KR")}원`}
            </p>
            <div className={styles.rate_container}>
              <div className={styles.star_container}>
                <StarRatingComponent
                  name="star"
                  editing={false}
                  starCount={5}
                  value={program && program.total_rate / program.rate_count}
                />
                <span className={styles.rate_data}>{`${
                  program &&
                  (program.total_rate / program.rate_count).toFixed(1)
                }/5.0`}</span>
              </div>
              <span className={styles.review_count_text}>32개의 리뷰</span>
            </div>
            <p className={styles.content}>{program && program.content}</p>
          </div>
          <div className={styles.button_container}>
            {" "}
            <button className={styles.reservation_button}>예약하기</button>
            <button className={styles.inquire_button}>문의하기</button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProgramDetail;
