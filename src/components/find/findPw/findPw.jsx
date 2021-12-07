import React, { useState } from "react";
import styles from "./findPw.module.css";
import axios from "axios";
import { useHistory } from "react-router";

const FindPw = (props) => {
  const history = useHistory();
  const [checkedPhone, setCheckedPhone] = useState(null);
  const [disable, setDisable] = useState(false);
  const [inputValues, setInputValues] = useState({
    id: "",
    phone: "",
    authNum: "",
    newPw: "",
    newPwConfirm: "",
  });

  const { id, phone, authNum, newPw, newPwConfirm } = inputValues;

  const inputValueChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
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
      .post(`${process.env.REACT_APP_BASEURL}/user/userphonevalid`, {
        phone,
      })
      .then((response) => {
        if (response.data === "OK") {
          window.alert("회원 내역이 존재하지 않는 번호입니다.");
          return;
        }
        axios
          .post(`${process.env.REACT_APP_BASEURL}/user/requestsms`, {
            phone,
          })
          .then((response) => window.alert("인증번호가 발송되었습니다."))
          .catch((err) => console.error(err));
      })
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
          return;
        }
        window.alert("인증번호가 다릅니다.");
      });
  };

  const findPwHandler = (e) => {
    e.preventDefault();
    if (newPw !== newPwConfirm) {
      window.alert("새 비밀번호와 확인이 일치하지 않습니다.");
      return;
    }
    if (newPw.length < 8 || newPw.length > 16) {
      window.alert("비밀번호는 8~16자여야 합니다.");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/findpassword`, {
        id,
        phone: checkedPhone,
        password: newPw,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("비밀번호가 재설정 되었습니다.");
          history.push("/");
        } else {
          window.alert("아이디가 일치하지 않습니다.");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className={styles.find_pw}>
      <form className={styles.find_pw_form}>
        <p className={styles.find_pw_title}>비밀번호 재설정</p>
        <div className={styles.main_container}>
          <div className={styles.id_input_container}>
            <p className={styles.id_input_text}>아이디</p>
            <input
              name="id"
              onChange={inputValueChangeHandler}
              value={id}
              type="text"
              className={styles.id_input}
              placeholder="아이디"
              spellCheck="false"
            />
          </div>

          <div className={styles.phone_num_container}>
            <p className={styles.phone_num_text}>핸드폰번호</p>
            <div className={styles.input_and_button}>
              <input
                name="phone"
                onChange={inputValueChangeHandler}
                value={phone}
                type="text"
                className={styles.phone_num_input}
                placeholder="핸드폰번호"
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
          </div>

          <div className={styles.auth_num_container}>
            <p className={styles.auth_num_text}>인증번호</p>
            <div className={styles.input_and_button}>
              <input
                name="authNum"
                onChange={inputValueChangeHandler}
                value={authNum}
                type="text"
                className={styles.auth_num_input}
                placeholder="인증번호"
                spellCheck="false"
                disabled={disable}
              />
              <button
                type="button"
                className={styles.confirm_auth_num_button}
                onClick={authNumCheckHandler}
              >
                확인
              </button>
            </div>
          </div>
          {checkedPhone && (
            <div>
              <div className={styles.new_pw_container}>
                <p className={styles.auth_num_text}>새 비밀번호</p>

                <input
                  name="newPw"
                  onChange={inputValueChangeHandler}
                  value={newPw}
                  type="password"
                  className={styles.auth_num_input}
                  placeholder="새 비밀번호 (8~16자)"
                  spellCheck="false"
                />
              </div>
              <div className={styles.new_pw_confirm_container}>
                <p className={styles.auth_num_text}>새 비밀번호 확인</p>

                <input
                  name="newPwConfirm"
                  onChange={inputValueChangeHandler}
                  value={newPwConfirm}
                  type="password"
                  className={styles.auth_num_input}
                  placeholder="새 비밀번호 확인 (8~16자)"
                  spellCheck="false"
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles.submit_button_container}>
          <button className={styles.submit_button} onClick={findPwHandler}>
            비밀번호 재설정
          </button>
        </div>
      </form>
    </section>
  );
};

export default FindPw;
