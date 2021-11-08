import axios from "axios";
import React, { useRef, useState } from "react";
import styles from "./adminProgramMissionUploadOx.module.css";

const AdminProgramMissionUploadOx = ({
  closeMissionPopupHandler,
  user,
  gameIdx,
}) => {
  const titleRef = useRef();
  const contentRef = useRef();
  const answerRef = useRef();
  const answerDescRef = useRef();
  const pointRef = useRef();

  const [thumbnail, setThumbnail] = useState(null);
  const onFileInputHandler = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setThumbnail(file);
    };
    file && reader.readAsDataURL(file);
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
        formData.append("point", parseInt(pointRef.current.value));
        formData.append("title", titleRef.current.value);
        formData.append("content", contentRef.current.value);
        formData.append("answer", answerRef.current.value);
        formData.append("answer_content", answerDescRef.current.value);
        formData.append("files", thumbnail);

        axios
          .post(
            `${process.env.REACT_APP_BASEURL}/mission/insertmission`,
            formData
          )
          .then((response) => console.log(response))
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
          ref={titleRef}
          type="text"
          className={styles.input}
          spellCheck="false"
          placeholder="제목"
        />
      </div>
      <div className={`${styles.content_container} ${styles.container_large}`}>
        <p className={styles.text}>미션 내용</p>
        <textarea
          ref={contentRef}
          className={styles.textarea}
          spellCheck="false"
          placeholder="문제 내용"
        ></textarea>
      </div>
      <div className={`${styles.answer_container} ${styles.container}`}>
        <p className={styles.text}>미션 정답</p>
        <select className={styles.input} ref={answerRef}>
          <option value="O">O</option>
          <option value="X">X</option>
        </select>
      </div>
      <div className={`${styles.desc_container} ${styles.container_large}`}>
        <p className={styles.text}>정답 설명</p>
        <textarea
          ref={answerDescRef}
          className={styles.textarea}
          spellCheck="false"
          placeholder="정답 설명"
        ></textarea>
      </div>
      <div className={`${styles.score_container} ${styles.container}`}>
        <p className={styles.text}>점수 설정</p>
        <input
          ref={pointRef}
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
