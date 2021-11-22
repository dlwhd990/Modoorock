import React from "react";
import styles from "./programsButton.module.css";

const ProgramsButton = ({ name, value, changeHandler }) => {
  return (
    <div
      className={`${
        value === name
          ? `${styles.region_select} ${styles.region_on}`
          : `${styles.region_select}`
      }`}
      onClick={changeHandler}
    >
      {name}
    </div>
  );
};

export default ProgramsButton;
