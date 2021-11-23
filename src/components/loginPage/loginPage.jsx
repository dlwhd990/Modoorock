import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LoadingSpinnerWhite from "../loadingSpinner/loadingSpinnerWhite/loadingSpinnerWhite";
import styles from "./loginPage.module.css";

axios.defaults.withCredentials = true;

const { Kakao } = window;

const loginWithKakao = () => {
  Kakao.Auth.authorize({
    redirectUri: "https://localhost:3000/modoorock/kakaoredirect",
  });
};

const LoginPage = () => {
  const history = useHistory();
  const [loadingOn, setLoadingOn] = useState(false);
  const [idSave, setIdSave] = useState(() => {
    if (localStorage.getItem("id")) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      setInputValues({
        ...inputValues,
        id,
      });
    }
  }, []);

  const [inputValues, setInputValues] = useState({
    id: "",
    pw: "",
  });

  const { id, pw } = inputValues;

  const idSaveHandler = (e) => {
    setIdSave(!idSave);
  };

  const inputValueChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const refresh = () => {
    window.location.href = "/modoorock";
    return;
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    if (id === "" || pw === "") {
      window.alert("아이디와 비밀번호를 입력해주세요");
      return;
    }

    setLoadingOn(true);

    await axios
      .post(
        `${process.env.REACT_APP_BASEURL}/user/login`,
        {
          id,
          password: pw,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data === "loggedin") {
          idSave && localStorage.setItem("id", id);
          !idSave && localStorage.removeItem("id");
          window.alert("로그인 되었습니다.");
          refresh();
        } else {
          window.alert("아이디와 비밀번호를 다시 확인해주세요");
        }
        setLoadingOn(false);
      })
      .catch((err) => {
        setLoadingOn(false);
        console.error(err);
      });
  };

  return (
    <section className={styles.login_page}>
      <section className={styles.container}>
        <p className={styles.title}>회원로그인</p>
        <form className={styles.main}>
          <div className={styles.input_container}>
            <input
              name="id"
              onChange={inputValueChangeHandler}
              value={id}
              type="text"
              className={styles.input}
              placeholder="아이디"
              spellCheck="false"
            />
            <input
              name="pw"
              onChange={inputValueChangeHandler}
              value={pw}
              type="password"
              className={styles.input}
              placeholder="비밀번호"
              spellCheck="false"
            />
          </div>
          <button className={styles.submit_button} onClick={loginSubmitHandler}>
            {loadingOn ? <LoadingSpinnerWhite /> : "로그인"}
          </button>
        </form>
        <div className={styles.id_save_find_container}>
          <div className={styles.id_save_container}>
            <input
              type="checkbox"
              checked={idSave}
              onChange={idSaveHandler}
              className={styles.id_save_checkbox}
            />
            <span className={styles.id_save_text}>아이디 저장</span>
          </div>
          <div className={styles.id_pw_find_container}>
            <button
              className={`${styles.id_pw_find_button} ${styles.left}`}
              onClick={() => {
                history.push("/find");
              }}
            >
              아이디찾기
            </button>
            |
            <button
              className={styles.id_pw_find_button}
              onClick={() => {
                history.push("/find");
              }}
            >
              비밀번호찾기
            </button>
          </div>
        </div>
        <div className={styles.sns_login_container}>
          <a id="custom-login-btn" onClick={loginWithKakao}>
            <img
              alt="Kakao"
              src="/modoorock/images/kakao_login_medium_narrow.png"
              className={styles.kakao}
            />
          </a>
          <a id="custom-login-btn" onClick={loginWithKakao}>
            <img
              alt="Kakao"
              src="/modoorock/images/kakao_login_medium_narrow.png"
              className={styles.kakao}
            />
          </a>
        </div>
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
