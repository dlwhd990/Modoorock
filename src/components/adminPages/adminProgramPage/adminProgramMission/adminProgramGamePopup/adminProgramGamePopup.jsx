import axios from "axios";
import React, { useState } from "react";
import styles from "./adminProgramGamePopup.module.css";

const AdminProgramGamePopup = ({
  closeGamePopupHandler,
  path,
  attractionInfo,
  loadGameList,
}) => {
  const [password, setPassword] = useState("");

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const uploadGame = (userIdx, password) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/game/insertgame`, {
        expIdx: parseInt(path.path_five),
        userIdx,
        password,
      })
      .then((response) => {
        if (response.data === "failed") {
          window.alert("게임 이름이 중복됩니다.");
          return;
        }
        window.alert("게임이 생성되었습니다.");
        loadGameList();
        closeGamePopupHandler();
      })
      .catch((err) => {
        console.error(err);
        window.alert("중복된 이름입니다. 다른 번호를 사용해주세요");
      });
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
        <p className={styles.text}>게임 이름</p>
        <input
          type="text"
          className={styles.input}
          onChange={passwordChangeHandler}
          spellCheck="false"
          placeholder="게임 이름"
        />
        <button className={styles.submit_button} onClick={onSubmitHandler}>
          확인
        </button>
      </form>
    </section>
  );
};

export default AdminProgramGamePopup;
