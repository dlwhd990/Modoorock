import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./mainProgramItem.module.css";
import ReactStars from "react-rating-stars-component";

const MainProgramItem = React.memo(({ item, getReviewList }) => {
  const history = useHistory();
  const [review, setReview] = useState([]);
  const [reviewAvg, setReviewAvg] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [reviewList, setReviewList] = useState(null);

  const moveToProgram = () => {
    history.push(`/programs/view/${item.idx}`);
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    getReviewList(item.idx, setReviewList);
    const imageList = item.photo.split("#");
    const main = imageList.filter((item) => item.includes("_main"));
    setMainImage(main);
  }, []);

  useEffect(() => {
    if (!reviewList) {
      return;
    }
    const reviewResult = [];
    let total = 0;

    reviewList.forEach((reviewItem) => {
      if (reviewItem.expIdx === item.idx) {
        reviewResult.push(reviewItem);
        total += reviewItem.stars;
      }
    });
    setReview(reviewResult);
    setReviewAvg(() => {
      if (reviewResult.length === 0) {
        return "0.0";
      }
      return (total / reviewResult.length).toFixed(1);
    });
  }, [reviewList]);

  return (
    <div className={styles.program_item} onClick={moveToProgram}>
      {mainImage && (
        <img
          src={`${process.env.REACT_APP_BASEURL}-images/Exp/${mainImage}`}
          alt="program_image"
          className={styles.program_image}
        />
      )}
      <div className={styles.program_data_container}>
        <p className={styles.program_title}>{item.title}</p>
        <div className={styles.star_container}>
          {reviewAvg && (
            <ReactStars
              count={5}
              edit={false}
              size={14}
              value={parseFloat(reviewAvg)}
              activeColor="#ffd700"
              isHalf={true}
            />
          )}

          <span className={styles.rate_data}>{`${item && reviewAvg}/5.0`}</span>
        </div>
        <p
          className={styles.review_count_text}
        >{`${review.length}?????? ??????`}</p>
        <p className={styles.program_price}>{`${item.price.toLocaleString(
          "ko-KR"
        )}???`}</p>
      </div>
    </div>
  );
});

export default MainProgramItem;
