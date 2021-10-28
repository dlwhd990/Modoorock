import React from "react";
import styles from "./modoorockAdminUserPage.module.css";

const ModoorockAdminUserPage = ({ userList }) => {
  return (
    <section className={styles.main}>
      {userList.map((item) => (
        <span>{item.id}</span>
      ))}
    </section>
  );
};

export default ModoorockAdminUserPage;
