import React from "react";
import styles from "./findPw.module.css";

const FindPw = (props) => {
  const findPwHandler = (e) => {
    e.preventDefault();
    console.log("아직");
  };
  return (
    <section className={styles.find_pw}>
      <form className={styles.find_pw_form}>
        <p className={styles.find_pw_title}>비밀번호 찾기</p>
        <div className={styles.main_container}>
          <div className={styles.id_input_container}>
            <p className={styles.id_input_text}>아이디</p>
            <input
              type="text"
              className={styles.id_input}
              placeholder="아이디"
              spellCheck="false"
            />
          </div>

          <div className={styles.phone_num_container}>
            <p className={styles.phone_num_text}>핸드폰번호</p>

            <input
              type="text"
              className={styles.phone_num_input}
              placeholder="핸드폰번호"
              spellCheck="false"
            />
            <button className={styles.get_auth_num_button}>
              인증번호 받기
            </button>
          </div>

          <div className={styles.auth_num_container}>
            <p className={styles.auth_num_text}>인증번호</p>

            <input
              type="text"
              className={styles.auth_num_input}
              placeholder="인증번호"
              spellCheck="false"
            />
            <button className={styles.confirm_auth_num_button}>확인</button>
          </div>
        </div>

        <div className={styles.submit_button_container}>
          <button className={styles.submit_button} onClick={findPwHandler}>
            비밀번호 찾기
          </button>
        </div>
      </form>
    </section>
  );
};

export default FindPw;
