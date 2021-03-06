import React, { useState } from "react";
import styles from "./adminProgramMissionUploadFour.module.css";
import axios from "axios";

const AdminProgramMissionUploadFour = ({
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
    count: "1",
  });

  const { title, content, answer, answerContent, point, count } = inputValues;

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

  const [selectList, setSelectList] = useState({
    select_one: "",
    select_two: "",
    select_three: "",
    select_four: "",
  });

  const { select_one, select_two, select_three, select_four } = selectList;
  const selectValueChangeHandler = (e) => {
    const { name, value } = e.target;
    setSelectList({
      ...selectList,
      [name]: value,
    });
  };

  const insertFour = (e) => {
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
        formData.append("typeIdx", 3);
        formData.append("userIdx", response.data.idx);
        formData.append("point", parseInt(point));
        formData.append("title", title);
        formData.append("content", content);
        formData.append("answer", answer);
        formData.append("answerContent", answerContent);
        formData.append("count", parseInt(count));
        thumbnail && formData.append("files", thumbnail);
        formData.append("inputSelect", select_one);
        formData.append("inputSelect", select_two);
        formData.append("inputSelect", select_three);
        formData.append("inputSelect", select_four);

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
          onChange={onFileInputHandler}
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/webp"
          className={styles.file_input}
        />
      </div>
      <div className={`${styles.title_container} ${styles.container}`}>
        <p className={styles.text}>미션 제목</p>
        <input
          name="title"
          onChange={inputChangeHandler}
          value={title}
          type="text"
          className={styles.input}
          spellCheck="false"
          placeholder="제목"
        />
      </div>
      <div className={`${styles.content_container} ${styles.container_large}`}>
        <p className={styles.text}>미션 내용</p>
        <textarea
          name="content"
          onChange={inputChangeHandler}
          value={content}
          className={styles.textarea}
          spellCheck="false"
          placeholder="문제 내용"
        ></textarea>
      </div>
      <div className={`${styles.select_container} ${styles.container_large}`}>
        <p className={styles.text}>선택지</p>
        <div className={styles.input_container}>
          <input
            name="select_one"
            onChange={selectValueChangeHandler}
            value={select_one}
            type="text"
            className={styles.select_input}
            spellCheck="false"
            placeholder="1번 보기"
          />
          <input
            name="select_two"
            onChange={selectValueChangeHandler}
            value={select_two}
            type="text"
            className={styles.select_input}
            spellCheck="false"
            placeholder="2번 보기"
          />
          <input
            name="select_three"
            onChange={selectValueChangeHandler}
            value={select_three}
            type="text"
            className={styles.select_input}
            spellCheck="false"
            placeholder="3번 보기"
          />
          <input
            name="select_four"
            onChange={selectValueChangeHandler}
            value={select_four}
            type="text"
            className={styles.select_input}
            spellCheck="false"
            placeholder="4번 보기"
          />
        </div>
      </div>
      <div className={`${styles.answer_container} ${styles.container}`}>
        <p className={styles.text}>미션 정답</p>
        <input
          name="answer"
          onChange={inputChangeHandler}
          value={answer}
          type="text"
          className={styles.input}
          spellCheck="false"
          placeholder="정답 (1~4번 중 정답인 번호 입력)"
        />
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
      <div className={`${styles.count_container} ${styles.container}`}>
        <p className={styles.text}>정답 입력 횟수</p>
        <select
          className={styles.input}
          name="count"
          onChange={inputChangeHandler}
          value={count}
        >
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>
      <div className={`${styles.button_container} ${styles.container}`}>
        <button className={styles.button} onClick={insertFour}>
          등록
        </button>
        <button className={styles.button} onClick={closeMissionPopupHandler}>
          취소
        </button>
      </div>
    </form>
  );
};

export default AdminProgramMissionUploadFour;
