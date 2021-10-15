import React from "react";
import StarRatingComponent from "react-star-rating-component";
import styles from "./programReview.module.css";

const ProgramReview = ({ review }) => {
  return (
    <div className={styles.review}>
      <div className={styles.top}>
        <div className={styles.id_and_star}>
          <p className={styles.id}>dlwhd***</p>
          <StarRatingComponent
            name="review_star"
            editing={false}
            starCount={5}
            value={review.stars}
          />
        </div>

        <p className={styles.date}>{review.date}</p>
      </div>
      <div className={styles.content_container}>
        <p className={styles.content}>{review.comment}</p>
      </div>
    </div>
  );
};

export default ProgramReview;
