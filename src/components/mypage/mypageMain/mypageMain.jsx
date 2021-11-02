import React, { useEffect, useRef, useState } from "react";
import styles from "./mypageMain.module.css";
import axios from "axios";

const MypageMain = ({ user, sessionCheck }) => {
  const pwRef = useRef();
  const newPwRef = useRef();
  const newPwConfirmRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const authNumRef = useRef();
  const onSubmitHandler = () => {
    const password = pwRef.current.value;
    const newPw = newPwRef.current.value;
    const newPwConfirm = newPwConfirmRef.current.value;

    const phone = phoneRef.current.value;
    const content = authNumRef.current.value;
    //변수갖다쓰기
  };

  const onNameChangeHandler = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/modifyinfo`, {
        id: "dww",
        phone: "01044444444",
        password: "dww",
      })
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    nameRef.current.value = user.name;
    phoneRef.current.value = user.phone;
  }, []);
  return (
    <section className={styles.mypage_main}>
      <div className={styles.top}>
        <img
          src="/Modoorock/images/profile_default.png"
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
            ref={nameRef}
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
            ref={pwRef}
            type="password"
            className={styles.input}
            spellCheck="false"
            placeholder="비밀번호"
          />
          <p className={styles.input_title}>새로운 비밀번호</p>
          <input
            ref={newPwRef}
            type="password"
            className={styles.input}
            spellCheck="false"
            placeholder="새로운 비밀번호"
          />
          <p className={styles.input_title}>새로운 비밀번호 확인</p>

          <div className={styles.button_and_input}>
            <input
              ref={newPwConfirmRef}
              type="password"
              className={styles.input}
              spellCheck="false"
              placeholder="새로운 비밀번호 확인"
            />
            <button className={styles.button} onClick={onNameChangeHandler}>
              비밀번호 변경
            </button>
          </div>
        </div>

        <div className={styles.input_container}>
          <p className={styles.input_title}>핸드폰번호</p>

          <div className={styles.button_and_input}>
            <input
              ref={phoneRef}
              type="text"
              className={styles.input}
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
              ref={authNumRef}
              type="text"
              className={styles.input}
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
