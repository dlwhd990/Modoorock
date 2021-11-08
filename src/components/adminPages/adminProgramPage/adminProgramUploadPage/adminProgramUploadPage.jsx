import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import styles from "./adminProgramUploadPage.module.css";
import StarRatingComponent from "react-star-rating-component";

const AdminProgramUploadPage = ({ user }) => {
  const history = useHistory();
  const params = useParams();
  const [inputValues, setInputValues] = useState({
    title: "",
    price: "",
    theme: "",
    content: "",
    detailContent: "",
  });

  const { title, price, theme, content, detailContent } = inputValues;

  const [previewImage, setPreviewImage] = useState(null);
  const [subImages, setSubImages] = useState(null);
  //const countInputRef = useRef();
  //const [startDate, setStartDate] = useState(new Date());
  //const [time, setTime] = useState("");
  //const [count, setCount] = useState("");
  //const [dateDataList, setDateDataList] = useState([]);
  const [attractionInfo, setAttractionInfo] = useState(null);

  const inputValueChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const loadAttractionInfo = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/attraction/getattractioninfo`, {
        idx: parseInt(params.path_three),
      })
      .then((response) => setAttractionInfo(response.data))
      .catch((err) => console.error(err));
  };

  const onFileInputChangeHandler = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    const blob = file && file.slice(0, file.size, "image/png");
    if (!blob) {
      return;
    }
    const fileName = file.name.split(".");
    const newFile = new File([blob], `${fileName[0]}_main.${fileName[1]}`, {
      type: "image/png",
    });
    reader.onloadend = () => {
      setPreviewImage({
        file: newFile,
        previewURL: reader.result,
      });
      console.log(newFile, reader.result);
    };
    file && reader.readAsDataURL(file);
  };

  const onMultipleFileInputChangeHandler = (event) => {
    const reader = new FileReader();
    const result = [];
    function readFile(index) {
      let files = event.target.files;
      if (index >= files.length) return;
      var file = files[index];
      reader.onload = function (e) {
        result.push(file);
        readFile(index + 1);
      };
      reader.readAsDataURL(file);
    }
    setSubImages(result);
    readFile(0);
  };

  useEffect(() => {
    console.log(subImages);
    console.log(previewImage);
  }, [subImages, previewImage]);

  const insertProgramHandler = (userIdx) => {
    const files = [...subImages, previewImage.file];

    const formData = new FormData();
    formData.append("userIdx", userIdx);
    formData.append("attractionIdx", parseInt(params.path_three));
    formData.append("title", title);
    formData.append("price", price);
    formData.append("content", content);
    formData.append("detailContent", detailContent);
    formData.append("theme", theme);
    files.forEach((file) => {
      formData.append("files", file);
    });

    for (let value of formData.values()) {
      console.log(value);
    }

    axios
      .post(`${process.env.REACT_APP_BASEURL}/exp/insertexp`, formData)
      .then((response) => {
        if (response.data === "success") {
          window.alert("성공적으로 업로드되었습니다.");
          history.push(`/admin/attraction/view/${params.path_three}`);
        } else {
          window.alert("오류가 발생했습니다. 새로고침 후에 다시 시도해주세요");
        }
      })
      .catch((err) => console.error(err));
  };

  const submitButtonHandler = (e) => {
    e.preventDefault();
    const files = subImages &&
      previewImage && [...subImages, previewImage.file];
    if (
      !title ||
      !price ||
      !content ||
      !theme ||
      !detailContent ||
      !files ||
      files.length < 4
    ) {
      window.alert("모든 정보를 입력해주세요");
      return;
    }
    if (files.length > 4) {
      window.alert("서브 이미지는 3장까지만 첨부 가능합니다.");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        console.log(response.data);
        if (response.data === "") {
          window.alert("로그인 후에 사용해주세요");
        } else if (
          response.data.idType !== 1 ||
          response.data.idx !== user.idx
        ) {
          window.alert("권한이 없습니다. 다시 로그인 후에 사용해주세요");
        } else {
          const userIdx = response.data.idx;
          insertProgramHandler(userIdx);
        }
      });
  };

  //const timeChangeHandler = (e) => {
  //  setTime(e.target.value);
  //};
  //
  //const countChangeHandler = (e) => {
  //  setCount(e.target.value);
  //};
  //
  //const saveButtonClickHandler = () => {
  //  if (time === "") {
  //    window.alert("시간을 선택해주세요");
  //    return;
  //  }
  //  if (count === "") {
  //    window.alert("수량을 입력해주세요");
  //    return;
  //  }
  //  if (isNaN(parseInt(count))) {
  //    window.alert("수량에는 숫자만 입력해주세요");
  //    return;
  //  }
  //
  //  setDateDataList(() => {
  //    const year = startDate.getFullYear();
  //    let month = startDate.getMonth() + 1;
  //    let date = startDate.getDate();
  //
  //    if (month < 10) {
  //      month = "0" + month.toString();
  //    }
  //
  //    if (date < 10) {
  //      date = "0" + date.toString();
  //    }
  //
  //    const selectedTime = `${year}-${month}-${date} ${time}`;
  //    const listLength = dateDataList.length;
  //    const newElement = {
  //      idx: listLength === 0 ? 0 : dateDataList[listLength - 1].idx + 1,
  //      time: selectedTime,
  //      amount: parseInt(count),
  //    };
  //    const result = [...dateDataList, newElement];
  //    console.log(result);
  //    countInputRef.current.value = "";
  //    setCount("");
  //    return result;
  //  });
  //};
  //
  //const deleteDateDataHandler = (e) => {
  //  const result = [];
  //
  //  dateDataList.forEach((item) => {
  //    parseInt(e.target.dataset.idx) !== item.idx && result.push(item);
  //  });
  //  setDateDataList(result);
  //  console.log(result);
  //};

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
        <h1 className={styles.section_title}>체험상품 정보 입력</h1>
        <section className={styles.main_container}>
          <form className={styles.main_form}>
            <div className={styles.form_content}>
              <p className={styles.form_text}>메인 이미지</p>
              <input
                type="file"
                accept="image/jpg,image/png,image/jpeg,image/webp"
                className={styles.form_input_file}
                onChange={onFileInputChangeHandler}
              />
            </div>
            <div className={styles.form_content}>
              <p className={styles.form_text}>서브 이미지(3장)</p>
              <input
                type="file"
                accept="image/jpg,image/png,image/jpeg,image/webp"
                className={styles.form_input_file}
                onChange={onMultipleFileInputChangeHandler}
                multiple
              />
            </div>
            <div className={styles.form_content}>
              <p className={styles.form_text}>체험상품 명</p>
              <input
                name="title"
                onChange={inputValueChangeHandler}
                value={title}
                type="text"
                className={styles.form_input}
                spellCheck="false"
                placeholder="체험상품 명"
              />
            </div>
            <div className={styles.form_content}>
              <p className={styles.form_text}>체험상품 가격</p>
              <input
                name="price"
                onChange={inputValueChangeHandler}
                value={price}
                type="text"
                className={styles.form_input}
                spellCheck="false"
                placeholder="체험상품 가격 (숫자만으로 입력)"
              />
            </div>
            <div className={styles.form_content}>
              <p className={styles.form_text}>체험상품 테마</p>
              <select
                name="theme"
                onChange={inputValueChangeHandler}
                value={theme}
                className={styles.theme_select}
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
                onChange={inputValueChangeHandler}
                value={content}
                className={styles.form_textarea}
                spellCheck="false"
                placeholder="상품 소개"
              ></textarea>
            </div>
          </form>
          <section className={styles.image_preview_container}>
            <p className={styles.image_preview_title}>미리보기</p>
            <section className={styles.program_item}>
              <div className={styles.image_container}>
                {previewImage && (
                  <img
                    src={previewImage.previewURL}
                    alt="area_image"
                    className={styles.image}
                  />
                )}
                <div className={styles.area_badge}>{theme}</div>
              </div>
              <div className={styles.text_container}>
                <div className={styles.name_container}>
                  <p className={styles.name}>{title}</p>
                </div>

                <div className={styles.desc_container}>
                  <p className={styles.desc}>{content}</p>
                </div>
                <div className={styles.rate_container}>
                  <div className={styles.star_container}>
                    <StarRatingComponent
                      name="star"
                      editing={false}
                      starCount={5}
                      value={5}
                    />
                    <span className={styles.rate_data}>5.0/5.0</span>
                  </div>
                  <span className={styles.review_count_text}>32개의 리뷰</span>
                </div>
                <div className={styles.price_container}>
                  <p className={styles.price}>{`${price}원`}</p>
                </div>
              </div>
            </section>
          </section>
        </section>
        <div className={styles.detail_content_container}>
          <p className={styles.detail_content_text}>상품 상세 소개</p>
          <textarea
            name="detailContent"
            onChange={inputValueChangeHandler}
            value={detailContent}
            className={styles.detail_content}
            spellCheck="false"
            placeholder="자세한 설명 및 주의사항을 적어주세요"
          ></textarea>
          <button
            className={styles.submit_button}
            onClick={submitButtonHandler}
          >
            업로드
          </button>
        </div>
      </section>
    </section>
  );
};
export default AdminProgramUploadPage;
