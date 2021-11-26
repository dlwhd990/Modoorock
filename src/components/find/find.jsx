import React, { useState } from "react";
import HelmetComponent from "../../helmetComponent";
import styles from "./find.module.css";
import FindId from "./findId/findId";
import FindPw from "./findPw/findPw";

const Find = (props) => {
  const [select, setSelect] = useState("아이디");
  const onSelectChangeHandler = (e) => {
    setSelect(e.currentTarget.innerText);
  };
  return (
    <section className={styles.find}>
      <HelmetComponent
        title="아이디/비밀번호 찾기"
        desc="모두락 회원 아이디/비밀번호 찾기"
        url="https://web.modoorock.com/modoorock/find"
      />
      <div className={styles.select_container}>
        <div
          className={`${
            select === "아이디"
              ? `${styles.select_button_left} ${styles.on}`
              : `${styles.select_button_left} ${styles.off}`
          }`}
          onClick={onSelectChangeHandler}
        >
          아이디
        </div>
        <div
          className={`${
            select === "비밀번호"
              ? `${styles.select_button_right} ${styles.on}`
              : `${styles.select_button_right} ${styles.off}`
          }`}
          onClick={onSelectChangeHandler}
        >
          비밀번호
        </div>
      </div>
      {select === "아이디" ? <FindId /> : <FindPw />}
    </section>
  );
};

export default Find;
