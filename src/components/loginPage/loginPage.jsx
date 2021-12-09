import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import HelmetComponent from "../../helmetComponent";
import LoadingSpinnerWhite from "../loadingSpinner/loadingSpinnerWhite/loadingSpinnerWhite";
import styles from "./loginPage.module.css";

axios.defaults.withCredentials = true;
const { Kakao } = window;

const LoginPage = () => {
  const history = useHistory();
  const [loadingOn, setLoadingOn] = useState(false);
  const [idSave, setIdSave] = useState(() => {
    if (localStorage.getItem("id")) {
      return true;
    }
    return false;
  });

  const adminChecker = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (response.data.idType === 1) {
          history.push("/admin/main");
        } else if (response.data.idType === 2) {
          history.push("/modoorockadmin");
        } else {
          history.push("/");
        }
      });
  };

  const socialLogin = (id, name, email, sns) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/loginsns`, {
        id,
        name,
        email,
        sns,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("회원가입이 완료되었습니다. 다시 로그인 해주세요");
          window.location.href = "/modoorock/login";
        } else if (response.data === "loggedin") {
          adminChecker();
        } else {
          window.alert("에러가 발생했습니다. 새로고침 후에 다시 시도해주세요.");
        }
      })
      .catch((err) => console.error(err));
  };

  const getUserData = async () => {
    Kakao.API.request({
      url: "/v2/user/me",
      success: function (res) {
        socialLogin(
          res.id.toString(),
          res.kakao_account.profile.nickname,
          res.kakao_account.email,
          2
        );
      },
      fail: function (error) {
        //
        window.alert("에러 발생");
      },
    });
  };

  const loginWithKakao = () => {
    if (!Kakao) {
      return;
    }
    //Kakao.Auth.authorize({
    //  redirectUri: "https://localhost:3000/modoorock/kakaoredirect",
    //});
    Kakao.Auth.login({
      success: function (response) {
        Kakao.Auth.setAccessToken(response.access_token);
        getUserData();
      },
      fail: function (response) {
        console.log("fail");
      },
    });
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      setInputValues({
        ...inputValues,
        id,
      });
    }
    if (!Kakao.isInitialized()) {
      Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
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
          adminChecker();
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
      <HelmetComponent
        title="로그인"
        desc="모두락은 기존 관광지를 관광게이미피케이션을 결합하여 새 창조하는 미션 투어 전문기업입니다."
        url="https://web.modoorock.com/modoorock/login"
      />
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
          <div className={styles.sns_login_buttons}>
            <a
              id="custom-login-btn"
              onClick={loginWithKakao}
              className={styles.kakao}
            >
              <img
                className={styles.kakao_image}
                alt="Kakao"
                src="/modoorock/images/kakao_login_medium_narrow.png"
              />
            </a>
            <a
              id="custom-login-btn"
              onClick={loginWithKakao}
              className={styles.kakao}
            >
              <img
                className={styles.kakao_image}
                alt="Kakao"
                src="/modoorock/images/kakao_login_medium_narrow.png"
              />
            </a>
          </div>
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
