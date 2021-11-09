import React, { useState } from "react";
import styles from "./signup.module.css";
import axios from "axios";

const Signup = (props) => {
  const [checkedPhone, setCheckedPhone] = useState(null);
  const [disable, setDisable] = useState(false);
  const [checkValues, setCheckValues] = useState({
    signupAgree: false,
    infoCollectionAgree: false,
  });

  const [inputValues, setInputValues] = useState({
    id: "",
    pw: "",
    pwConfirm: "",
    name: "",
    phone: "",
    authNum: "",
  });

  const { id, pw, pwConfirm, name, phone, authNum } = inputValues;

  const { signupAgree, infoCollectionAgree } = checkValues;

  const inputValueChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const checkValueChangeHandler = (e) => {
    const { name, checked } = e.target;
    setCheckValues({
      ...checkValues,
      [name]: checked,
    });
  };

  const allAgreeHandler = (e) => {
    if (e.target.checked) {
      setCheckValues({
        signupAgree: true,
        infoCollectionAgree: true,
      });
    } else {
      setCheckValues({
        signupAgree: false,
        infoCollectionAgree: false,
      });
    }
  };

  const sendSmsHandler = () => {
    if (phone === "") {
      window.alert("핸드폰 번호를 먼저 입력해주세요");
      return;
    }
    if (phone.length !== 11) {
      window.alert("핸드폰 번호를 다시 확인해주세요");
      return;
    }
    for (let i = 0; i < phone.length; i++) {
      if (isNaN(parseInt(phone.charAt(i)))) {
        window.alert("숫자만 입력해주세요");
        return;
      }
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/requestsms`, {
        phone,
      })
      .then((response) => window.alert("인증번호가 발송되었습니다."))
      .catch((err) => console.error(err));
  };

  const authNumCheckHandler = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/checksms`, {
        to: phone,
        content: authNum,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("인증이 완료되었습니다.");
          setCheckedPhone(phone);
          setDisable(true);
        }
      });
  };

  const signupSubmitHandler = (e) => {
    e.preventDefault();

    if (!(signupAgree && infoCollectionAgree)) {
      window.alert("약관에 모두 동의하셔야 가입이 가능합니다.");
      return;
    }

    if (
      id.length === 0 ||
      pw.length === 0 ||
      name.length === 0 ||
      phone.length === 0
    ) {
      window.alert("입력되지 않은 정보가 있습니다. 다시 확인해주세요.");
      return;
    }

    if (pw !== pwConfirm) {
      window.alert("비밀번호와 비밀번호 확인이 동일하지 않습니다.");
      return;
    }

    if (!checkedPhone) {
      window.alert("핸드폰 인증이 완료되지 않았습니다.");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/register`, {
        id,
        password: pw,
        name,
        phone: checkedPhone,
      })
      .then((response) => {
        const resData = response.data;
        console.log(resData);
        if (resData === "duplicate") {
          window.alert(
            "아이디 또는 핸드폰 번호가 중복됩니다. 다른 아이디로 회원가입 해주세요"
          ); //두개 나눌 수 있을 지
          return;
        }

        if (resData === "success") {
          window.alert("회원가입이 완료되었습니다. 로그인을 해주세요.");
          window.location.href = "/";
        }
      })
      .catch((error) => console.error(error));
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
              name="id"
              onChange={inputValueChangeHandler}
              value={id}
              type="id"
              className={`${styles.input} ${styles.id_input}`}
              placeholder="아이디 (영문, 숫자 조합의 4~12자리)"
              spellCheck="false"
            />
          </div>
          <div className={styles.input_container}>
            <p className={styles.input_title}>비밀번호</p>
            <input
              name="pw"
              onChange={inputValueChangeHandler}
              value={pw}
              type="password"
              className={`${styles.input} ${styles.password_input}`}
              placeholder="비밀번호 (영문, 숫자, 특수문자 조합의 8~16자)"
              spellCheck="false"
            />
          </div>
          <div className={styles.input_container}>
            <p className={styles.input_title}>비밀번호 확인</p>
            <input
              name="pwConfirm"
              onChange={inputValueChangeHandler}
              value={pwConfirm}
              type="password"
              className={`${styles.input} ${styles.password_confirm_input}`}
              placeholder="비밀번호 확인"
              spellCheck="false"
            />
          </div>
          <div className={styles.input_container}>
            <p className={styles.input_title}>이름</p>
            <input
              name="name"
              onChange={inputValueChangeHandler}
              value={name}
              type="text"
              className={`${styles.input} ${styles.name_input}`}
              placeholder="이름"
              spellCheck="false"
            />
          </div>

          <div className={styles.input_container}>
            <p className={styles.input_title}>핸드폰 번호</p>
            <input
              name="phone"
              onChange={inputValueChangeHandler}
              value={phone}
              type="text"
              className={`${styles.input} ${styles.phone_num_input}`}
              placeholder="핸드폰 번호"
              spellCheck="false"
              disabled={disable}
            />
            <button
              type="button"
              className={styles.get_auth_num_button}
              onClick={sendSmsHandler}
            >
              인증번호 받기
            </button>
          </div>
          <div className={styles.input_container}>
            <p className={styles.input_title}>인증번호</p>
            <input
              name="authNum"
              onChange={inputValueChangeHandler}
              value={authNum}
              type="text"
              className={`${styles.input} ${styles.phone_num_input}`}
              placeholder="인증번호"
              spellCheck="false"
              disabled={disable}
            />
            <button
              type="button"
              className={styles.get_auth_num_button}
              onClick={authNumCheckHandler}
            >
              인증번호 확인
            </button>
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
                name="signupAgree"
                onChange={checkValueChangeHandler}
                value={signupAgree}
                type="checkbox"
                checked={signupAgree}
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
                name="infoCollectionAgree"
                onChange={checkValueChangeHandler}
                value={infoCollectionAgree}
                type="checkbox"
                checked={infoCollectionAgree}
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
