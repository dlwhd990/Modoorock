import React from "react";
import CustomPaging from "../../slick/customPaging/customPaging";
import styles from "./programDetail.module.css";

//별점 넣는법 알아오기
// 이미지 확대 시킬건지 (작으면 설명 잘 안보이니까)
const ProgramDetail = ({ item }) => {
  return (
    <section className={styles.program_detail}>
      <div className={styles.image_container}>
        <CustomPaging />
      </div>
      <div className={styles.text_container}>
        <div className={styles.text_data_box}>
          <p className={styles.title}>{item.title}</p>
          <div className={styles.review_container}>
            <span>별점&리뷰 보류</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramDetail;
