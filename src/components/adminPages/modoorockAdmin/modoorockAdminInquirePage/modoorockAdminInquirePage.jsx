import React from "react";
import ModoorockAdminInquireItem from "./modoorockAdminInquireItem/modoorockAdminInquireItem";
import styles from "./modoorockAdminInquirePage.module.css";

const ModoorockAdminInquirePage = ({ inquireList, loadInquireList }) => {
  return (
    <section className={styles.main}>
      <h1 className={styles.title}>문의/답변</h1>
      {inquireList.map((item) => (
        <ModoorockAdminInquireItem
          key={item.idx}
          article={item}
          loadInquireList={loadInquireList}
        />
      ))}
    </section>
  );
};

export default ModoorockAdminInquirePage;
