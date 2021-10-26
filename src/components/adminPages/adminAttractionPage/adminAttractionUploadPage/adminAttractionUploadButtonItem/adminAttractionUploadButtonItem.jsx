import React, { useEffect, useState } from "react";
import styles from "./adminAttractionUploadButtonItem.module.css";

const AdminAttractionUploadButtonItem = ({ item }) => {
  return (
    <div className={styles.item}>
      <p className={styles.id}>{item.idx}</p>
      <p className={styles.name}>{item.name}</p>
      <p className={styles.change}>변경</p>
    </div>
  );
};

export default AdminAttractionUploadButtonItem;
