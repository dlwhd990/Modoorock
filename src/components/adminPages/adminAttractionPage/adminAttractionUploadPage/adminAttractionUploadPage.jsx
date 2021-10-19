import React from "react";
import styles from "./adminAttractionUploadPage.module.css";

const AdminAttractionUploadPage = (props) => {
  const onFileInputChangeHandler = (e) => {
    console.log(e.target);
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
              className={styles.form_input_file}
              onChange={onFileInputChangeHandler}
            />
          </div>
          <div className={styles.form_content}>
            <p className={styles.form_text}>관광지 명</p>
            <input
              type="text"
              className={styles.form_input}
              spellCheck="false"
              placeholder="관광지 명"
            />
          </div>
          <div className={styles.form_content}>
            <p className={styles.form_text}>관광지 위치</p>
            <select name="area" id="area" className={styles.area_select}>
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
              name="desc"
              id="desc"
              className={styles.form_textarea}
              spellCheck="false"
              placeholder="관광지 소개"
            ></textarea>
          </div>
          <div className={styles.button_container}>
            <button className={styles.submit_button}>업로드</button>
          </div>
        </form>
        <div className={styles.image_preview_container}>
          <div className={styles.image_preview_border}>
            <img src="" alt="image_preview" className={styles.image_preview} />
          </div>
        </div>
      </section>
    </section>
  );
};

export default AdminAttractionUploadPage;
