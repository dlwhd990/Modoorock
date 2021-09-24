import React from "react";
import styles from "./signup.module.css";

const Signup = (props) => {
  return (
    <section className={styles.signup}>
      <form className={styles.signup_form}>
        <div className={styles.signup_title_container}>
          <h1 className={styles.signup_title}>모두락 회원가입</h1>
        </div>

        <section className={styles.input_part}>
          <div className={styles.input_container}>
            <p className={styles.input_title}>아이디</p>
            <input
              type="id"
              className={`${styles.input} ${styles.id_input}`}
              placeholder="아이디 (영문, 숫자 조합의 4~12자리)"
              spellCheck="false"
            />
            <button className={styles.id_redup_check_button}>중복확인</button>
          </div>
          <div className={styles.input_container}>
            <p className={styles.input_title}>비밀번호</p>
            <input
              type="password"
              className={`${styles.input} ${styles.password_input}`}
              placeholder="비밀번호 (영문, 숫자, 특수문자 조합의 8~16자)"
              spellCheck="false"
            />
          </div>
          <div className={styles.input_container}>
            <p className={styles.input_title}>비밀번호 확인</p>
            <input
              type="password"
              className={`${styles.input} ${styles.password_confirm_input}`}
              placeholder="비밀번호 확인"
              spellCheck="false"
            />
          </div>
          <div className={styles.input_container}>
            <p className={styles.input_title}>이름</p>
            <input
              type="text"
              className={`${styles.input} ${styles.name_input}`}
              placeholder="이름"
              spellCheck="false"
            />
          </div>
          <div className={styles.input_container}>
            <p className={styles.input_title}>이메일</p>
            <input
              type="email"
              className={`${styles.input} ${styles.email_input}`}
              placeholder="이메일"
              spellCheck="false"
            />
          </div>
          <div className={styles.input_container}>
            <p className={styles.input_title}>핸드폰 번호</p>
            <input
              type="text"
              className={`${styles.input} ${styles.phone_num_input}`}
              placeholder="핸드폰 번호"
              spellCheck="false"
            />
            <button className={styles.get_auth_num_button}>
              인증번호 받기
            </button>
          </div>
          <div className={styles.input_container}>
            <p className={styles.input_title}>인증번호</p>
            <input
              type="text"
              className={`${styles.input} ${styles.auth_num_input}`}
              placeholder="인증번호"
              spellCheck="false"
            />
          </div>
        </section>
        <section className={styles.agree_part}>
          <div className={styles.all_agree}>
            <input type="checkbox" className={styles.agree_input} />
            <span className={styles.all_agree_desc}>전체 약관 동의</span>
          </div>
          <div className={styles.separate_agree_container}>
            <div
              className={`${styles.separate_agree} ${styles.separate_agree_top}`}
            >
              <input type="checkbox" className={styles.agree_input} />
              <span className={styles.agree_desc}>
                회원 가입 및 운영약관 동의 (필수)
              </span>
              <i className={`${styles.icon} fas fa-chevron-right`}></i>
            </div>
            <div
              className={`${styles.separate_agree} ${styles.separate_agree_bottom}`}
            >
              <input type="checkbox" className={styles.agree_input} />
              <span className={styles.agree_desc}>
                개인정보 수집 및 이용 (필수)
              </span>
              <i className={`${styles.icon} fas fa-chevron-right`}></i>
            </div>
          </div>
        </section>
        <button className={styles.submit_button}>회원가입</button>
      </form>
    </section>
  );
};

export default Signup;
