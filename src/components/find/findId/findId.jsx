import axios from "axios";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import LoadingSpinner from "../../loadingSpinner/loadingSpinner";
import styles from "./findId.module.css";

const FindId = (props) => {
  const phoneRef = useRef();
  const history = useHistory();
  const [resultId, setResultId] = useState(null);
  const findIdHandler = (e) => {
    e.preventDefault();
    setResultId(false);
    const phone = phoneRef.current.value;
    axios
      .post("http://35.239.228.185/modoorock/user/findid", {
        phone,
      })
      .then((response) => {
        if (response.data !== "IDNOTFOUND") {
          setResultId(response.data);
        } else {
          window.alert("존재하지 않는 핸드폰 번호입니다.");
          setResultId(null);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className={styles.find_id}>
      <form className={styles.find_id_form}>
        <p className={styles.find_id_title}>아이디 찾기</p>
        <div className={styles.main_container}>
          <div className={styles.phone_num_container}>
            <p className={styles.phone_num_text}>핸드폰 번호</p>
            <input
              ref={phoneRef}
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
      {resultId ? (
        <section className={styles.find_id_result_container}>
          <span className={styles.find_id_result}>
            회원님의 아이디는{" "}
            <span className={styles.result_id}>{resultId}</span> 입니다.
          </span>
          <button
            className={styles.go_login_button}
            onClick={() => {
              history.push("/login");
            }}
          >
            로그인 페이지로 이동
          </button>
        </section>
      ) : resultId === false ? (
        <LoadingSpinner />
      ) : (
        <></>
      )}
    </section>
  );
};

export default FindId;
