import axios from "axios";
import React, { useEffect, useState, forwardRef, useRef } from "react";
import { useHistory, useParams } from "react-router";
import styles from "./adminProgramEdit.module.css";
import StarRatingComponent from "react-star-rating-component";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import "./datePicker.css";
import "../../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import AdminProgramUploadTimeItem from "./adminProgramUploadTimeItem/adminProgramUploadTimeItem";

registerLocale("ko", ko);

const AdminProgramEdit = (props) => {
  const [item, setItem] = useState(null);
  const history = useHistory();
  const params = useParams();
  const titleRef = useRef();
  const priceRef = useRef();
  const themeRef = useRef();
  const contentRef = useRef();
  const countInputRef = useRef();
  const [previewImage, setPreviewImage] = useState(null);
  const [subImages, setSubImages] = useState(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [theme, setTheme] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [count, setCount] = useState("");
  const [dateDataList, setDateDataList] = useState([]);
  const [attractionInfo, setAttractionInfo] = useState(null);

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

  //date picker custom input
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button style={{ display: "none" }} onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  const insertProgramHandler = (userIdx) => {
    const title = titleRef.current.value;
    const price = priceRef.current.value;
    const content = contentRef.current.value;
    const theme = themeRef.current.value;
    const files = [...subImages, previewImage.file];

    const formData = new FormData();
    formData.append("userIdx", userIdx);
    formData.append("attractionIdx", params.path_three);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("content", content);
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
    const title = titleRef.current.value;
    const price = priceRef.current.value;
    const content = contentRef.current.value;
    const theme = themeRef.current.value;
    const files = subImages &&
      previewImage && [...subImages, previewImage.file];
    if (!title || !price || !content || !theme || !files || files.length < 4) {
      window.alert("모든 정보를 입력해주세요");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        console.log(response.data);
        if (response.data === "") {
          window.alert("로그인 후에 사용해주세요");
        } else if (response.data.idType !== 1) {
          window.alert("권한이 없습니다. 다시 로그인 후에 사용해주세요");
        } else {
          const userIdx = response.data.idx;
          insertProgramHandler(userIdx);
        }
      });
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const themeChangeHandler = (e) => {
    setTheme(e.target.value);
  };

  const contentChangeHandler = (e) => {
    setContent(e.target.value);
  };

  const priceChangeHandler = (e) => {
    if (isNaN(parseInt(e.target.value))) {
      setPrice("");
      return;
    }
    setPrice(parseInt(e.target.value).toLocaleString("ko-KR"));
  };

  const timeChangeHandler = (e) => {
    setTime(e.target.value);
  };

  const countChangeHandler = (e) => {
    setCount(e.target.value);
  };

  const saveButtonClickHandler = () => {
    if (time === "") {
      window.alert("시간을 선택해주세요");
      return;
    }
    if (count === "") {
      window.alert("수량을 입력해주세요");
      return;
    }
    if (isNaN(parseInt(count))) {
      window.alert("수량에는 숫자만 입력해주세요");
      return;
    }

    setDateDataList(() => {
      const year = startDate.getFullYear();
      let month = startDate.getMonth() + 1;
      let date = startDate.getDate();

      if (month < 10) {
        month = "0" + month.toString();
      }

      if (date < 10) {
        date = "0" + date.toString();
      }

      const selectedTime = `${year}-${month}-${date} ${time}`;
      const listLength = dateDataList.length;
      const newElement = {
        idx: listLength === 0 ? 0 : dateDataList[listLength - 1].idx + 1,
        time: selectedTime,
        amount: parseInt(count),
      };
      const result = [...dateDataList, newElement];
      console.log(result);
      countInputRef.current.value = "";
      setCount("");
      return result;
    });
  };

  const deleteDateDataHandler = (e) => {
    const result = [];

    dateDataList.forEach((item) => {
      parseInt(e.target.dataset.idx) !== item.idx && result.push(item);
    });
    setDateDataList(result);
    console.log(result);
  };

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/exp/getexpinfo`, {
        idx: params.path_five,
      })
      .then((response) => {
        if (response.data.attractionIdx !== parseInt(params.path_three)) {
          window.alert("잘못된 접근입니다.");
          window.location.href = "/";
          return;
        }
        axios
          .post(`${process.env.REACT_APP_BASEURL}/user/session`)
          .then((res) => {
            if (res.data.idx !== response.data.userIdx) {
              window.alert("접근 권한이 없습니다.");
              window.location.href = "/";
              return;
            }
            const data = response.data;
            const imageList = data.photo.split("#");
            const mainImage = imageList.filter((item) =>
              item.includes("_main")
            );

            setItem(data);
            setName(data.title);
            setPrice(data.price);
            setTheme(data.theme);
            setContent(data.content);
            setPreviewImage({
              file: null,
              previewURL: `${process.env.REACT_APP_BASEURL}-images/Exp/${mainImage}`,
            });
            titleRef.current.value = data.title;
            priceRef.current.value = data.price;
            contentRef.current.value = data.content;
            themeRef.current.value = data.theme;
          });
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    loadAttractionInfo();
  }, []);

  return (
    <section className={styles.edit_page}>
      <section className={styles.edit_top}>
        <div className={styles.title_container}>
          <div className={styles.icon_container_one}>
            <i className={`${styles.head_icon} fas fa-map-marker-alt`}></i>
          </div>
          <p className={styles.title}>
            {item && attractionInfo && `${attractionInfo.name} - ${item.title}`}
          </p>
          <p className={styles.subtitle}>정보수정</p>
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
                ref={titleRef}
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
                ref={priceRef}
                type="text"
                className={styles.form_input}
                onChange={priceChangeHandler}
                spellCheck="false"
                placeholder="체험상품 가격 (숫자만으로 입력)"
              />
            </div>
            <div className={styles.form_content}>
              <p className={styles.form_text}>체험상품 테마</p>
              <select
                ref={themeRef}
                name="theme"
                id="theme"
                className={styles.theme_select}
                onChange={themeChangeHandler}
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
                ref={contentRef}
                name="content"
                id="content"
                className={styles.form_textarea}
                onChange={contentChangeHandler}
                spellCheck="false"
                placeholder="상품 소개"
              ></textarea>
            </div>
            <button
              className={styles.submit_button}
              onClick={submitButtonHandler}
            >
              업로드
            </button>
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
                  <p className={styles.name}>{name}</p>
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
      </section>
      <section className={styles.date_select_section}>
        <h1 className={styles.section_title}>일정 및 수량 입력</h1>
        <div className={styles.time_select_and_result_view}>
          <div className={styles.date_picker_container}>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
              }}
              locale="ko"
              open="true"
              dateFormat="yyyy-MM-dd"
              popperPlacement={"top-start"}
              customInput={<ExampleCustomInput />}
              calendarClassName="calendar"
              inline
            />
          </div>
          <div className={styles.time_and_count_select_container}>
            <p className={styles.time_title}>시간 선택</p>
            <select className={styles.time_select} onChange={timeChangeHandler}>
              <option value="">시간 선택</option>
              <option value="08:00:00">08:00</option>
              <option value="08:30:00">08:30</option>
              <option value="09:00:00">09:00</option>
              <option value="09:30:00">09:30</option>
              <option value="10:00:00">10:00</option>
              <option value="10:30:00">10:30</option>
              <option value="11:00:00">11:00</option>
              <option value="11:30:00">11:30</option>
              <option value="12:00:00">12:00</option>
              <option value="12:30:00">12:30</option>
              <option value="13:00:00">13:00</option>
              <option value="13:30:00">13:30</option>
              <option value="14:00:00">14:00</option>
              <option value="14:30:00">14:30</option>
              <option value="15:00:00">15:00</option>
              <option value="15:30:00">15:30</option>
              <option value="16:00:00">16:00</option>
              <option value="16:30:00">16:30</option>
              <option value="17:00:00">17:00</option>
              <option value="17:30:00">17:30</option>
              <option value="18:00:00">18:00</option>
              <option value="18:30:00">18:30</option>
              <option value="19:00:00">19:00</option>
              <option value="19:30:00">19:30</option>
              <option value="20:00:00">20:00</option>
              <option value="20:30:00">20:30</option>
              <option value="21:00:00">21:00</option>
              <option value="21:30:00">21:30</option>
              <option value="22:00:00">22:00</option>
            </select>
            <p className={styles.count_title}>수량 입력 (최대 99개)</p>
            <input
              ref={countInputRef}
              type="text"
              className={styles.count_input}
              onChange={countChangeHandler}
              maxLength="2"
              spellCheck="false"
              placeholder="수량 (숫자만 입력해주세요)"
            />
            <p className={styles.result_title}>입력 정보 확인</p>
            <div
              className={styles.result_view}
            >{`${startDate.getFullYear()}년 ${
              startDate.getMonth() + 1
            }월 ${startDate.getDate()}일 ${time.slice(
              0,
              time.length - 3
            )} | ${count}개`}</div>
            <button
              className={styles.save_button}
              onClick={saveButtonClickHandler}
            >
              저장
            </button>
          </div>
          <div className={styles.view_date_result_container}>
            {dateDataList.map((item) => (
              <AdminProgramUploadTimeItem
                key={item.idx}
                item={item}
                deleteDateDataHandler={deleteDateDataHandler}
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default AdminProgramEdit;
