import React, { useEffect, useRef, useState } from "react";
import styles from "./adminProgramItemUploadPopup.module.css";
import axios from "axios";
import AdminProgramItemUploadItem from "./adminProgramItemUploadItem/adminProgramItemUploadItem";

const AdminProgramItemUploadPopup = ({
  closeAddItemPopupHandler,
  missionIdx,
  user,
}) => {
  const fileInputRef = useRef();
  const [itemList, setItemList] = useState(null);
  const [inputValues, setInputValues] = useState({
    title: "",
    content: "",
    point: "",
  });

  const { title, content, point } = inputValues;

  const [thumbnail, setThumbnail] = useState(null);

  const onFileInputHandler = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setThumbnail(file);
    };
    file && reader.readAsDataURL(file);
  };

  const resetFileInputHandler = () => {
    fileInputRef.current.value = null;
  };

  const inputChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const insertItem = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (response.data === "" || response.data.idx !== user.idx) {
          window.alert("권한이 없습니다.");
          return;
        }
        const formData = new FormData();
        formData.append("missionIdx", parseInt(missionIdx));
        formData.append("point", parseInt(point));
        formData.append("name", title);
        formData.append("content", content);
        formData.append("files", thumbnail);

        axios
          .post(`${process.env.REACT_APP_BASEURL}/item/insertitem`, formData)
          .then((response) => {
            if (response.data === "success") {
              window.alert("아이템 업로드에 성공했습니다.");
              setInputValues({
                title: "",
                content: "",
                point: "",
              });
              resetFileInputHandler();
              setThumbnail(null);
              loadItemList();
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

  const loadItemList = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/item/getitemlist`, {
        missionIdx: parseInt(missionIdx),
      })
      .then((response) => setItemList(response.data.reverse()))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadItemList();
  }, []);

  return (
    <section className={styles.popup}>
      <div className={styles.popup_top}>
        <div onClick={closeAddItemPopupHandler}>
          <i className={`${styles.close_popup_button} fas fa-times`}></i>
        </div>
        <p className={styles.popup_title}>아이템 추가</p>
      </div>
      <div className={styles.main}>
        <div className={styles.file_container}>
          <p className={styles.text}>미션 사진</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpg,image/png,image/jpeg,image/webp"
            className={styles.file_input}
            onChange={onFileInputHandler}
          />
        </div>

        <div className={styles.container}>
          <p className={styles.text}>아이템 이름</p>
          <input
            value={title}
            onChange={inputChangeHandler}
            name="title"
            type="text"
            className={styles.input}
            spellCheck="false"
            placeholder="아이템 이름"
          />
        </div>
        <div
          className={`${styles.content_container} ${styles.container_large}`}
        >
          <p className={styles.text}>아이템 내용</p>
          <textarea
            value={content}
            onChange={inputChangeHandler}
            name="content"
            className={styles.textarea}
            spellCheck="false"
            placeholder="아이템 내용"
          ></textarea>
        </div>
        <div className={`${styles.score_container} ${styles.container}`}>
          <p className={styles.text}>아이템 포인트</p>
          <input
            value={point}
            onChange={inputChangeHandler}
            name="point"
            type="text"
            className={styles.input}
            spellCheck="false"
            placeholder="점수 (숫자로만 입력)"
          />
        </div>
        <button type="button" className={styles.button} onClick={insertItem}>
          아이템 추가
        </button>
      </div>
      <div className={styles.list}>
        {itemList &&
          itemList.map((item) => (
            <AdminProgramItemUploadItem
              key={item.idx}
              item={item}
              loadItemList={loadItemList}
            />
          ))}
      </div>

      <p className={styles.qr_link}>
        <a href="https://ko.online-qrcode-generator.com/">QR코드 생성 링크</a>
        (아이템에 기재 되어있는 'QR코드번호'를 입력해서 생성해주세요)
      </p>
    </section>
  );
};

export default AdminProgramItemUploadPopup;
