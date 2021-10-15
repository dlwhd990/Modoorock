import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./programItem.module.css";
import StarRatingComponent from "react-star-rating-component";

const ProgramItem = ({ item, areaList, reviewList }) => {
  const [areaData, setAreaData] = useState(null);
  const [reviewCount, setReviewCount] = useState(0);
  const [reviewStarAvg, setReviewStarAvg] = useState((0).toFixed(1));
  const history = useHistory();

  const onItemClick = () => {
    history.push(`/programs/view/${item.idx}`);
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    let count = 0;
    let total = 0;

    for (let i = 0; i < areaList.length; i++) {
      if (areaList[i].idx === item.attraction) {
        setAreaData(areaList[i]);
        break;
      }
    }
    reviewList.forEach((reviewItem) => {
      reviewItem.exp_idx === item.idx &&
        (count += 1) &&
        (total += reviewItem.stars);
    });
    setReviewCount(count);
    count > 0 && setReviewStarAvg((total / count).toFixed(1));
  }, []);
  return (
    <section className={styles.program_item} onClick={onItemClick}>
      <div className={styles.image_container}>
        <img src={item.photo} alt="area_image" className={styles.image} />
        <div className={styles.area_badge}>
          {areaData && `[${areaData.area}] ${areaData.name}`}
        </div>
      </div>
      <div className={styles.text_container}>
        <div className={styles.area_data_container}>
          <p className={styles.name}>{item.title}</p>
          <p className={styles.desc}>{item.content}</p>
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
          <p className={styles.price}>{`${item.price.toLocaleString(
            "ko-KR"
          )}원`}</p>
        </div>
      </div>
    </section>
  );
};

export default ProgramItem;
