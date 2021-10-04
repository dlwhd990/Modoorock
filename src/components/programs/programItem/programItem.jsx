import React from "react";
import { useHistory } from "react-router";
import styles from "./programItem.module.css";

const ProgramItem = ({ item }) => {
  const history = useHistory();
  const goDetailHandler = (e) => {
    history.push(`/programs/${e.target.value}`);
  };
  return (
    <div className={styles.program_item}>
      <img src={item.photo} alt="" className={styles.photo} />
      <div className={styles.data_container}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.area}>{item.area}</p>
        <p className={styles.price}>{`${item.price}원`}</p>
        <button
          className={styles.go_detail_button}
          value={item.idx}
          onClick={goDetailHandler}
        >
          상품 보기
        </button>
      </div>
    </div>
  );
};

export default ProgramItem;
