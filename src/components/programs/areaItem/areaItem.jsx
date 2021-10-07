import React from "react";
import { useHistory } from "react-router";
import styles from "./areaItem.module.css";

const AreaItem = ({ item }) => {
  const history = useHistory();
  const areaClickHandler = () => {
    history.push({
      pathname: `/programs/attraction/${item.idx}`,
      state: item,
    });
    window.scrollTo({ top: 0 });
  };

  return (
    <section className={styles.area_item} onClick={areaClickHandler}>
      <div className={styles.image_container}>
        <img src={item.photo} alt="area_image" className={styles.image} />
        <div className={styles.region}>{item.area}</div>
      </div>
      <div className={styles.text_container}>
        <div className={styles.area_data_container}>
          <p className={styles.name}>{item.name}</p>
          <p className={styles.desc}>{item.content}</p>
        </div>

        <p className={styles.number_of_programs}>45개의 상품</p>
      </div>
    </section>
  );
};

export default AreaItem;
