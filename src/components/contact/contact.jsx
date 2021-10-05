import React from "react";
import { useHistory } from "react-router";
import styles from "./contact.module.css";

const Contact = (props) => {
  const history = useHistory();
  return (
    <section className={styles.contact}>
      <section className={styles.contact_top_banner}></section>
      <section className={styles.select_bar_container}>
        <div className={`${styles.select_button} ${styles.on}`}>Contact</div>
      </section>
      <h1 className={styles.title}>Contact</h1>
      <div className={styles.route_button_container}>
        <div
          className={styles.home_icon_container}
          onClick={() => {
            history.push("/");
            window.scrollTo({ top: 0 });
          }}
        >
          <i className={`${styles.home_icon} fas fa-home`}></i>
        </div>

        <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>

        <p
          className={styles.route_button}
          onClick={() => {
            history.push("/contact");

            window.scrollTo({ top: 0 });
          }}
        >
          Contact
        </p>
      </div>
    </section>
  );
};

export default Contact;
