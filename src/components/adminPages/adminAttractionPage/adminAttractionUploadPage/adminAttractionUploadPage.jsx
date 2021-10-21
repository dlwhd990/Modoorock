import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styles from "./adminAttractionUploadPage.module.css";

const AdminAttractionUploadPage = ({ user }) => {
  const history = useHistory();
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [area, setArea] = useState("");

  const onFileInputChangeHandler = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setPreviewImage({
        file: file,
        previewURL: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const insertAttraction = (response) => {
    console.log(response);
    axios
      .post(`${process.env.REACT_APP_BASEURL}/attraction/insertattraction`, {
        name,
        area,
        photo: "nothing",
        content,
        userIdx: response.data.idx,
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

  return (
    <section className={styles.attraction_upload_page}>
      <section className={styles.attraction_top}>
        <div className={styles.title_container}>
          <div className={styles.icon_container_one}>
            <i className={`${styles.head_icon} fas fa-map-marker-alt`}></i>
          </div>
          <p className={styles.title}>관광지 추가</p>
        </div>
      </section>
      <section className={styles.main}>
        <form className={styles.main_form}>
          <div className={styles.form_content}>
            <p className={styles.form_text}>관광지 이미지</p>
            <input
              type="file"
              accept="image/jpg,image/png,image/jpeg"
              className={styles.form_input_file}
              onChange={onFileInputChangeHandler}
            />
          </div>
          <div className={styles.form_content}>
            <p className={styles.form_text}>관광지 명</p>
            <input
              type="text"
              className={styles.form_input}
              onChange={nameChangeHandler}
              spellCheck="false"
              placeholder="관광지 명"
            />
          </div>
          <div className={styles.form_content}>
            <p className={styles.form_text}>관광지 위치</p>
            <select
              name="area"
              id="area"
              className={styles.area_select}
              onChange={areaChangeHandler}
            >
              <option value="">위치선택</option>
              <option value="서울">서울</option>
              <option value="경기">경기</option>
              <option value="강원">강원</option>
              <option value="부산">부산</option>
              <option value="인천">인천</option>
              <option value="충남">충남</option>
              <option value="충북">충북</option>
              <option value="대전">대전</option>
              <option value="경북">경북</option>
              <option value="대구">대구</option>
              <option value="경남">경남</option>
              <option value="전북">전북</option>
              <option value="전남">전남</option>
              <option value="광주">광주</option>
              <option value="울산">울산</option>
              <option value="제주">제주</option>
            </select>
          </div>
          <div className={styles.form_content_textarea}>
            <p className={styles.form_text}>관광지 소개</p>
            <textarea
              name="content"
              id="content"
              className={styles.form_textarea}
              onChange={contentChangeHandler}
              spellCheck="false"
              placeholder="관광지 소개"
            ></textarea>
          </div>

          <button className={styles.submit_button} onClick={onSubmitHandler}>
            업로드
          </button>
        </form>
        <div className={styles.image_preview_container}>
          <p className={styles.image_preview_title}>미리보기</p>
          <section className={styles.area_item}>
            <div className={styles.image_container}>
              {previewImage && (
                <img
                  src={previewImage.previewURL}
                  alt="image_preview"
                  className={styles.image_preview}
                />
              )}
              <div className={styles.region_badge}>{area}</div>
            </div>
            <div className={styles.text_container}>
              <div className={styles.area_data_container}>
                <p className={styles.name}>{name}</p>
                <p className={styles.desc}>{content}</p>
              </div>

              <p className={styles.number_of_programs}>0 개의 상품</p>
            </div>
          </section>
        </div>
      </section>
    </section>
  );
};

export default AdminAttractionUploadPage;
