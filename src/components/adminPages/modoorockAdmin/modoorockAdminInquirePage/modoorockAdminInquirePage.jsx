import React from "react";
import styles from "./modoorockAdminInquirePage.module.css";

const ModoorockAdminInquirePage = ({ inquireList }) => {
  return (
    <section className={styles.main}>
      {inquireList.map((item) => (
        <span key={item.idx}>{item.title}</span>
      ))}
    </section>
  );
};

export default ModoorockAdminInquirePage;
