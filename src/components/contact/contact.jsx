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
      <section className={styles.contact_us_container}>
        <p className={styles.contact_us_title}>Contact Us</p>
        <p className={styles.desc}>
          문의하시기 전에 아래 페이지들을 참고해주세요. <br></br>자주 문의 되는
          사항들이 정리되어 있습니다.
        </p>
        <ul className={styles.contact_us_ul}>
          <li className={styles.li}>
            <span
              className={styles.link_blue}
              onClick={() => {
                history.push("/customer/qna");
                window.scrollTo({ top: 0 });
              }}
            >
              Q&A
            </span>{" "}
            읽어보기
          </li>
          <li className={styles.li}>
            <span
              className={styles.link_blue}
              onClick={() => {
                history.push("/customer/inquire");
                window.scrollTo({ top: 0 });
              }}
            >
              문의게시판
            </span>{" "}
            읽어보기
          </li>
        </ul>
        <p className={styles.desc}>
          만약 위의 페이지들에서 만족하실만한 답변을 찾지 못하셨다면, <br></br>
          다음과 같은 방법들로 저희에게 문의해주세요.
        </p>
      </section>
      <section className={styles.contact_info_container}>
        <div className={styles.email_container}>
          <div className={styles.email_content}>
            <p className={styles.email_title}>일반 문의</p>
            <p className={styles.email}>inquire@modoorock.com</p>
          </div>
          <div className={styles.email_content}>
            <p className={styles.email_title}>사이트 이용</p>
            <p className={styles.email}>website@modoorock.com</p>
          </div>
          <div className={styles.email_content}>
            <p className={styles.email_title}>상품 문의</p>
            <p className={styles.email}>program@modoorock.com</p>
          </div>
          <div className={styles.email_content}>
            <p className={styles.email_title}>사업 문의</p>
            <p className={styles.email}>business@modoorock.com</p>
          </div>
        </div>
        <div className={styles.office_info_container}>
          <div className={styles.office_image_container}>
            <img
              src="/Modoorock/images/office.jpeg"
              alt="office"
              className={styles.office_image}
            />
          </div>
          <div className={styles.office_intro}>
            <p className={styles.office_title}>Office</p>
            <p className={styles.office_location}>
              인천광역시 연수구 센트럴로 263<br></br> IBS타워 23층 인천관광기업
              지원센터
            </p>
            <p className={styles.office_phone_number}>010-3126-2457</p>
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
            <textarea
              name="project"
              id="project"
              className={styles.project_input}
            ></textarea>
          </div>
          <button className={styles.submit_button}>SUBMIT</button>
        </div>
      </section>
    </section>
  );
};

export default Contact;
