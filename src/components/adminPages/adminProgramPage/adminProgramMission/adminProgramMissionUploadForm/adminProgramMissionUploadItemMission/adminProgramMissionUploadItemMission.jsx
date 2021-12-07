import React, { useState } from "react";
import styles from "./adminProgramMissionUploadItemMission.module.css";
import axios from "axios";

const AdminProgramMissionUploadItemMission = ({
  loadMissionList,
  setMissionLoaderHandler,
  closeMissionPopupHandler,
  user,
  gameIdx,
}) => {
  const [inputValues, setInputValues] = useState({
    title: "",
    content: "",
  });

  const { title, content } = inputValues;

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

  const insertItemMission = (e) => {
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
        formData.append("typeIdx", 9);
        formData.append("userIdx", response.data.idx);
        formData.append("point", 0);
        formData.append("title", title);
        formData.append("content", content);
        thumbnail && formData.append("files", thumbnail);

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
      <p className={styles.alert}>
        아이템 미션은 우선 미션을 업로드 한 후에 아이템을 추가하는 방식입니다.
      </p>
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
          value={title}
          onChange={inputChangeHandler}
          name="title"
          type="text"
          className={styles.input}
          spellCheck="false"
          placeholder="제목"
        />
      </div>
      <div className={`${styles.content_container} ${styles.container_large}`}>
        <p className={styles.text}>미션 내용</p>
        <textarea
          value={content}
          onChange={inputChangeHandler}
          name="content"
          className={styles.textarea}
          spellCheck="false"
          placeholder="문제 내용"
        ></textarea>
      </div>

      <div className={`${styles.button_container} ${styles.container}`}>
        <button
          type="submit"
          className={styles.button}
          onClick={insertItemMission}
        >
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
