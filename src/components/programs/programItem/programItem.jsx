import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./programItem.module.css";
import StarRatingComponent from "react-star-rating-component";

const ProgramItem = ({ item, reviewList }) => {
  const [reviewCount, setReviewCount] = useState(0);
  const [reviewStarAvg, setReviewStarAvg] = useState((0).toFixed(1));
  const history = useHistory();
  const [mainImage, setMainImage] = useState(null);

  const onItemClick = () => {
    history.push(`/programs/view/${item.idx}`);
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    let count = 0;
    let total = 0;

    reviewList.forEach((reviewItem) => {
      reviewItem.exp_idx === item.idx &&
        (count += 1) &&
        (total += reviewItem.stars);
    });
    setReviewCount(count);
    count > 0 && setReviewStarAvg((total / count).toFixed(1));

    //사진 스플릿
    const imageList = item.photo.split("#");
    const main = imageList.filter((item) => item.includes("_main"));
    setMainImage(main);
  }, []);
  return (
    <section className={styles.program_item} onClick={onItemClick}>
      <div className={styles.image_container}>
        <img
          src={
            mainImage &&
            `${process.env.REACT_APP_BASEURL}-images/Exp/${mainImage}`
          }
          alt="area_image"
          className={styles.image}
        />
        <div className={styles.area_badge}>{item.theme}</div>
      </div>
      <div className={styles.text_container}>
        <div className={styles.name_container}>
          <p className={styles.name}>{item.title}</p>
        </div>

        <div className={styles.desc_container}>
          <p className={styles.desc}>{item.content}</p>
        </div>
        <div className={styles.rate_container}>
          <div className={styles.star_container}>
            <StarRatingComponent
              name="star"
              editing={false}
              starCount={5}
              value={parseFloat(reviewStarAvg)}
            />
            <span className={styles.rate_data}>{`${reviewStarAvg}/5.0`}</span>
          </div>
          <span
            className={styles.review_count_text}
          >{`${reviewCount}개의 리뷰`}</span>
        </div>
        <div className={styles.price_container}>
          <p className={styles.price}>{`${item.price.toLocaleString(
            "ko-KR"
          )}원`}</p>
        </div>
      </div>
    </section>
  );
};

export default ProgramItem;
