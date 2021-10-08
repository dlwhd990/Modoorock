import React from "react";
import { useHistory } from "react-router";
import styles from "./mainProgramItem.module.css";

const MainProgramItem = React.memo(({ item }) => {
  const history = useHistory();
  const onItemClickHandler = () => {
    history.push(`/programs/view/${item.idx}`);
    window.scrollTo({ top: 0 });
  };
  return (
    <div className={styles.program_item} onClick={onItemClickHandler}>
      <img
        src={item.photo}
        alt="program_image"
        className={styles.program_image}
      />
      <div className={styles.program_data_container}>
        <p className={styles.program_title}>{item.title}</p>
        <p className={styles.program_price}>{`${item.price.toLocaleString(
          "ko-KR"
        )}원`}</p>
      </div>
    </div>
  );
});

export default MainProgramItem;