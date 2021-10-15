import { React, useRef } from "react";
import styles from "./inquireWrite.module.css";
import axios from "axios";

const InquireWrite = (props) => {
  const titleRef = useRef();
  const contentRef = useRef();
  const writeSubmitHandler = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    axios
      .post(`${process.env.REACT_APP_BASEURL}/qna/insertqna`, {
        title,
        content, //user id도 함께 넣어보내야함
      })
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };
  return (
    <section className={styles.write}>
      <form className={styles.write_form}>
        <div className={styles.title_input_container}>
          <p className={styles.title_text}>제목</p>
          <input ref={titleRef} type="text" className={styles.title_input} />
        </div>
        <div className={styles.content_input_container}>
          <p className={styles.content_text}>내용</p>
          <textarea
            ref={contentRef}
            name="content"
            id="content"
            className={styles.content_input}
          ></textarea>
        </div>
        <button className={styles.submit_button} onClick={writeSubmitHandler}>
          글쓰기
        </button>
      </form>
    </section>
  );
};

export default InquireWrite;
