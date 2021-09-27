import React, { useState } from "react";
import styles from "./findId.module.css";

const FindId = (props) => {
  const [authMethod, setAuthMethod] = useState("핸드폰번호");

  const radioCheckHandler = (e) => {
    setAuthMethod(e.target.value);
  };

  return (
    <section className={styles.find_id}>
      <form className={styles.find_id_form}>
        <p className={styles.find_id_title}>아이디 찾기</p>
        <div className={styles.name_input_container}>
          <p className={styles.name_input_text}>이름</p>
          <input type="text" className={styles.name_input} />
        </div>
        <div className={styles.method_select_container}>
          <p className={styles.method_select_text}>인증 방식</p>
          <input
            type="radio"
            name="method_select_input"
            className={styles.method_select_input}
            value="핸드폰번호"
            checked={authMethod === "핸드폰번호" ? true : false}
            onChange={radioCheckHandler}
          />
          SMS인증
          <input
            type="radio"
            name="method_select_input"
            className={`${styles.method_select_input} ${styles.method_select_input_right}`}
            value="이메일"
            checked={authMethod === "핸드폰번호" ? false : true}
            onChange={radioCheckHandler}
          />
          이메일인증
        </div>
        <div className={styles.method_data_container}>
          <p className={styles.method_data_text}>{authMethod}</p>
          <input type="text" className={styles.method_data_input} />
        </div>
      </form>
    </section>
  );
};

export default FindId;
