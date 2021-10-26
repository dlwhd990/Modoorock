import React, { useState } from "react";
import styles from "./templateSlickItem.module.css";

const TemplateSlickItem = ({
  item,
  templateTempSelectHandler,
  templateTempValue,
}) => {
  return (
    <section
      className={styles.item}
      onClick={() => {
        templateTempSelectHandler(item.idx);
      }}
    >
      <img src={item.image} alt="template_image" className={styles.image} />
      <div
        className={`${
          templateTempValue === item.idx
            ? `${styles.filter} ${styles.selected}`
            : `${styles.filter} ${styles.not_selected}`
        }`}
      >
        <i className={`${styles.check_icon} fas fa-check-circle`}></i>
      </div>
      <p className={styles.name}>{item.name}</p>
    </section>
  );
};

export default TemplateSlickItem;
