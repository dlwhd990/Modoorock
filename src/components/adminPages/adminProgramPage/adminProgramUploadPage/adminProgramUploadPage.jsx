import axios from "axios";
import React, { useEffect, useState, forwardRef, useRef } from "react";
import { useHistory, useParams } from "react-router";
import styles from "./adminProgramUploadPage.module.css";
import StarRatingComponent from "react-star-rating-component";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import "./datePicker.css";
import "../../../../../node_modules/react-datepicker/dist/react-datepicker.css";
import AdminProgramUploadTimeItem from "./adminProgramUploadTimeItem/adminProgramUploadTimeItem";

registerLocale("ko", ko);

const AdminProgramUploadPage = ({ user }) => {
  const history = useHistory();
  const params = useParams();
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
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setPreviewImage({
        file: file,
        previewURL: reader.result,
      });
      console.log(file, reader.result);
    };
    file && reader.readAsDataURL(file);
  };

  const onMultipleFileInputChangeHandler = (event) => {
    let reader = new FileReader();
    function readFile(index) {
      let files = event.target.files;
      if (index >= files.length) return;
      var file = files[index];
      reader.onload = function (e) {
        setSubImages(e.target.result);
        readFile(index + 1);
      };
      reader.readAsDataURL(file);
    }
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

  //const insertAttraction = (userData) => {
  //  console.log(userData);
  //  axios
  //    .post(`${process.env.REACT_APP_BASEURL}/attraction/insertattraction`, {
  //      name,
  //      area,
  //      photo: "nothing",
  //      content,
  //      userIdx: userData.data.idx,
  //    })
  //    .then((res) => {
  //      if (res.data === "success") {
  //        window.alert("성공적으로 업로드 되었습니다");
  //        history.push("/admin/attraction");
  //      }
  //    })
  //    .catch((err) => console.error(err));
  //};
  //
  //const onSubmitHandler = (e) => {
  //  e.preventDefault();
  //  if (name === "" || content === "" || area === "" || !previewImage) {
  //    window.alert("모든 사항을 입력해주세요");
  //    return;
  //  }
  //  axios
  //    .post(`${process.env.REACT_APP_BASEURL}/user/session`)
  //    .then((response) => {
  //      console.log(response);
  //      if (
  //        response.data !== "" &&
  //        response.data.idType === 1 &&
  //        response.data.idx === user.idx
  //      ) {
  //        insertAttraction(response);
  //      } else {
  //        window.alert("로그인 정보가 맞지 않습니다.");
  //      }
  //    })
  //    .catch((err) => console.error(err));
  //};

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
            <p className={styles.form_text}>메인 이미지</p>
            <input
              type="file"
              accept="image/jpg,image/png,image/jpeg"
              className={styles.form_input_file}
              onChange={onFileInputChangeHandler}
            />
          </div>
          <div className={styles.form_content}>
            <p className={styles.form_text}>서브 이미지(3장)</p>
            <input
              type="file"
              accept="image/jpg,image/png,image/jpeg"
              className={styles.form_input_file}
              onChange={onMultipleFileInputChangeHandler}
              multiple
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
              onChange={priceChangeHandler}
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
              name="content"
              id="content"
              className={styles.form_textarea}
              onChange={contentChangeHandler}
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
      <section className={styles.date_select_section}>
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
              <AdminProgramUploadTimeItem key={item.idx} item={item} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};
export default AdminProgramUploadPage;
