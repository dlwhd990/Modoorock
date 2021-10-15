import React from "react";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";
import styles from "./loadingPage.module.css";

const LoadingPage = (props) => {
  return (
    <section className={styles.loading_page}>
      <LoadingSpinner />
      <p className={styles.title}>잠시만 기다려주세요</p>
    </section>
  );
};

export default LoadingPage;
