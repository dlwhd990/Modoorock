import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./mainProgramItem.module.css";
import ReactStars from "react-rating-stars-component";

const MainProgramItem = React.memo(({ item, reviewList }) => {
  const history = useHistory();
  const [review, setReview] = useState([]);
  const [reviewAvg, setReviewAvg] = useState(null);

  useEffect(() => {
    const reviewResult = [];
    let total = 0;

    reviewList.forEach((reviewItem) => {
      if (reviewItem.idx === item.idx) {
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
    <div className={styles.program_item}>
      <img
        src={item.photo}
        alt="program_image"
        className={styles.program_image}
      />
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
        >{`${review.length}개의 리뷰`}</p>
        <p className={styles.program_price}>{`${item.price.toLocaleString(
          "ko-KR"
        )}원`}</p>
      </div>
    </div>
  );
});

export default MainProgramItem;
