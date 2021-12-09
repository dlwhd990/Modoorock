import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./themeSlickItem.module.css";
import StarRatingComponent from "react-star-rating-component";

const ThemeSlickItem = ({ item, getReviewList }) => {
  const [reviewCount, setReviewCount] = useState(0);
  const [reviewStarAvg, setReviewStarAvg] = useState((0).toFixed(1));
  const [mainImage, setMainImage] = useState(null);
  const [reviewList, setReviewList] = useState(null);
  const history = useHistory();

  const onItemClick = () => {
    history.push(`/programs/view/${item.idx}`);
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    getReviewList(item.idx, setReviewList);

    //이미지 설정
    const tmp = item.photo.split("#");
    tmp.forEach((photo) => {
      if (photo.includes("_main")) {
        setMainImage(photo);
        return false;
      }
    });
  }, []);

  useEffect(() => {
    if (!reviewList) {
      return;
    }
    let count = 0;
    let total = 0;

    reviewList.forEach((reviewItem) => {
      reviewItem.expIdx === item.idx &&
        (count += 1) &&
        (total += reviewItem.stars);
    });
    setReviewCount(count);
    count > 0 && setReviewStarAvg((total / count).toFixed(1));
  }, [reviewList]);
  return (
    <section className={styles.theme_item} onClick={onItemClick}>
      <div className={styles.image_container}>
        {mainImage && (
          <img
            src={`${process.env.REACT_APP_BASEURL}-images/Exp/${mainImage}`}
            alt="area_image"
            className={styles.image}
          />
        )}
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

export default ThemeSlickItem;
