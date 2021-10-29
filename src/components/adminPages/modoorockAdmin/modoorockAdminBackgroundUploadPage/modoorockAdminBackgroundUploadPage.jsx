import axios from "axios";
import React, { useState } from "react";
import styles from "./modoorockAdminBackgroundUploadPage.module.css";

const ModoorockAdminBackgroundUploadPage = (props) => {
  const [background, setBackground] = useState(null);

  const onFileInputChangeHandler = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setBackground(file);
      console.log(file);
    };
    file && reader.readAsDataURL(file);
  };

  const uploadButtonHandler = () => {
    const formData = new FormData();
    formData.append("files", background);
    for (let value of formData.values()) {
      console.log(value); //내용확인
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/file/bgupload`, formData)
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };
  return (
    <section className={styles.upload_page}>
      <h1 className={styles.title}>배경업로드</h1>
      <input
        type="file"
        accept="image/jpg,image/png,image/jpeg"
        className={styles.input}
        onChange={onFileInputChangeHandler}
      />
      <button className={styles.upload_button} onClick={uploadButtonHandler}>
        업로드
      </button>
    </section>
  );
};

export default ModoorockAdminBackgroundUploadPage;
