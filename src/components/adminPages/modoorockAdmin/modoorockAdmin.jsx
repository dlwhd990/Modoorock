import axios from "axios";
import React, { useRef, useState } from "react";
import styles from "./modoorockAdmin.module.css";

const ModoorockAdmin = (props) => {
  const adTitleRef = useRef();
  const adUrlRef = useRef();
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
    const title = adTitleRef.current.value;
    const content = adUrlRef.current.value;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("files", adThumbnail);
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/advertise/insertadvertise`,
        formData
      )
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };
  return (
    <section className={styles.main}>
      <section className={styles.advertise_upload_container}>
        <h1 className={styles.container_title}>홍보영상 업로드</h1>
        <div className={styles.input_container}>
          <p className={styles.text}>제목</p>
          <input ref={adTitleRef} type="text" className={styles.text_input} />
        </div>
        <div className={styles.input_container}>
          <p className={styles.text}>주소 (URL)</p>
          <input ref={adUrlRef} type="text" className={styles.text_input} />
        </div>
        <div className={styles.input_container}>
          <p className={styles.text}>썸네일</p>
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg"
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
    </section>
  );
};

export default ModoorockAdmin;
