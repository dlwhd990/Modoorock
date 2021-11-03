import { React, useRef } from "react";
import styles from "./faqWrite.module.css";
import axios from "axios";
import { useHistory } from "react-router";

const FaqWrite = () => {
  const history = useHistory();
  const typeRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();
  const writeSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (response.data === "" || response.data.idType !== 2) {
          window.alert("관리자만 작성이 가능합니다.");
          return;
        }

        const type = typeRef.current.value;
        const title = titleRef.current.value;
        const content = contentRef.current.value;
        axios
          .post(`${process.env.REACT_APP_BASEURL}/faq/insertfaq`, {
            type,
            title,
            content,
          })
          .then((response) => {
            console.log(response);
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
            ref={typeRef}
            name="type"
            id="type"
            className={styles.type_select}
          >
            <option value="상품" className={styles.type}>
              상품
            </option>
            <option value="주문/배송/반품" className={styles.type}>
              주문/배송/반품
            </option>
            <option value="멤버쉽" className={styles.type}>
              멤버쉽
            </option>
            <option value="사이트 이용" className={styles.type}>
              사이트 이용
            </option>
          </select>
        </div>
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

export default FaqWrite;
