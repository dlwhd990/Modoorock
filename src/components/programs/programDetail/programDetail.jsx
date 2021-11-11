import React, { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router";
import CustomPaging from "../../slick/customPaging/customPaging";
import styles from "./programDetail.module.css";
import ProgramReview from "./programReview/programReview";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import LoadingPage from "../../loadingPage/loadingPage";

const ProgramDetail = ({ reviewList, toss }) => {
  const history = useHistory();
  const [program, setProgram] = useState(null);
  const [imageList, setImageList] = useState(null);
  const [review, setReview] = useState([]);
  const [statSeparate, setStatSeparate] = useState([]);
  const [reviewAvg, setReviewAvg] = useState(null);
  const { path } = useParams();
  const toInquireRef = useRef();
  const [inputValues, setInputValues] = useState({
    title: "",
    content: "",
  });

  const { title, content } = inputValues;

  const inputValueChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const onSelectHandler = (e) => {};

  const goPurchasePage = () => {
    //history.push("/"); //경로설정
    toss({
      amount: 100,
      orderId: "iWeB_-MPG2v2JwhIj28K6",
      orderName: "토스 티셔츠 외 2건",
      customerName: "박토스",
      successUrl: window.location.origin + "/success",
      failUrl: window.location.origin + "/fail",
    });
  };

  const loadProgramInfo = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/exp/getexpinfo`, {
        idx: path,
      })
      .then((response) => {
        setProgram(response.data);
        setImageList(response.data.photo.split("#").reverse());
      })
      .catch((err) => console.error(err));
  };

  const inquireButtonHandler = () => {
    toInquireRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const uploadInquire = (res) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/qna/insertqna`, {
        userIdx: res.data.idx,
        expIdx: parseInt(path),
        title,
        content,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert(
            "문의가 완료되었습니다. 해당 내용은 '문의게시판' 에서 열람 가능합니다."
          );
          setInputValues({
            title: "",
            content: "",
          });
        } else {
          window.alert("에러가 발생했습니다. 새로고침 후에 다시 시도해주세요.");
        }
      })
      .catch((err) => console.error(err));
  };

  const writeSubmitHandler = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((res) => {
        if (res.data === "") {
          window.alert("로그인 후에 문의가 가능합니다.");
          return;
        }
        uploadInquire(res); //문의글 업로드 함수
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const result = [];
    const separate = [0, 0, 0, 0, 0];
    let total = 0;
    loadProgramInfo();
    reviewList.forEach((item) => {
      item.exp_idx === parseInt(path) &&
        result.push(item) &&
        (total += item.stars) &&
        (separate[item.stars - 1] += 1);
    });
    setStatSeparate(separate);
    result.sort((a, b) =>
      b.date > a.date ? 1 : b.date === a.date ? (b.date > a.date ? 1 : -1) : -1
    );
    setReview(result);

    setReviewAvg(() => {
      if (result.length === 0) {
        return "0.0";
      }
      return (total / result.length).toFixed(1);
    });
  }, []);

  return (
    <section className={styles.program_detail}>
      <section className={styles.top_banner}></section>
      <section className={styles.select_bar_container}>
        <div
          className={`${styles.select_button} ${styles.on}`}
          onClick={onSelectHandler}
        >
          프로그램 상세
        </div>
      </section>
      {program ? (
        <section>
          <section className={styles.program_detail_main}>
            <div className={styles.image_container}>
              {imageList && <CustomPaging imageList={imageList} />}
            </div>
            <div className={styles.text_container}>
              <div className={styles.text_data_box}>
                <p className={styles.name}>{program && program.title}</p>
                <p className={styles.price}>
                  {`${program.price.toLocaleString("ko-KR")}원`}
                </p>
                <div className={styles.rate_container}>
                  <div className={styles.star_container}>
                    {reviewAvg && (
                      <ReactStars
                        count={5}
                        edit={false}
                        size={28}
                        value={parseFloat(reviewAvg)}
                        activeColor="#ffd700"
                        isHalf={true}
                      />
                    )}

                    <span className={styles.rate_data}>{`${
                      program && reviewAvg
                    }/5.0`}</span>
                  </div>
                  <span
                    className={styles.review_count_text}
                  >{`${review.length}개의 리뷰`}</span>
                </div>
                <p className={styles.content}>{program && program.content}</p>
              </div>
              <div className={styles.button_container}>
                <button
                  className={styles.reservation_button}
                  onClick={goPurchasePage}
                >
                  예약하기
                </button>
                <button
                  className={styles.inquire_button}
                  onClick={inquireButtonHandler}
                >
                  문의하기
                </button>
              </div>
            </div>
          </section>
          <section className={styles.detail_content_container}>
            <section className={styles.detail_content_main}>
              {imageList && (
                <img
                  src={`${process.env.REACT_APP_BASEURL}-images/Exp/${imageList[0]}`}
                  alt="main_image"
                  className={styles.detail_content_main_image}
                />
              )}
              <p className={styles.detail_content_text}>
                {program.detailContent}
              </p>
            </section>
          </section>
          <section className={styles.review_container}>
            <div className={styles.review_top_container}>
              <p
                className={styles.review_top_data_count}
              >{`리뷰 ${review.length}개`}</p>
              <p className={styles.review_top_data_slash}>|</p>

              {reviewAvg && (
                <ReactStars
                  count={5}
                  edit={false}
                  size={24}
                  value={parseFloat(reviewAvg)}
                  activeColor="#ffd700"
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                />
              )}
              <p
                className={styles.review_top_data_rate}
              >{`${reviewAvg}/5.0`}</p>
            </div>
            <section className={styles.review_main}>
              <section className={styles.stat_container}>
                <div className={styles.stat_box}>
                  <p className={styles.stat_title}>별점 & 리뷰</p>
                  <div className={styles.stat_all_avg_container}>
                    {reviewAvg && (
                      <ReactStars
                        count={5}
                        edit={false}
                        size={28}
                        value={parseFloat(reviewAvg)}
                        activeColor="#ffd700"
                        isHalf={true}
                      />
                    )}
                    <p className={styles.stat_all_avg}>{reviewAvg}</p>
                  </div>
                  <p
                    className={styles.stat_review_count}
                  >{`${review.length} 리뷰`}</p>
                  <div className={styles.stat_separate_container}>
                    <div className={styles.stat_separate}>
                      <p className={styles.stat_name}>5점</p>
                      <div className={styles.stat_bar_background}>
                        <div
                          className={styles.stat_bar_color}
                          style={{
                            width: `${
                              review.length === 0
                                ? 0
                                : parseInt(
                                    (statSeparate[4] / review.length) * 100
                                  )
                            }%`,
                          }}
                        ></div>
                      </div>
                      <p className={styles.stat_percentage}>
                        {`${
                          review.length === 0
                            ? 0
                            : parseInt((statSeparate[4] / review.length) * 100)
                        }%`}
                      </p>
                    </div>
                    <div className={styles.stat_separate}>
                      <p className={styles.stat_name}>4점</p>
                      <div className={styles.stat_bar_background}>
                        <div
                          className={styles.stat_bar_color}
                          style={{
                            width: `${
                              review.length === 0
                                ? 0
                                : parseInt(
                                    (statSeparate[3] / review.length) * 100
                                  )
                            }%`,
                          }}
                        ></div>
                      </div>
                      <p className={styles.stat_percentage}>
                        {`${
                          review.length === 0
                            ? 0
                            : parseInt((statSeparate[3] / review.length) * 100)
                        }%`}
                      </p>
                    </div>
                    <div className={styles.stat_separate}>
                      <p className={styles.stat_name}>3점</p>
                      <div className={styles.stat_bar_background}>
                        <div
                          className={styles.stat_bar_color}
                          style={{
                            width: `${
                              review.length === 0
                                ? 0
                                : parseInt(
                                    (statSeparate[2] / review.length) * 100
                                  )
                            }%`,
                          }}
                        ></div>
                      </div>
                      <p className={styles.stat_percentage}>
                        {`${
                          review.length === 0
                            ? 0
                            : parseInt((statSeparate[2] / review.length) * 100)
                        }%`}
                      </p>
                    </div>
                    <div className={styles.stat_separate}>
                      <p className={styles.stat_name}>2점</p>
                      <div className={styles.stat_bar_background}>
                        <div
                          className={styles.stat_bar_color}
                          style={{
                            width: `${
                              review.length === 0
                                ? 0
                                : parseInt(
                                    (statSeparate[1] / review.length) * 100
                                  )
                            }%`,
                          }}
                        ></div>
                      </div>
                      <p className={styles.stat_percentage}>
                        {`${
                          review.length === 0
                            ? 0
                            : parseInt((statSeparate[1] / review.length) * 100)
                        }%`}
                      </p>
                    </div>
                    <div className={styles.stat_separate}>
                      <p className={styles.stat_name}>1점</p>
                      <div className={styles.stat_bar_background}>
                        <div
                          className={styles.stat_bar_color}
                          style={{
                            width: `${
                              review.length === 0
                                ? 0
                                : parseInt(
                                    (statSeparate[0] / review.length) * 100
                                  )
                            }%`,
                          }}
                        ></div>
                      </div>
                      <p className={styles.stat_percentage}>
                        {`${
                          review.length === 0
                            ? 0
                            : parseInt((statSeparate[0] / review.length) * 100)
                        }%`}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <div className={styles.review_items_container}>
                {review.length === 0 ? (
                  <p className={styles.no_review}>리뷰가 없습니다.</p>
                ) : (
                  review.map((item) => (
                    <ProgramReview key={item.idx} review={item} />
                  ))
                )}
              </div>
            </section>
          </section>
          <section className={styles.inquire_top_container}>
            <p className={styles.inquire_title}>문의하기</p>
          </section>
          <section ref={toInquireRef} className={styles.inquire_main_container}>
            <div className={styles.title_input_container}>
              <p className={styles.title_text}>제목</p>
              <input
                name="title"
                onChange={inputValueChangeHandler}
                value={title}
                type="text"
                className={styles.title_input}
                spellCheck="false"
                placeholder="제목"
              />
            </div>
            <div className={styles.content_input_container}>
              <p className={styles.content_text}>내용</p>
              <textarea
                name="content"
                onChange={inputValueChangeHandler}
                value={content}
                className={styles.content_input}
                spellCheck="false"
                placeholder="이 곳은 해당 체험상품에 대해 문의하는 곳입니다. 모두락 웹사이트에 대해 문의하시는 경우에는 '문의게시판' 을 이용해주세요."
              ></textarea>
            </div>
            <div className={styles.submit_button_container}>
              <button
                className={styles.submit_button}
                onClick={writeSubmitHandler}
              >
                글쓰기
              </button>
            </div>
          </section>
        </section>
      ) : (
        <LoadingPage />
      )}
    </section>
  );
};

export default ProgramDetail;
