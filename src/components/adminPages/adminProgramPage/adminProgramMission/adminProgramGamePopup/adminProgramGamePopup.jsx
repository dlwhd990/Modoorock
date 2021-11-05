import axios from "axios";
import React, { useRef } from "react";
import styles from "./adminProgramGamePopup.module.css";

const AdminProgramGamePopup = ({
  closeGamePopupHandler,
  path,
  attractionInfo,
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
        console.log(response);
      })
      .catch((err) => console.error(err));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (
          response.data !== "" &&
          attractionInfo.userIdx === response.data.idx
        ) {
          const password = gameNumberRef.current.value;
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
        />
        <button className={styles.submit_button} onClick={onSubmitHandler}>
          확인
        </button>
      </form>
    </section>
  );
};

export default AdminProgramGamePopup;
