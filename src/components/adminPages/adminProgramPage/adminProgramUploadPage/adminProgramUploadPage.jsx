import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import styles from "./adminProgramUploadPage.module.css";

const AdminProgramUploadPage = ({ user }) => {
  const history = useHistory();
  const params = useParams();
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [area, setArea] = useState("");
  const [attractionInfo, setAttractionInfo] = useState(null);

  const loadAttractionInfo = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/attraction/getattractioninfo`, {
        idx: parseInt(params.path_three),
      })
      .then((response) => {
        console.log(response);
        setAttractionInfo(response.data);
      })
      .catch((err) => console.error(err));
  };

  const onFileInputChangeHandler = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setPreviewImage({
        file: file,
        previewURL: reader.result,
      });
    };
    file && reader.readAsDataURL(file);
  };

  const insertAttraction = (userData) => {
    console.log(userData);
    axios
      .post(`${process.env.REACT_APP_BASEURL}/attraction/insertattraction`, {
        name,
        area,
        photo: "nothing",
        content,
        userIdx: userData.data.idx,
      })
      .then((res) => {
        if (res.data === "success") {
          window.alert("성공적으로 업로드 되었습니다");
          history.push("/admin/attraction");
        }
      })
      .catch((err) => console.error(err));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (name === "" || content === "" || area === "" || !previewImage) {
      window.alert("모든 사항을 입력해주세요");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        console.log(response);
        if (
          response.data !== "" &&
          response.data.idType === 1 &&
          response.data.idx === user.idx
        ) {
          insertAttraction(response);
        } else {
          window.alert("로그인 정보가 맞지 않습니다.");
        }
      })
      .catch((err) => console.error(err));
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const areaChangeHandler = (e) => {
    setArea(e.target.value);
  };

  const contentChangeHandler = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    loadAttractionInfo();
  }, []);

  return (
    <section className={styles.upload_page}>
      <section className={styles.upload_top}>
        <div className={styles.title_container}>
          <div className={styles.icon_container_one}>
            <i className={`${styles.head_icon} fas fa-map-marker-alt`}></i>
          </div>
          {attractionInfo && (
            <p
              className={styles.title}
            >{`체험상품 추가 - ${attractionInfo.name}`}</p>
          )}
        </div>
      </section>
      <section className={styles.main}>
        <form className={styles.main_form}>
          <div className={styles.form_content}>
            <p className={styles.form_text}>상품 이미지</p>
            <input
              type="file"
              accept="image/jpg,image/png,image/jpeg"
              className={styles.form_input_file}
              onChange={onFileInputChangeHandler}
            />
          </div>
          <div className={styles.form_content}>
            <p className={styles.form_text}>체험상품 명</p>
            <input
              type="text"
              className={styles.form_input}
              onChange={nameChangeHandler}
              spellCheck="false"
              placeholder="체험상품 명"
            />
          </div>
          <div className={styles.form_content}>
            <p className={styles.form_text}>체험상품 가격</p>
            <input
              type="text"
              className={styles.form_input}
              onChange={nameChangeHandler}
              spellCheck="false"
              placeholder="체험상품 가격 (숫자만으로 입력)"
            />
          </div>
          <div className={styles.form_content}>
            <p className={styles.form_text}>체험상품 테마</p>
            <select
              name="theme"
              id="theme"
              className={styles.theme_select}
              onChange={areaChangeHandler}
            >
              <option value="">테마선택</option>
              <option value="농촌체험">농촌체험</option>
              <option value="액티비티">액티비티</option>
              <option value="단체">단체</option>
              <option value="친구">친구</option>
              <option value="가족">가족</option>
              <option value="연인">연인</option>
            </select>
          </div>
          <div className={styles.form_content_textarea}>
            <p className={styles.form_text}>상품 소개</p>
            <textarea
              name="content"
              id="content"
              className={styles.form_textarea}
              onChange={contentChangeHandler}
              spellCheck="false"
              placeholder="상품 소개"
            ></textarea>
          </div>
          <button className={styles.submit_button} onClick={onSubmitHandler}>
            업로드
          </button>
        </form>
      </section>
    </section>
  );
};
export default AdminProgramUploadPage;
