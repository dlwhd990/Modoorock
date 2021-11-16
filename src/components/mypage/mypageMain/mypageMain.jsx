import React, { useEffect, useState } from "react";
import styles from "./mypageMain.module.css";
import axios from "axios";

const MypageMain = ({ user, sessionCheck }) => {
  const [inputValues, setInputValues] = useState({
    pw: "",
    newPw: "",
    newPwConfirm: "",
    name: "",
    phone: "",
    authNum: "",
  });

  const { pw, newPw, newPwConfirm, name, phone, authNum } = inputValues;

  const inputValueChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const onPasswordChangeHandler = () => {
    //암호화된 패스워드와 사용자가 입력한 패스워드가 일치하는지 확인하는 과정 필요
    if (newPw !== newPwConfirm) {
      window.alert("새로운 비밀번호와 확인이 일치하지 않습니다.");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/modifyinfo`, {
        id: user.id,
        phone: user.phone,
        password: newPw,
      })
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  const onSmsHandler = () => {
    //보류
  };

  const onPhoneChangeHandler = () => {
    //비밀번호를 보내야 한다면 원래 비밀번호는 암호화되어있어 모르기 때문에 문제생김
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/modifyinfo`, {
        id: user.id,
        phone,
        password: "dww",
      })
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    sessionCheck();
    setInputValues({
      ...inputValues,
      name: user.name,
      phone: user.phone,
    });
  }, []);
  return (
    <section className={styles.mypage_main}>
      <div className={styles.top}>
        <img
          src="/modoorock/images/profile_default.png"
          alt="profile"
          className={styles.profile_image}
        />
        <div className={styles.name_and_point}>
          <p className={styles.name}>{`${user.id} 님`}</p>
          <p className={styles.point}>{`보유 포인트: ${user.totalPoint}점`}</p>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.input_container}>
          <p className={styles.input_title}>이름</p>
          <input
            name="name"
            onChange={inputValueChangeHandler}
            value={name}
            type="text"
            className={styles.input}
            spellCheck="false"
            placeholder="이름"
            disabled="disabled"
          />
        </div>
        <div className={styles.input_container}>
          <p className={styles.input_title}>비밀번호</p>
          <input
            name="pw"
            onChange={inputValueChangeHandler}
            value={pw}
            type="password"
            className={styles.input}
            spellCheck="false"
            placeholder="비밀번호"
          />
          <p className={styles.input_title}>새로운 비밀번호</p>
          <input
            name="newPw"
            onChange={inputValueChangeHandler}
            value={newPw}
            type="password"
            className={styles.input}
            spellCheck="false"
            placeholder="새로운 비밀번호"
          />
          <p className={styles.input_title}>새로운 비밀번호 확인</p>

          <div className={styles.button_and_input}>
            <input
              name="newPwConfirm"
              onChange={inputValueChangeHandler}
              value={newPwConfirm}
              type="password"
              className={styles.input_short}
              spellCheck="false"
              placeholder="새로운 비밀번호 확인"
            />
            <button className={styles.button}>비밀번호 변경</button>
          </div>
        </div>

        <div className={styles.input_container}>
          <p className={styles.input_title}>핸드폰번호</p>

          <div className={styles.button_and_input}>
            <input
              name="phone"
              onChange={inputValueChangeHandler}
              value={phone}
              type="text"
              className={styles.input_short}
              spellCheck="false"
              placeholder="핸드폰번호"
            />
            <button className={styles.button}>인증번호 받기</button>
          </div>
        </div>
        <div className={styles.input_container}>
          <p className={styles.input_title}>인증번호</p>

          <div className={styles.button_and_input}>
            <input
              name="authNum"
              onChange={inputValueChangeHandler}
              value={authNum}
              type="text"
              className={styles.input_short}
              spellCheck="false"
              placeholder="인증번호"
            />
            <button className={styles.button}>인증 후 변경</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MypageMain;
