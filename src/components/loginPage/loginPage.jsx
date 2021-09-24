import React from "react";
import { useHistory } from "react-router";
import styles from "./loginPage.module.css";

const LoginPage = (props) => {
  const history = useHistory();
  return (
    <section className={styles.login_page}>
      <section className={styles.container}>
        <p className={styles.title}>회원로그인</p>
        <div className={styles.main}>
          <div className={styles.input_container}>
            <input
              type="text"
              className={styles.input}
              placeholder="아이디"
              spellCheck="false"
            />
            <input
              type="password"
              className={styles.input}
              placeholder="비밀번호"
              spellCheck="false"
            />
          </div>
          <button className={styles.submit_button}>로그인</button>
        </div>
        <div className={styles.id_save_find_container}>
          <div className={styles.id_save_container}>
            <input type="checkbox" className={styles.id_save_checkbox} />
            <span className={styles.id_save_text}>아이디 저장</span>
          </div>
          <div className={styles.id_pw_find_container}>
            <button className={`${styles.id_pw_find_button} ${styles.left}`}>
              아이디찾기
            </button>
            <button className={styles.id_pw_find_button}>비밀번호찾기</button>
          </div>
        </div>
        <div className={styles.sns_login_container}></div>
        <div className={styles.signup_container}>
          <span className={styles.signup_message}>
            회원가입을 하시면 다양하고 특별한 혜택이 준비되어 있습니다.
          </span>
          <button
            className={styles.go_signup_button}
            onClick={() => {
              history.push("/signup");
              window.scrollTo({ top: 0 });
            }}
          >
            회원가입
          </button>
        </div>
      </section>
    </section>
  );
};

export default LoginPage;
