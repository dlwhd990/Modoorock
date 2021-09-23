import React from "react";
import styles from "./footer.module.css";

const Footer = (props) => {
  return (
    <section className={styles.footer}>
      <div className={styles.logo_container}>모두락</div>
      <div className={styles.company_information}>
        <p className={`${styles.information_title} ${styles.info}`}>
          Business Information
        </p>
        <p className={styles.info}>(주)모두락 대표: 김은주</p>
        <p className={styles.info}>
          사업자 등록번호: 147-33-00122 | 통신판매업신고번호: 제
          2021-인천연수구-0085호
        </p>
        <p className={styles.info}>
          상담문의: 010-3126-2457 | 주소: 인천광역시 연수구 센트럴로 263,
          IBS타워 23층 인천관광기업 지원센터
        </p>
        <p className={styles.info}>
          ※부득이한 사정에 의해 확정된 일정이 변경되는 경우 여행자의 사전 동의를
          받습니다.
        </p>
        <p className={styles.info}>
          COPYRIGHT (C)MODOOROCK. ALL RIGHTS RESERVED.
        </p>
      </div>
    </section>
  );
};

export default Footer;
