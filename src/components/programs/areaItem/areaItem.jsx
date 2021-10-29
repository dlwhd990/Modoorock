import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./areaItem.module.css";

const AreaItem = ({ item, programList }) => {
  const history = useHistory();
  const [programCount, setProgramCount] = useState(0);
  const areaClickHandler = () => {
    history.push({
      pathname: `/programs/attraction/${item.idx}`,
      state: item,
    });
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    let cnt = 0;
    console.log(programList, item);
    programList.forEach((program) => {
      program.attractionIdx === item.idx && cnt++;
    });
    setProgramCount(cnt);
  }, []);

  return (
    <section className={styles.area_item} onClick={areaClickHandler}>
      <div className={styles.image_container}>
        <img
          src={`${process.env.REACT_APP_BASEURL}-images/Attraction/${item.photo}`}
          alt="area_image"
          className={styles.image}
        />
        <div className={styles.region_badge}>{item.area}</div>
      </div>
      <div className={styles.text_container}>
        <div className={styles.area_data_container}>
          <p className={styles.name}>{item.name}</p>
          <p className={styles.desc}>{item.content}</p>
        </div>

        <p
          className={styles.number_of_programs}
        >{`${programCount}개의 상품`}</p>
      </div>
    </section>
  );
};

export default AreaItem;
