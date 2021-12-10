import React, { useEffect, useState } from "react";
import styles from "./mypageMain.module.css";
import axios from "axios";
import HelmetComponent from "../../../helmetComponent";

const MypageMain = ({ user, sessionCheck, userLogout }) => {
  const [disabled, setDisabled] = useState(false);
  const [withdrawalOn, setWithdrawalOn] = useState(false);
  const [inputValues, setInputValues] = useState({
    newPw: "",
    newPwConfirm: "",
    phone: "",
    authNum: "",
    withdrawalPw: "",
  });

  const { newPw, newPwConfirm, phone, authNum, withdrawalPw } = inputValues;

  const inputValueChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const passwordChange = (sessionUser) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/modifypassword`, {
        id: sessionUser.id,
        phone: sessionUser.phone,
        password: newPw,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("비밀번호가 변경되었습니다. 다시 로그인해주세요");
          userLogout(true);
        } else {
          window.alert("에러가 발생했습니다. 새로고침 후에 다시 시도해주세요.");
        }
      })
      .catch((err) => console.error(err));
  };

  const onPasswordChangeHandler = () => {
    if (newPw.length < 8 || newPw.length > 16) {
      window.alert("비밀번호는 8~16자 사이여야 합니다.");
      return;
    }
    if (newPw !== newPwConfirm) {
      window.alert("새로운 비밀번호와 확인이 일치하지 않습니다.");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (response.data === "" || response.data.idx !== user.idx) {
          window.alert("변경 권한이 없습니다.");
          return;
        }
        passwordChange(response.data);
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
        if (response.data !== "OK") {
          window.alert("이미 가입된 번호입니다.");
          return;
        }
        axios
          .post(`${process.env.REACT_APP_BASEURL}/user/requestsms`, {
            phone,
          })
          .then((response) => {
            window.alert("인증번호가 발송되었습니다.");
            setDisabled(true);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  const phoneChange = (sessionUser) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/modifyphone`, {
        id: sessionUser.id,
        phone,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("핸드폰 번호가 변경되었습니다. 다시 로그인해주세요.");
          window.location.href = "/modoorock";
        } else {
          window.alert("에러가 발생했습니다. 새로고침 후에 다시 시도해주세요.");
        }
      })
      .catch((err) => console.error(err));
  };

  const authNumCheck = (sessionUser) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/checksms`, {
        to: phone,
        content: authNum,
      })
      .then((response) => {
        if (response.data === "success") {
          phoneChange(sessionUser);
        } else {
          window.alert("인증번호가 다릅니다. 다시 시도해주세요.");
        }
      });
  };

  const onPhoneChangeHandler = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (response.data === "" || response.data.idx !== user.idx) {
          window.alert("변경 권한이 없습니다.");
          return;
        }
        authNumCheck(response.data);
      })
      .catch((err) => console.error(err));
  };

  const withdrawalViewHandler = () => {
    setWithdrawalOn(!withdrawalOn);
  };

  const onWithdrawalHandler = () => {
    const confirm = window.confirm(
      "정말로 회원 탈퇴 하시겠습니까? 회원 탈퇴를 하게 되면 모든 정보는 사라지며 복구할 수 없습니다."
    );
    if (!confirm) {
      return;
    }
    if (withdrawalPw !== "회원탈퇴") {
      window.alert("'회원탈퇴'를 정확히 입력해주세요");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((sessionUser) => {
        if (!sessionUser) {
          window.alert("로그인 후에 가능합니다.");
          return;
        }
        axios
          .post(`${process.env.REACT_APP_BASEURL}/user/deleteuser`, {
            idx: sessionUser.data.idx,
          })
          .then((response) => {
            if (response.data === "success") {
              window.alert("회원 탈퇴가 완료되었습니다.");
              userLogout(1);
            } else {
              window.alert(
                "에러가 발생했습니다. 새로고침 후에 다시 시도해주세요"
              );
            }
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.log(err));
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
      <HelmetComponent
        title="마이페이지"
        desc="모두락 마이페이지"
        url="https://web.modoorock.com/modoorock/mypage/main"
      />
      <div className={styles.top}>
        <img
          src={`${
            user.photo
              ? `${process.env.REACT_APP_BASEURL}-images/User/${user.photo}`
              : "/modoorock/images/profile_default.png"
          }`}
          alt="profile"
          className={styles.profile_image}
        />
        <div className={styles.name_and_point}>
          <p className={styles.name}>{`${user.name} 님`}</p>
          <p className={styles.point}>{`보유 포인트: ${user.totalPoint}점`}</p>
        </div>
      </div>
      <div className={styles.main}>
        {user && user.sns === 0 && (
          <div className={styles.input_container}>
            <p className={styles.input_title}>새로운 비밀번호</p>
            <input
              name="newPw"
              onChange={inputValueChangeHandler}
              value={newPw}
              type="password"
              className={styles.input}
              spellCheck="false"
              placeholder="새로운 비밀번호 (8~16자)"
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
              <button
                className={styles.button}
                onClick={onPasswordChangeHandler}
              >
                비밀번호 변경
              </button>
            </div>
          </div>
        )}

        <div className={styles.input_container}>
          <p className={styles.input_title}>변경할 핸드폰번호</p>

          <div className={styles.button_and_input}>
            <input
              name="phone"
              onChange={inputValueChangeHandler}
              value={phone}
              type="text"
              className={styles.input_short}
              spellCheck="false"
              placeholder="변경할 핸드폰번호"
              disabled={disabled}
            />
            <button className={styles.button} onClick={sendSmsHandler}>
              인증번호 받기
            </button>
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
            <button className={styles.button} onClick={onPhoneChangeHandler}>
              인증 후 변경
            </button>
          </div>
        </div>
        <button className={styles.withdrawal} onClick={withdrawalViewHandler}>
          회원탈퇴
        </button>
        {withdrawalOn && (
          <div className={styles.withdrawal_container}>
            <p className={styles.withdrawal_title}>회원탈퇴 확인</p>
            <p className={styles.withdrawal_subtitle}>
              하단에 '회원탈퇴'를 입력하신 후에 확인 버튼을 눌러주세요
            </p>
            <input
              value={withdrawalPw}
              onChange={inputValueChangeHandler}
              name="withdrawalPw"
              type="text"
              className={styles.withdrawal_input}
              spellCheck="false"
              placeholder="회원탈퇴"
            />
            <button
              className={styles.withdrawal_confirm}
              onClick={onWithdrawalHandler}
            >
              확인
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MypageMain;
