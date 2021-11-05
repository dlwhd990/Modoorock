import React from "react";
import styles from "./adminProgramMissionUploadShort.module.css";

const AdminProgramMissionUploadShort = ({ closeMissionPopupHandler }) => {
  return (
    <form className={styles.form}>
      <div className={`${styles.photo_container} ${styles.container}`}>
        <p className={styles.text}>미션 사진</p>
        <input
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/webp"
          className={styles.file_input}
        />
      </div>
      <div className={`${styles.title_container} ${styles.container}`}>
        <p className={styles.text}>미션 제목</p>
        <input
          type="text"
          className={styles.input}
          spellCheck="false"
          placeholder="제목"
        />
      </div>
      <div className={`${styles.content_container} ${styles.container_large}`}>
        <p className={styles.text}>미션 내용</p>
        <textarea
          className={styles.textarea}
          spellCheck="false"
          placeholder="문제 내용"
        ></textarea>
      </div>
      <div className={`${styles.answer_container} ${styles.container}`}>
        <p className={styles.text}>미션 정답</p>
        <input
          type="text"
          className={styles.input}
          spellCheck="false"
          placeholder="정답"
        />
      </div>
      <div className={`${styles.desc_container} ${styles.container_large}`}>
        <p className={styles.text}>정답 설명</p>
        <textarea
          className={styles.textarea}
          spellCheck="false"
          placeholder="정답 설명"
        ></textarea>
      </div>
      <div className={`${styles.hint_container} ${styles.container}`}>
        <p className={styles.text}>힌트 설정</p>
        <input
          type="text"
          className={styles.input}
          spellCheck="false"
          placeholder="힌트"
        />
      </div>
      <div className={`${styles.score_container} ${styles.container}`}>
        <p className={styles.text}>점수 설정</p>
        <input
          type="text"
          className={styles.input}
          spellCheck="false"
          placeholder="점수 (숫자로만 입력)"
        />
      </div>
      <div className={`${styles.count_container} ${styles.container}`}>
        <p className={styles.text}>정답 입력 횟수</p>
        <select className={styles.input}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <div className={`${styles.button_container} ${styles.container}`}>
        <button className={styles.button}>등록</button>
        <button className={styles.button} onClick={closeMissionPopupHandler}>
          취소
        </button>
      </div>
    </form>
  );
};

export default AdminProgramMissionUploadShort;
