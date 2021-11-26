import React from "react";
import { useHistory } from "react-router";
import styles from "./payFailPage.module.css";

const PayFailPage = (props) => {
  const history = useHistory();
  //토스 결제 실패 시
  return (
    <section className={styles.pay_fail_page}>
      <div className={styles.container}>
        <i className={`${styles.icon} fas fa-times`}></i>
        <p className={styles.title}>결제실패</p>
        <p className={styles.subtitle}>결제가 취소 또는 실패되었습니다.</p>
        <button
          className={styles.button}
          onClick={() => {
            history.push("/");
            window.scrollTo({ top: 0 });
          }}
        >
          메인으로
        </button>
      </div>
    </section>
  );
};

export default PayFailPage;
