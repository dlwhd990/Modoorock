import React from "react";
import styles from "./adminProgramGamePopup.module.css";

const AdminProgramMissionPopup = ({ closeGamePopupHandler }) => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
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

export default AdminProgramMissionPopup;
