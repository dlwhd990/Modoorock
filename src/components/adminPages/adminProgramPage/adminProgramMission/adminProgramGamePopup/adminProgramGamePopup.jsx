import axios from "axios";
import React, { useRef } from "react";
import styles from "./adminProgramGamePopup.module.css";

const AdminProgramGamePopup = ({
  closeGamePopupHandler,
  path,
  attractionInfo,
  loadGameList,
}) => {
  const gameNumberRef = useRef();

  const uploadGame = (userIdx, password) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/game/insertgame`, {
        expIdx: parseInt(path.path_five),
        userIdx,
        password,
      })
      .then((response) => {
        window.alert("게임이 생성되었습니다.");
        loadGameList();
        closeGamePopupHandler();
      })
      .catch((err) => {
        console.error(err);
        window.alert("중복된 번호입니다. 다른 번호를 사용해주세요");
      });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const password = gameNumberRef.current.value;
    if (password.length !== 4) {
      window.alert("게임 번호는 4자리 숫자여야 합니다.");
      return;
    }
    if (parseInt(password).toString().length !== password.length) {
      window.alert("숫자만 입력해주세요");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (
          response.data !== "" &&
          attractionInfo.userIdx === response.data.idx
        ) {
          uploadGame(response.data.idx, password);
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <section className={styles.popup}>
      <div className={styles.popup_top}>
        <div onClick={closeGamePopupHandler}>
          <i className={`${styles.close_popup_button} fas fa-times`}></i>
        </div>
        <p className={styles.popup_title}>게임 추가</p>
      </div>

      <form className={styles.form}>
        <p className={styles.text}>게임 번호</p>
        <input
          ref={gameNumberRef}
          type="text"
          className={styles.input}
          spellCheck="false"
          placeholder="게임 번호 (4자리 숫자)"
          maxLength="4"
        />
        <button className={styles.submit_button} onClick={onSubmitHandler}>
          확인
        </button>
      </form>
    </section>
  );
};

export default AdminProgramGamePopup;
