import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./themeSlickItem.module.css";
import StarRatingComponent from "react-star-rating-component";

const ThemeSlickItem = ({ item, areaList }) => {
  const [areaData, setAreaData] = useState(null);
  const history = useHistory();

  const onItemClick = () => {
    history.push(`/programs/view/${item.idx}`);
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    for (let i = 0; i < areaList.length; i++) {
      if (areaList[i].idx === item.attraction) {
        setAreaData(areaList[i]);
        return;
      }
    }
  }, []);
  return (
    <section className={styles.theme_item} onClick={onItemClick}>
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
                value={item.total_rate / item.rate_count}
              />
              <span className={styles.rate_data}>{`${(
                item.total_rate / item.rate_count
              ).toFixed(1)}/5.0`}</span>
            </div>
            <span className={styles.review_count_text}>32개의 리뷰</span>
          </div>
          <p className={styles.price}>{`${item.price.toLocaleString(
            "ko-KR"
          )}원`}</p>
        </div>
      </div>
    </section>
  );
};

export default ThemeSlickItem;
