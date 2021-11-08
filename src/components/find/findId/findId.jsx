import React, { useState } from "react";
import styles from "./findId.module.css";
import { useHistory } from "react-router";

const FindId = (props) => {
  const [phone, setPhone] = useState("");
  const history = useHistory();

  const phoneChangeHandler = (e) => {
    setPhone(e.target.value);
  };

  const findIdHandler = (e) => {
    e.preventDefault();
    if (phone === "") {
      window.alert("핸드폰 번호를 입력해주세요");
      return;
    }
    history.push(`/find/id/${phone}`);
  };

  return (
    <section className={styles.find_id}>
      <form className={styles.find_id_form}>
        <p className={styles.find_id_title}>아이디 찾기</p>
        <div className={styles.main_container}>
          <div className={styles.phone_num_container}>
            <p className={styles.phone_num_text}>핸드폰 번호</p>
            <input
              value={phone}
              onChange={phoneChangeHandler}
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
