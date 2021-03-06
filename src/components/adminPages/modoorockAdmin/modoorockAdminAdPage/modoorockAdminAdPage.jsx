import axios from "axios";
import React, { useState } from "react";
import ModoorockAdminAdItem from "./modoorockAdminAdItem/modoorockAdminAdItem";
import styles from "./modoorockAdminAdPage.module.css";

const ModoorockAdminAdPage = ({ advertiseList, loadAdvertiseList }) => {
  const [inputValues, setInputValues] = useState({
    title: "",
    content: "",
  });

  const { title, content } = inputValues;

  const inputValueChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const [adThumbnail, setAdThumbnail] = useState(null);
  const onFileInputHandler = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setAdThumbnail(file);
    };
    file && reader.readAsDataURL(file);
  };

  const onAdvertisementUploadHandler = () => {
    if (title === "" || content === "" || !adThumbnail) {
      window.alert("모든 정보를 입력한 후에 업로드 가능합니다.");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("files", adThumbnail);
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/advertise/insertadvertise`,
        formData
      )
      .then((response) => {
        response.data === "success"
          ? window.alert("업로드완료")
          : window.alert("업로드에 실패했습니다.");
        loadAdvertiseList();
      })
      .catch((err) => console.error(err));
  };

  return (
    <section className={styles.main}>
      <section className={styles.advertise_upload_container}>
        <h1 className={styles.title}>홍보영상 업로드</h1>
        <div className={styles.input_container}>
          <p className={styles.text}>제목</p>
          <input
            name="title"
            onChange={inputValueChangeHandler}
            value={title}
            type="text"
            className={styles.text_input}
          />
        </div>
        <div className={styles.input_container}>
          <p className={styles.text}>주소 (URL)</p>
          <input
            name="content"
            onChange={inputValueChangeHandler}
            value={content}
            type="text"
            className={styles.text_input}
          />
        </div>
        <div className={styles.input_container}>
          <p className={styles.text}>썸네일</p>
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg,image/webp"
            className={styles.file_input}
            onChange={onFileInputHandler}
          />
        </div>
        <button
          className={styles.submit_button}
          onClick={onAdvertisementUploadHandler}
        >
          업로드
        </button>
      </section>
      <section className={styles.list}>
        {advertiseList.map((item) => (
          <ModoorockAdminAdItem
            key={item.idx}
            item={item}
            loadAdvertiseList={loadAdvertiseList}
          />
        ))}
      </section>
    </section>
  );
};

export default ModoorockAdminAdPage;
