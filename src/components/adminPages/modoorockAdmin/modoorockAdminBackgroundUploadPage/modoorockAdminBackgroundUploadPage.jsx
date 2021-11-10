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
    };
    file && reader.readAsDataURL(file);
  };

  const uploadButtonHandler = () => {
    const formData = new FormData();
    if (!background) {
      window.alert("이미지가 선택되지 않았습니다.");
      return;
    }
    formData.append("files", background);

    axios
      .post(`${process.env.REACT_APP_BASEURL}/file/bgupload`, formData)
      .then((response) => response.data && window.alert("업로드 되었습니다."))
      .catch((err) => console.error(err));
  };
  return (
    <section className={styles.upload_page}>
      <section className={styles.container}>
        <h1 className={styles.title}>배경업로드</h1>
        <div className={styles.form}>
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg,image/webp"
            className={styles.input}
            onChange={onFileInputChangeHandler}
          />
          <button
            className={styles.upload_button}
            onClick={uploadButtonHandler}
          >
            업로드
          </button>
        </div>
      </section>
    </section>
  );
};

export default ModoorockAdminBackgroundUploadPage;
