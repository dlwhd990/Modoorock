import { React, useRef } from "react";
import styles from "./inquireWrite.module.css";
import axios from "axios";
import { useHistory } from "react-router";

const InquireWrite = () => {
  const history = useHistory();
  const titleRef = useRef();
  const contentRef = useRef();
  const writeSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (!response.data === "") {
          window.alert("로그인 후에 글 작성이 가능합니다.");
          return;
        }
        const title = titleRef.current.value;
        const content = contentRef.current.value;
        const userIdx = response.data.idx;
        axios
          .post(`${process.env.REACT_APP_BASEURL}/qna/insertqna`, {
            title,
            content,
            userIdx,
            expIdx: 1,
          })
          .then((response) => {
            console.log(response);
            history.push("/customer/inquire");
            window.scrollTo({ top: 0 });
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };
  return (
    <section className={styles.write}>
      <form className={styles.write_form}>
        <div className={styles.title_input_container}>
          <p className={styles.title_text}>제목</p>
          <input
            ref={titleRef}
            type="text"
            className={styles.title_input}
            spellCheck="false"
            placeholder="제목"
          />
        </div>
        <div className={styles.content_input_container}>
          <p className={styles.content_text}>내용</p>
          <textarea
            ref={contentRef}
            name="content"
            id="content"
            className={styles.content_input}
            spellCheck="false"
            placeholder="내용"
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
