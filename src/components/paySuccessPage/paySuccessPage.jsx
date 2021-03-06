import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import HelmetComponent from "../../helmetComponent";
import LoadingPage from "../loadingPage/loadingPage";
import styles from "./paySuccessPage.module.css";

const PaySuccessPage = () => {
  const history = useHistory();
  const [loadingOn, setLoadingOn] = useState(true);
  function getParam(sname) {
    let params = window.location.search.substr(
      window.location.search.indexOf("?") + 1
    );

    let sval = "";

    params = params.split("&");
    let temp;

    for (var i = 0; i < params.length; i++) {
      temp = params[i].split("=");

      if ([temp[0]] == sname) {
        sval = temp[1];
      }
    }

    return sval;
  }

  const saveUserExp = (expIdx, userIdx, reservationDate) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/userexp/insertuserexp`, {
        expIdx,
        userIdx,
        reservationDate,
      })
      .then((response) => console.log("DD"))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const paymentKey = getParam("paymentKey");
    const orderId = getParam("orderId");
    const amount = getParam("amount");
    const headers = {
      Authorization:
        "Basic dGVzdF9za19PRG55UnBRV0dyTkdxWVoyNVl5OEt3djFNOUVOOg==",
      "Content-Type": "application/json",
    };
    axios
      .post(
        `https://api.tosspayments.com/v1/payments/${paymentKey}`,
        {
          orderId,
          amount,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          const purchaseData = JSON.parse(sessionStorage.getItem(orderId));
          saveUserExp(purchaseData[0], purchaseData[1], purchaseData[2]);
          setLoadingOn(false);
        }
      });
  }, []);
  return (
    <section className={styles.page}>
      <HelmetComponent
        title="결제 성공"
        desc=""
        url="https://web.modoorock.com/modoorock"
      />
      {loadingOn ? (
        <LoadingPage />
      ) : (
        <div className={styles.success}>
          <i className={`${styles.icon} far fa-check-circle`}></i>
          <p className={styles.text}>결제가 완료되었습니다.</p>
          <div className={styles.button_container}>
            <button className={styles.button} onClick={() => history.push("/")}>
              메인으로
            </button>
            <button
              className={styles.button}
              onClick={() => {
                history.push("/mypage/payment");
              }}
            >
              결제내역
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PaySuccessPage;
