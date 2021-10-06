import React, { useRef } from "react";
import styles from "./signup.module.css";
import axios from "axios";

const Signup = (props) => {
  const signupAgreeRef = useRef();
  const infoCollectionAgreeRef = useRef();
  const idRef = useRef();
  const pwRef = useRef();
  const pwConfirmRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();

  const allAgreeHandler = (e) => {
    if (e.target.checked) {
      signupAgreeRef.current.checked = true;
      infoCollectionAgreeRef.current.checked = true;
    } else {
      signupAgreeRef.current.checked = false;
      infoCollectionAgreeRef.current.checked = false;
    }
  };

  const signupSubmitHandler = (e) => {
    e.preventDefault();
    console.log("clicked");

    if (
      !(
        signupAgreeRef.current.checked && infoCollectionAgreeRef.current.checked
      )
    ) {
      window.alert("약관에 모두 동의하셔야 가입이 가능합니다.");
      return;
    }

    const id = idRef.current.value;
    const password = pwRef.current.value;
    const pwConfirm = pwConfirmRef.current.value;
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;

    if (password !== pwConfirm) {
      window.alert("비밀번호와 비밀번호 확인이 동일하지 않습니다.");
      return;
    }

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "*/*",
    };

    axios
      .post(
        "https://35.239.228.185/modoorock/user/register",
        {
          id,
          password,
          name,
          phone,
        },
        { headers }
      )
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

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
              ref={idRef}
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
              ref={pwRef}
              type="password"
              className={`${styles.input} ${styles.password_input}`}
              placeholder="비밀번호 (영문, 숫자, 특수문자 조합의 8~16자)"
              spellCheck="false"
            />
          </div>
          <div className={styles.input_container}>
            <p className={styles.input_title}>비밀번호 확인</p>
            <input
              ref={pwConfirmRef}
              type="password"
              className={`${styles.input} ${styles.password_confirm_input}`}
              placeholder="비밀번호 확인"
              spellCheck="false"
            />
          </div>
          <div className={styles.input_container}>
            <p className={styles.input_title}>이름</p>
            <input
              ref={nameRef}
              type="text"
              className={`${styles.input} ${styles.name_input}`}
              placeholder="이름"
              spellCheck="false"
            />
          </div>

          <div className={styles.input_container}>
            <p className={styles.input_title}>핸드폰 번호</p>
            <input
              ref={phoneRef}
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
            <input
              type="checkbox"
              className={styles.agree_input}
              onChange={allAgreeHandler}
            />
            <span className={styles.all_agree_desc}>전체 약관 동의</span>
          </div>
          <div className={styles.separate_agree_container}>
            <div
              className={`${styles.separate_agree} ${styles.separate_agree_top}`}
            >
              <input
                ref={signupAgreeRef}
                type="checkbox"
                className={styles.agree_input}
              />
              <span className={styles.agree_desc}>
                회원 가입 및 운영약관 동의 (필수)
              </span>
              <i className={`${styles.icon} fas fa-chevron-right`}></i>
            </div>
            <div
              className={`${styles.separate_agree} ${styles.separate_agree_bottom}`}
            >
              <input
                ref={infoCollectionAgreeRef}
                type="checkbox"
                className={styles.agree_input}
              />
              <span className={styles.agree_desc}>
                개인정보 수집 및 이용 (필수)
              </span>
              <i className={`${styles.icon} fas fa-chevron-right`}></i>
            </div>
          </div>
        </section>
        <button className={styles.submit_button} onClick={signupSubmitHandler}>
          회원가입
        </button>
      </form>
    </section>
  );
};

export default Signup;
