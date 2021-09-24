import React from "react";
import styles from "./contact.module.css";

const Contact = (props) => {
  return (
    <section className={styles.contact}>
      <section className={styles.top}>
        <p className={styles.top_title}>CONTACT</p>
        <div className={styles.top_main}>
          <div className={styles.item_container}>
            <i className={`${styles.icon} far fa-paper-plane`}></i>
            <p className={styles.item_desc}>example@example.com</p>
          </div>
          <div className={styles.item_container}>
            <i className={`${styles.icon} fas fa-map-marker-alt`}></i>
            <p className={styles.item_desc}>
              인천광역시 연수구 센트럴로 263 IBS타워 23층 인천관광기업 지원센터
            </p>
          </div>
          <div className={styles.item_container}>
            <i className={`${styles.icon} fas fa-phone-alt`}></i>
            <p className={styles.item_desc}>010-3126-2457</p>
          </div>
        </div>
      </section>

      <section className={styles.bottom}>
        <p className={styles.bottom_title}>LET'S TALK</p>
        <div className={styles.bottom_main}>
          <div className={styles.name_and_email_container}>
            <div className={styles.name_container}>
              <p className={styles.input_title}>What's Your Name</p>
              <input type="text" className={styles.input} spellCheck="false" />
            </div>
            <div className={styles.email_container}>
              <p className={styles.input_title}>Your Email</p>
              <input type="text" className={styles.input} spellCheck="false" />
            </div>
          </div>
          <div className={styles.project_container}>
            <p className={styles.input_title}>Tell Us About Your Project</p>
            <input
              type="text"
              className={styles.long_input}
              spellCheck="false"
            />
          </div>
          <button className={styles.submit_button}>SUBMIT</button>
        </div>
      </section>
    </section>
  );
};

export default Contact;
