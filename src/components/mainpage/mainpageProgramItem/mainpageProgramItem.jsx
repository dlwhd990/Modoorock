import React from "react";
import styles from "./mainpageProgramItem.module.css";

const MainpageProgramItem = React.memo(({ item }) => {
  return (
    <div className={styles.program_item}>
      <img
        src={item.image_url}
        alt="program_image"
        className={styles.program_image}
      />
      <div className={styles.program_data_container}>
        <p className={styles.program_title}>{item.title}</p>
        <p className={styles.program_price}>{item.price}</p>
      </div>
    </div>
  );
});

export default MainpageProgramItem;
