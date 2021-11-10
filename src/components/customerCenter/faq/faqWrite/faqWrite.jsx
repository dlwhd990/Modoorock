import { React, useState } from "react";
import styles from "./faqWrite.module.css";
import axios from "axios";
import { useHistory } from "react-router";

const FaqWrite = () => {
  const history = useHistory();
  const [inputValues, setInputValues] = useState({
    title: "",
    content: "",
    type: "상품",
  });
  const { title, content, type } = inputValues;

  const inputValueChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
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
          .post(`${process.env.REACT_APP_BASEURL}/faq/insertfaq`, {
            type,
            title,
            content,
          })
          .then((response) => {
            history.push("/customer/faq");
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
            name="type"
            onChange={inputValueChangeHandler}
            value={type}
            className={styles.type_select}
          >
            <option value="상품" className={styles.type}>
              상품
            </option>
            <option value="주문/결제" className={styles.type}>
              주문/결제
            </option>
            <option value="회원정보" className={styles.type}>
              회원정보
            </option>
            <option value="사이트 이용" className={styles.type}>
              사이트 이용
            </option>
          </select>
        </div>
        <div className={styles.title_input_container}>
          <p className={styles.title_text}>제목</p>
          <input
            name="title"
            onChange={inputValueChangeHandler}
            value={title}
            type="text"
            className={styles.title_input}
            spellCheck="false"
            placeholder="제목"
          />
        </div>
        <div className={styles.content_input_container}>
          <p className={styles.content_text}>내용</p>
          <textarea
            name="content"
            onChange={inputValueChangeHandler}
            value={content}
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

export default FaqWrite;
