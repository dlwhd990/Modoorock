import React from "react";
import styles from "./findId.module.css";

const FindId = (props) => {
  const findIdHandler = (e) => {
    e.preventDefault();
    console.log("아직");
  };
  return (
    <section className={styles.find_id}>
      <form className={styles.find_id_form}>
        <p className={styles.find_id_title}>아이디 찾기</p>
        <div className={styles.main_container}>
          <div className={styles.name_input_container}>
            <p className={styles.name_input_text}>이름</p>
            <input
              type="text"
              className={styles.name_input}
              placeholder="이름"
              spellCheck="false"
            />
          </div>

          <div className={styles.phone_num_container}>
            <p className={styles.phone_num_text}>핸드폰 번호</p>
            <input
              type="text"
              className={styles.phone_num_input}
              placeholder="핸드폰 번호"
              spellCheck="false"
            />
          </div>
        </div>
        <div className={styles.submit_button_container}>
          <button className={styles.submit_button} onClick={findIdHandler}>
            아이디 찾기
          </button>
        </div>
      </form>
    </section>
  );
};

export default FindId;
