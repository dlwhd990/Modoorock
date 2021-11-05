import React from "react";
import styles from "./adminProgramMissionUploadItemMission.module.css";
//까다로워서 일단 놔둠
const AdminProgramMissionUploadItemMission = ({ closeMissionPopupHandler }) => {
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
      <div className={`${styles.score_container} ${styles.container}`}>
        <p className={styles.text}>점수 설정</p>
        <input
          type="text"
          className={styles.input}
          spellCheck="false"
          placeholder="점수 (숫자로만 입력)"
        />
      </div>
      <div className={styles.item_container}>
        <p className={styles.item_title}>아이템 정보</p>
        <div className={`${styles.score_container} ${styles.container}`}>
          <p className={styles.text}>아이템 제목</p>
          <input
            type="text"
            className={styles.input}
            spellCheck="false"
            placeholder="제목"
          />
        </div>
        <div
          className={`${styles.content_container} ${styles.container_large}`}
        >
          <p className={styles.text}>아이템 내용</p>
          <textarea
            className={styles.textarea}
            spellCheck="false"
            placeholder="문제 내용"
          ></textarea>
        </div>
        <div className={`${styles.score_container} ${styles.container}`}>
          <p className={styles.text}>아이템 포인트</p>
          <input
            type="text"
            className={styles.input}
            spellCheck="false"
            placeholder="점수 (숫자로만 입력)"
          />
        </div>
      </div>
      <button type="button" className={styles.add_button}>
        아이템 추가
      </button>
      <div className={`${styles.button_container} ${styles.container}`}>
        <button type="submit" className={styles.button}>
          등록
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={closeMissionPopupHandler}
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default AdminProgramMissionUploadItemMission;
