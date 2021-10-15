import { React, useRef } from "react";
import styles from "./noticeWrite.module.css";
import axios from "axios";
import { useHistory } from "react-router";

const NoticeWrite = () => {
  const history = useHistory();
  const typeRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();
  const writeSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (!response.data === "" || response.data.userType !== 2) {
          window.alert("관리자만 작성이 가능합니다.");
          return;
        }
        const type = typeRef.current.value;
        const title = titleRef.current.value;
        const content = contentRef.current.value;
        axios
          .post(`${process.env.REACT_APP_BASEURL}/notice/insertnotice`, {
            type,
            title,
            content,
          })
          .then((response) => {
            console.log(response);
            history.push("/customer/notice");
            window.scrollTo({ top: 0 });
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };
  return (
    <section className={styles.write}>
      <form className={styles.write_form}>
        <div className={styles.type_select_container}>
          <p className={styles.type_text}>분류</p>
          <select
            ref={typeRef}
            name="type"
            id="type"
            className={styles.type_select}
          >
            <option value="공지" className={styles.type}>
              공지
            </option>
          </select>
        </div>
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

export default NoticeWrite;
