import React from "react";
import styles from "./adminProgramMissionUploadFour.module.css";

const AdminProgramMissionUploadFour = ({ closeMissionPopupHandler }) => {
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
      <div className={`${styles.select_container} ${styles.container_large}`}>
        <p className={styles.text}>선택지</p>
        <div className={styles.input_container}>
          <input
            type="text"
            className={styles.select_input}
            spellCheck="false"
            placeholder="1번 보기"
          />
          <input
            type="text"
            className={styles.select_input}
            spellCheck="false"
            placeholder="2번 보기"
          />
          <input
            type="text"
            className={styles.select_input}
            spellCheck="false"
            placeholder="3번 보기"
          />
          <input
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

export default AdminProgramMissionUploadFour;
