import axios from "axios";
import React, { useState } from "react";
import styles from "./adminProgramMissionUploadOx.module.css";

const AdminProgramMissionUploadOx = ({
  loadMissionList,
  setMissionLoaderHandler,
  closeMissionPopupHandler,
  user,
  gameIdx,
}) => {
  const [inputValues, setInputValues] = useState({
    title: "",
    content: "",
    answer: "",
    answerContent: "",
    point: "",
  });

  const { title, content, answer, answerContent, point } = inputValues;

  const [thumbnail, setThumbnail] = useState(null);
  const onFileInputHandler = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setThumbnail(file);
    };
    file && reader.readAsDataURL(file);
  };

  const inputChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const insertOx = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (response.data === "" || response.data.idx !== user.idx) {
          window.alert("권한이 없습니다.");
          return;
        }
        const formData = new FormData();
        formData.append("gameIdx", parseInt(gameIdx));
        formData.append("typeIdx", 2);
        formData.append("userIdx", response.data.idx);
        formData.append("point", parseInt(point));
        formData.append("title", title);
        formData.append("content", content);
        formData.append("answer", answer);
        formData.append("answerContent", answerContent);
        formData.append("files", thumbnail);

        axios
          .post(
            `${process.env.REACT_APP_BASEURL}/mission/insertmission`,
            formData
          )
          .then((response) => {
            if (response.data === "success") {
              window.alert("미션 업로드에 성공했습니다.");
              loadMissionList();
              closeMissionPopupHandler();
              setMissionLoaderHandler();
              return;
            }
            window.alert(
              "에러가 발생했습니다. 새로고침 후에 다시 시도해주세요"
            );
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <form className={styles.form}>
      <div className={`${styles.photo_container} ${styles.container}`}>
        <p className={styles.text}>미션 사진</p>
        <input
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/webp"
          className={styles.file_input}
          onChange={onFileInputHandler}
        />
      </div>
      <div className={`${styles.title_container} ${styles.container}`}>
        <p className={styles.text}>미션 제목</p>
        <input
          name="title"
          type="text"
          className={styles.input}
          onChange={inputChangeHandler}
          value={title}
          spellCheck="false"
          placeholder="제목"
        />
      </div>
      <div className={`${styles.content_container} ${styles.container_large}`}>
        <p className={styles.text}>미션 내용</p>
        <textarea
          name="content"
          className={styles.textarea}
          onChange={inputChangeHandler}
          value={content}
          spellCheck="false"
          placeholder="문제 내용"
        ></textarea>
      </div>
      <div className={`${styles.answer_container} ${styles.container}`}>
        <p className={styles.text}>미션 정답</p>
        <select
          className={styles.input}
          name="answer"
          onChange={inputChangeHandler}
          value={answer}
        >
          <option value="O">O</option>
          <option value="X">X</option>
        </select>
      </div>
      <div className={`${styles.desc_container} ${styles.container_large}`}>
        <p className={styles.text}>정답 설명</p>
        <textarea
          name="answerContent"
          onChange={inputChangeHandler}
          value={answerContent}
          className={styles.textarea}
          spellCheck="false"
          placeholder="정답 설명"
        ></textarea>
      </div>
      <div className={`${styles.score_container} ${styles.container}`}>
        <p className={styles.text}>점수 설정</p>
        <input
          name="point"
          onChange={inputChangeHandler}
          value={point}
          type="text"
          className={styles.input}
          spellCheck="false"
          placeholder="점수 (숫자로만 입력)"
        />
      </div>
      <div className={`${styles.button_container} ${styles.container}`}>
        <button className={styles.button} onClick={insertOx}>
          등록
        </button>
        <button className={styles.button} onClick={closeMissionPopupHandler}>
          취소
        </button>
      </div>
    </form>
  );
};

export default AdminProgramMissionUploadOx;
