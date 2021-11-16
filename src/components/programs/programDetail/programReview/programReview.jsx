import axios from "axios";
import React, { useEffect, useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import styles from "./programReview.module.css";

const ProgramReview = ({ review }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const findUserId = () => {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/user/getuserinfo`, {
          idx: review.userIdx,
        })
        .then((response) => {
          const id = response.data.id;
          let tmp = id.slice(0, 5);
          for (let i = 0; i < id.length - 3; i++) {
            tmp += "*";
          }
          setUser(tmp);
        })
        .catch((err) => console.log(err));
    };
    findUserId();
  }, []);
  return (
    <div className={styles.review}>
      <div className={styles.top}>
        <div className={styles.id_and_star}>
          <p className={styles.id}>{user && user}</p>
          <StarRatingComponent
            name="review_star"
            editing={false}
            starCount={5}
            value={review.stars}
          />
        </div>

        <p className={styles.date}>{`${review.date.slice(
          0,
          4
        )}/${review.date.slice(5, 7)}/${review.date.slice(8, 10)}`}</p>
      </div>
      <div className={styles.content_container}>
        <p className={styles.content}>{review.comment}</p>
      </div>
    </div>
  );
};

export default ProgramReview;
