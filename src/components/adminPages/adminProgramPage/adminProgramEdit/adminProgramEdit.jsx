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
import SummerNote from "../../../summerNote/summerNote";

registerLocale("ko", ko);

const AdminProgramEdit = (props) => {
  const [item, setItem] = useState(null);
  const history = useHistory();
  const params = useParams();
  const [detailContent, setDetailContent] = useState("");
  const [inputValues, setInputValues] = useState({
    title: "",
    price: "",
    theme: "",
    content: "",
  });

  const { title, price, theme, content } = inputValues;

  const detailContentChangeHandler = (input) => {
    console.log(input);
    setDetailContent(input);
  };

  const countInputRef = useRef();
  const [previewImage, setPreviewImage] = useState(null);
  const [subImages, setSubImages] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [count, setCount] = useState("");
  const [dateDataList, setDateDataList] = useState([]);
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

  const loadTimeTableList = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/exptimetable/getexptimetablelist`,
        {
          expIdx: parseInt(params.path_five),
        }
      )
      .then((response) =>
        setDateDataList(
          response.data.sort((a, b) => (a.time > b.time ? 1 : -1))
        )
      )
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

  //date picker custom input
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button style={{ display: "none" }} onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  const insertProgramHandler = (userIdx) => {
    const formData = new FormData();
    const originalImageList = item.photo.split("#");
    const main = originalImageList.filter((item) => item.includes("_main"));
    const sub = originalImageList.filter((item) => !item.includes("_main"));
    const subString = sub[0] + "#" + sub[1] + "#" + sub[2];
    formData.append("userIdx", userIdx);
    formData.append("idx", parseInt(params.path_five));
    formData.append("attractionIdx", params.path_three);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("content", content);
    formData.append("detailContent", detailContent);
    formData.append("theme", theme);
    //subImages
    //  ? subImages.forEach((file) => {
    //      formData.append("files", file);
    //    })
    //  : previewImage.file !== ""
    //  ? formData.append("files", previewImage.file)
    //  : formData.append("photo", main + "#" + subString);

    if (!subImages && !previewImage.file) {
      formData.append("photo", main + "#" + subString);
    } else if (subImages && previewImage.file === "") {
      subImages.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("photo", main);
    } else if (!subImages && previewImage.file !== "") {
      formData.append("photo", subString);
      formData.append("files", previewImage.file);
    } else {
      subImages.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("files", previewImage.file);
    }

    axios
      .post(`${process.env.REACT_APP_BASEURL}/exp/modifyexp`, formData)
      .then((response) => {
        if (response.data === "success") {
          window.alert("??????????????? ????????????????????????.");
          history.push(`/admin/attraction/view/${params.path_three}`);
        } else {
          window.alert("????????? ??????????????????. ???????????? ?????? ?????? ??????????????????");
        }
      })
      .catch((err) => console.error(err));
  };

  const submitButtonHandler = (e) => {
    e.preventDefault();
    if (!title || !price || !content || !theme) {
      window.alert("?????? ????????? ??????????????????");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (response.data === "") {
          window.alert("????????? ?????? ??????????????????");
        } else if (response.data.idType !== 1) {
          window.alert("????????? ????????????. ?????? ????????? ?????? ??????????????????");
        } else {
          const userIdx = response.data.idx;
          insertProgramHandler(userIdx);
        }
      });
  };

  const saveButtonClickHandler = () => {
    if (time === "") {
      window.alert("????????? ??????????????????");
      return;
    }
    if (count === "") {
      window.alert("????????? ??????????????????");
      return;
    }
    if (isNaN(parseInt(count))) {
      window.alert("???????????? ????????? ??????????????????");
      return;
    }

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

    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/exptimetable/insertexptimetable`,
        {
          expIdx: parseInt(params.path_five),
          time: selectedTime,
          amount: parseInt(count),
        }
      )
      .then((response) => loadTimeTableList());

    countInputRef.current.value = "";
    setCount("");
  };

  const deleteDateDataHandler = (idx) => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/exptimetable/deleteexptimetable`,
        {
          idx,
        }
      )
      .then((response) => loadTimeTableList())
      .catch((err) => console.error(err));
  };

  const timeChangeHandler = (e) => {
    setTime(e.target.value);
  };

  const countChangeHandler = (e) => {
    setCount(e.target.value);
  };

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/exp/getexpinfo`, {
        idx: params.path_five,
      })
      .then((response) => {
        if (response.data.attractionIdx !== parseInt(params.path_three)) {
          window.alert("????????? ???????????????.");
          window.location.href = "/modoorock";
          return;
        }
        axios
          .post(`${process.env.REACT_APP_BASEURL}/user/session`)
          .then((res) => {
            if (res.data.idx !== response.data.userIdx) {
              window.alert("?????? ????????? ????????????.");
              window.location.href = "/modoorock";
              return;
            }
            loadAttractionInfo();
            const data = response.data;
            const imageList = data.photo.split("#");
            const mainImage = imageList.filter((item) =>
              item.includes("_main")
            );
            setItem(data);
            const { title, price, theme, content, detailContent } = data;
            setInputValues({
              title,
              price,
              theme,
              content,
            });
            setDetailContent(detailContent);
            setPreviewImage({
              file: "",
              previewURL: `${process.env.REACT_APP_BASEURL}-images/Exp/${mainImage}`,
            });
          });
        loadTimeTableList();
      })
      .catch((err) => console.error(err));
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
          <p className={styles.subtitle}>????????????</p>
        </div>
      </section>
      <section className={styles.main}>
        <h1 className={styles.section_title}>???????????? ?????? ??????</h1>
        <section className={styles.main_container}>
          <section className={styles.main_form}>
            <p className={styles.form_sub_text}>
              ???????????? ????????? ?????? ????????? ????????? ???????????? ???????????????.
            </p>
            <p className={styles.form_sub_text}>
              ??????) ?????? ????????? ??? ????????? ????????? ?????? ????????????
            </p>
            <div className={styles.form_sub_text}>
              3?????? ????????? ?????? ??????????????? ?????????.
            </div>
            <div className={styles.form_content}>
              <p className={styles.form_text}>?????? ?????????</p>
              <input
                type="file"
                accept="image/jpg,image/png,image/jpeg,image/webp"
                className={styles.form_input_file}
                onChange={onFileInputChangeHandler}
              />
            </div>
            <div className={styles.form_content}>
              <p className={styles.form_text}>?????? ?????????(3???)</p>
              <input
                type="file"
                accept="image/jpg,image/png,image/jpeg,image/webp"
                className={styles.form_input_file}
                onChange={onMultipleFileInputChangeHandler}
                multiple
              />
            </div>
            <div className={styles.form_content}>
              <p className={styles.form_text}>???????????? ???</p>
              <input
                name="title"
                onChange={inputValueChangeHandler}
                value={title}
                type="text"
                className={styles.form_input}
                spellCheck="false"
                placeholder="???????????? ???"
              />
            </div>
            <div className={styles.form_content}>
              <p className={styles.form_text}>???????????? ??????</p>
              <input
                name="price"
                onChange={inputValueChangeHandler}
                value={price}
                type="text"
                className={styles.form_input}
                spellCheck="false"
                placeholder="???????????? ?????? (??????????????? ??????)"
              />
            </div>
            <div className={styles.form_content}>
              <p className={styles.form_text}>???????????? ??????</p>
              <select
                name="theme"
                onChange={inputValueChangeHandler}
                value={theme}
                id="theme"
                className={styles.theme_select}
              >
                <option value="">????????????</option>
                <option value="????????????">????????????</option>
                <option value="????????????">????????????</option>
                <option value="??????">??????</option>
                <option value="??????">??????</option>
                <option value="??????">??????</option>
                <option value="??????">??????</option>
              </select>
            </div>
            <div className={styles.form_content_textarea}>
              <p className={styles.form_text}>?????? ??????</p>
              <textarea
                name="content"
                onChange={inputValueChangeHandler}
                value={content}
                className={styles.form_textarea}
                spellCheck="false"
                placeholder="?????? ??????"
              ></textarea>
            </div>
          </section>
          <section className={styles.image_preview_container}>
            <p className={styles.image_preview_title}>????????????</p>
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
                  <span className={styles.review_count_text}>32?????? ??????</span>
                </div>
                <div className={styles.price_container}>
                  <p className={styles.price}>{`${price}???`}</p>
                </div>
              </div>
            </section>
          </section>
        </section>
        <div className={styles.detail_content_container}>
          <p className={styles.detail_content_text}>?????? ?????? ??????</p>
          {detailContent && (
            <SummerNote
              where="exp"
              onContentChangeHandler={detailContentChangeHandler}
              initial={detailContent}
            />
          )}
          <button
            className={styles.submit_button}
            onClick={submitButtonHandler}
          >
            ?????????
          </button>
        </div>
      </section>
      <section className={styles.date_select_section}>
        <h1 className={styles.section_title}>?????? ??? ?????? ??????</h1>
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
            <p className={styles.time_title}>?????? ??????</p>
            <select className={styles.time_select} onChange={timeChangeHandler}>
              <option value="">?????? ??????</option>
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
            <p className={styles.count_title}>?????? ?????? (?????? 99???)</p>
            <input
              ref={countInputRef}
              type="text"
              className={styles.count_input}
              onChange={countChangeHandler}
              maxLength="2"
              spellCheck="false"
              placeholder="?????? (????????? ??????????????????)"
            />
            <p className={styles.result_title}>?????? ?????? ??????</p>
            <div
              className={styles.result_view}
            >{`${startDate.getFullYear()}??? ${
              startDate.getMonth() + 1
            }??? ${startDate.getDate()}??? ${time.slice(
              0,
              time.length - 3
            )} | ${count}???`}</div>
            <button
              type="button"
              className={styles.save_button}
              onClick={saveButtonClickHandler}
            >
              ??????
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
