import { React, useState } from "react";
import styles from "./noticeWrite.module.css";
import axios from "axios";
import { useHistory } from "react-router";
import SummerNote from "../../../summerNote/summerNote";

const NoticeWrite = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onTitleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const onContentChangeHandler = (input) => {
    console.log(input);
    setContent(input);
  };

  const writeSubmitHandler = (e) => {
    e.preventDefault();

    if (title === "" || content === "") {
      window.alert("제목과 내용을 입력해주세요");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (response.data === "" || response.data.idType !== 2) {
          window.alert("관리자만 작성이 가능합니다.");
          return;
        }

        axios
          .post(`${process.env.REACT_APP_BASEURL}/notice/insertnotice`, {
            type: "공지",
            title,
            content,
          })
          .then((response) => {
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
        <div className={styles.title_input_container}>
          <p className={styles.title_text}>제목</p>
          <input
            onChange={onTitleChangeHandler}
            value={title}
            type="text"
            className={styles.title_input}
            spellCheck="false"
            placeholder="제목"
          />
        </div>
        <div className={styles.content_input_container}>
          <p className={styles.content_text}>내용</p>
          <SummerNote
            where="notice"
            onContentChangeHandler={onContentChangeHandler}
          />
        </div>
        <button className={styles.submit_button} onClick={writeSubmitHandler}>
          글작성
        </button>
      </form>
    </section>
  );
};

export default NoticeWrite;
