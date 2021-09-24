import React from "react";
import styles from "./programItem.module.css";

const ProgramItem = ({ program }) => {
  return (
    <section className={styles.program_item}>
      <img
        src={program.image_url}
        alt="program_image"
        className={styles.item_image}
      />
      <div className={styles.data_container}>
        <p className={styles.title}>{program.title}</p>
        <p className={styles.subtitle}>{program.subtitle}</p>
        <p className={styles.location}>{program.location}</p>
      </div>
    </section>
  );
};

export default ProgramItem;
