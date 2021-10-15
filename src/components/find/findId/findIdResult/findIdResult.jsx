import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import LoadingSpinner from "../../../loadingSpinner/loadingSpinner";
import styles from "./findIdResult.module.css";

const FindIdResult = (props) => {
  const history = useHistory();
  const { phone } = useParams();
  const [resultId, setResultId] = useState(null);

  const findIdHandler = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/findid`, {
        phone,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data !== "IDNOTFOUND") {
          setResultId(response.data);
        } else {
          setResultId(false);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    findIdHandler();
  }, []);
  return (
    <section className={styles.find_id_result}>
      <div className={styles.container}>
        <p className={styles.title}>아이디 확인</p>
        <p className={styles.subtitle}>
          입력하신 정보와 일치하는 아이디는 다음과 같습니다.
        </p>
        <div className={styles.divide_line}></div>
        {resultId === null ? (
          <div className={styles.loading_spinner}>
            <LoadingSpinner />
          </div>
        ) : resultId !== false ? (
          <span className={styles.result_message}>
            회원님의 아이디는 <span className={styles.result}>{resultId}</span>{" "}
            입니다
          </span>
        ) : (
          <span className={styles.result_message}>
            아이디가 존재하지 않습니다. 핸드폰 번호를 다시 확인해주세요
          </span>
        )}
        <div className={styles.button_container}>
          <button
            className={styles.button}
            onClick={() => {
              history.push("/login");
            }}
          >
            로그인
          </button>
          <button
            className={styles.button}
            onClick={() => {
              history.push("/find");
            }}
          >
            비밀번호 찾기
          </button>
        </div>
      </div>
    </section>
  );
};

export default FindIdResult;
