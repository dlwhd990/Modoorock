import React from "react";
import styles from "./programs.module.css";

const Programs = (props) => {
  return (
    <section className={styles.programs}>
      <section className={styles.top_banner}></section>
      <section className={styles.main}>
        <div className={styles.search_container}>
          <input type="text" className={styles.search_input} />
          <i className={`${styles.search_icon} fas fa-search`}></i>
        </div>
        <div className={styles.content_container}>
          <span>컨텐츠 컴포넌트들 들어갈 곳</span>
        </div>
      </section>
    </section>
  );
};

export default Programs;
