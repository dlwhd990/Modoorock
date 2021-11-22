import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./adminAttractionUploadPage.module.css";

const AdminAttractionUploadPage = ({ user, backgroundList }) => {
  const history = useHistory();
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [area, setArea] = useState("");
  const [templatePopupOn, setTemplatePopupOn] = useState(false);
  const [mainBgPopupOn, setMainBgPopupOn] = useState(false);
  const [gameBgPopupOn, setGameBgPopupOn] = useState(false);
  const [nowTemplateButtonOrder, setNowTemplateButtonOrder] = useState(null);
  const [backgroundNameList, setBackgroundNameList] = useState(null);
  const [mainBackground, setMainBackground] = useState(null);
  const [gameBackground, setGameBackground] = useState(null);
  const [tmpMainBackground, setTmpMainBackground] = useState(null);
  const [tmpGameBackground, setTmpGameBackground] = useState(null);

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
    const formData = new FormData();
    formData.append("name", name);
    formData.append("area", area);
    formData.append("content", content);
    formData.append("userIdx", userData.idx);
    formData.append("files", previewImage.file);
    formData.append("mainPhoto", mainBackground);
    formData.append("gamePhoto", gameBackground);
    nowTemplateButtonOrder.forEach((item) => {
      formData.append("menuOrderList", item.idx);
    });

    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/attraction/insertattraction`,
        formData
      )
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
    if (
      name === "" ||
      content === "" ||
      area === "" ||
      !previewImage ||
      !mainBackground ||
      !gameBackground ||
      !nowTemplateButtonOrder
    ) {
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
          insertAttraction(response.data);
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

  const templatePopupHandler = () => {
    setTemplatePopupOn(!templatePopupOn);
  };

  const mainBgPopupHandler = () => {
    setMainBgPopupOn(!mainBgPopupOn);
  };

  const gameBgPopupHandler = () => {
    setGameBgPopupOn(!gameBgPopupOn);
  };

  const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
  };

  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  const onDragStart = (e) => {
    const initialPosition = Number(e.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: nowTemplateButtonOrder,
    });
    e.dataTransfer.setData("text/html", "");
  };

  const onDragOver = (e) => {
    e.preventDefault();
    let newList = dragAndDrop.originalOrder;
    const draggedFrom = dragAndDrop.draggedFrom;
    const draggedTo = Number(e.currentTarget.dataset.position);
    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFrom
    );

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDrop = () => {
    setNowTemplateButtonOrder(dragAndDrop.updatedOrder);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  const templateButtonSelectHandler = (e) => {
    const idx = e.currentTarget.dataset.num;
    const name = e.currentTarget.innerText;

    if (!nowTemplateButtonOrder) {
      templatePopupHandler();
      setNowTemplateButtonOrder([{ idx, name }]);
      return;
    }

    if (nowTemplateButtonOrder.length === 5) {
      window.alert("버튼은 5개까지 등록 가능합니다.");
      return;
    }
    for (let i = 0; i < nowTemplateButtonOrder.length; i++) {
      if (nowTemplateButtonOrder[i].idx === idx) {
        window.alert("이미 존재하는 버튼은 다시 추가할 수 없습니다.");
        return;
      }
    }
    templatePopupHandler();
    setNowTemplateButtonOrder([...nowTemplateButtonOrder, { idx, name }]);
  };

  const makeBackgroundNameList = () => {
    setBackgroundNameList(backgroundList.slice(0, backgroundList.length - 1));
  };

  const selectMainBackgroundHandler = (e) => {
    setTmpMainBackground(e.currentTarget.dataset.name);
  };

  const selectGameBackgroundHandler = (e) => {
    setTmpGameBackground(e.currentTarget.dataset.name);
  };

  const saveGameBackground = () => {
    setGameBackground(tmpGameBackground);
    setGameBgPopupOn(false);
  };

  const saveMainBackground = () => {
    setMainBackground(tmpMainBackground);
    setMainBgPopupOn(false);
  };

  const buttonDeleteHandler = (e) => {
    const result = [];
    nowTemplateButtonOrder.forEach((item) => {
      item.idx !== e.currentTarget.dataset.num && result.push(item);
    });
    setNowTemplateButtonOrder(result);
  };

  useEffect(() => {
    makeBackgroundNameList();
  }, []);

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
        <h1 className={styles.section_title}>관광지 정보 입력</h1>
        <div className={styles.main_container}>
          <form className={styles.main_form}>
            <div className={styles.form_content}>
              <p className={styles.form_text}>관광지 이미지</p>
              <input
                type="file"
                accept="image/jpg,image/png,image/jpeg,image/webp"
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
                <option value="충남·대전">충남·대전</option>
                <option value="충북">충북</option>
                <option value="경북·대구">경북·대구</option>
                <option value="경남">경남</option>
                <option value="전북">전북</option>
                <option value="전남·광주">전남·광주</option>
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
        </div>
      </section>
      <section className={styles.template_setting_container}>
        <h1 className={styles.section_title}>템플릿 등록</h1>
        <div className={styles.form_content}>
          <p className={styles.form_text}>버튼 추가</p>
          <div className={styles.template_input_container}>
            <button
              className={styles.template_popup_on_button}
              onClick={templatePopupHandler}
            >
              설정
            </button>
          </div>
        </div>
        <div className={styles.form_content}>
          <p className={styles.form_text}>메인 배경</p>
          <button
            className={styles.template_popup_on_button}
            onClick={mainBgPopupHandler}
          >
            설정
          </button>
        </div>
        <div className={styles.form_content}>
          <p className={styles.form_text}>게임 배경</p>
          <button
            className={styles.template_popup_on_button}
            onClick={gameBgPopupHandler}
          >
            설정
          </button>
        </div>
        <section className={styles.button_order_setting_and_preview_container}>
          <section className={styles.button_order_setting_container}>
            <section className={styles.button_order_setting_top}>
              <p className={styles.button_order_setting_title}>버튼 설정</p>
              <p className={styles.button_order_setting_subtitle}>
                드래그하여 순서 변경
              </p>
            </section>
            <section className={styles.button_order_setting_main}>
              <div className={styles.button_order_setting_main_header}>
                <p className={styles.button_order_setting_main_header_id}>
                  번호
                </p>
                <p className={styles.button_order_setting_main_header_name}>
                  버튼명
                </p>
                <p className={styles.button_order_setting_main_header_edit}>
                  삭제
                </p>
              </div>
              {nowTemplateButtonOrder &&
                nowTemplateButtonOrder.map((item, index) => (
                  <div
                    key={item.idx}
                    data-position={index}
                    className={styles.template_button_item}
                    draggable="true"
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                  >
                    <p className={styles.template_button_id}>{item.idx}</p>
                    <p className={styles.template_button_name}>{item.name}</p>
                    <div data-num={item.idx} onClick={buttonDeleteHandler}>
                      <i
                        className={`${styles.template_button_icon} fas fa-times`}
                      ></i>
                    </div>
                  </div>
                ))}
            </section>
          </section>
          <section className={styles.template_preview_container}>
            <section className={styles.template_preview}>
              {mainBackground && (
                <img
                  src={`${process.env.REACT_APP_BASEURL}-images/bg/${mainBackground}`}
                  alt=""
                  className={styles.background_preview}
                />
              )}
            </section>
            <section className={styles.template_preview}>
              {gameBackground && (
                <img
                  src={`${process.env.REACT_APP_BASEURL}-images/bg/${gameBackground}`}
                  alt=""
                  className={styles.background_preview}
                />
              )}
            </section>
          </section>
        </section>
      </section>
      <button className={styles.submit_button} onClick={onSubmitHandler}>
        업로드
      </button>
      {templatePopupOn && (
        <section className={styles.popup_filter}>
          <div className={styles.template_popup_container}>
            <div className={styles.popup_top}>
              <div onClick={templatePopupHandler}>
                <i className={`${styles.close_popup_button} fas fa-times`}></i>
              </div>
              <p className={styles.popup_title}>버튼 추가</p>
            </div>

            <div className={styles.template_popup_main}>
              <div
                className={styles.template_popup_select}
                data-num={1}
                onClick={templateButtonSelectHandler}
              >
                게임시작
              </div>
              <div
                className={styles.template_popup_select}
                data-num={2}
                onClick={templateButtonSelectHandler}
              >
                게임설명
              </div>
              <div
                className={styles.template_popup_select}
                data-num={3}
                onClick={templateButtonSelectHandler}
              >
                랭킹보기
              </div>
              <div
                className={styles.template_popup_select}
                data-num={4}
                onClick={templateButtonSelectHandler}
              >
                지도
              </div>
              <div
                className={styles.template_popup_select}
                data-num={5}
                onClick={templateButtonSelectHandler}
              >
                홈페이지
              </div>
            </div>
          </div>
        </section>
      )}
      {mainBgPopupOn && (
        <section className={styles.popup_filter}>
          <div className={styles.template_popup_container}>
            <div className={styles.popup_top}>
              <div onClick={mainBgPopupHandler}>
                <i className={`${styles.close_popup_button} fas fa-times`}></i>
              </div>
              <p className={styles.popup_title}>메인 배경 설정</p>
            </div>

            <div className={styles.background_popup_main}>
              {backgroundNameList &&
                backgroundNameList.map((item) => (
                  <img
                    key={item}
                    data-name={item}
                    src={`${process.env.REACT_APP_BASEURL}-images/bg/${item}`}
                    alt="background_image"
                    className={`${
                      tmpMainBackground === item
                        ? `${styles.bg_image} ${styles.background_selected}`
                        : `${styles.bg_image}`
                    }`}
                    onClick={selectMainBackgroundHandler}
                  />
                ))}
            </div>
            <div className={styles.select_button_container}>
              <button
                className={styles.select_button}
                onClick={saveMainBackground}
              >
                선택
              </button>
            </div>
          </div>
        </section>
      )}
      {gameBgPopupOn && (
        <section className={styles.popup_filter}>
          <div className={styles.template_popup_container}>
            <div className={styles.popup_top}>
              <div onClick={gameBgPopupHandler}>
                <i className={`${styles.close_popup_button} fas fa-times`}></i>
              </div>
              <p className={styles.popup_title}>게임 배경 설정</p>
            </div>

            <div className={styles.background_popup_main}>
              {backgroundNameList &&
                backgroundNameList.map((item) => (
                  <img
                    key={item}
                    data-name={item}
                    src={`${process.env.REACT_APP_BASEURL}-images/bg/${item}`}
                    alt="background_image"
                    className={`${
                      tmpGameBackground === item
                        ? `${styles.bg_image} ${styles.background_selected}`
                        : `${styles.bg_image}`
                    }`}
                    onClick={selectGameBackgroundHandler}
                  />
                ))}
            </div>
            <div className={styles.select_button_container}>
              <button
                className={styles.select_button}
                onClick={saveGameBackground}
              >
                선택
              </button>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default AdminAttractionUploadPage;
