import React from "react";
import styles from "./find.module.css";
import FindId from "./findId/findId";
import FindPw from "./findPw/findPw";

const Find = (props) => {
  return (
    <section className={styles.find}>
      <FindId />
      <FindPw />
    </section>
  );
};

export default Find;
