import React, { useEffect, useState } from "react";
import styles from "./modoorockAdminAttractionItem.module.css";

const ModoorockAdminAttractionItem = ({ item, userList, programList }) => {
  const [user, setUser] = useState(null);
  const [programCount, setProgramCount] = useState(0);
  useEffect(() => {
    let count = 0;

    userList.forEach((user) => {
      if (user.idx === item.userIdx) {
        setUser(user);
        return false;
      }
    });

    programList.forEach((program) => {
      program.attractionIdx === item.idx && count++;
    });
    setProgramCount(count);
  }, []);
  return (
    <div className={styles.item}>
      <div className={styles.image_container}>
        <img src={item.photo} alt="attraction_image" className={styles.image} />
      </div>
      <div className={styles.data_container}>
        <div className={styles.badge_container}>
          <div className={styles.badge}>{item.area}</div>
          <div className={styles.badge_count}>
            {`${programCount} 개의 체험상품`}
          </div>
        </div>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.content}>{item.content}</p>
        <p className={styles.user}>
          {user &&
            `관리자: ${user.id} | 연락처: ${user.phone.slice(
              0,
              3
            )}-${user.phone.slice(3, 7)}-${user.phone.slice(7, 11)}`}
        </p>
      </div>
      <div className={styles.button_container}>
        <button className={styles.delete_button}>삭제</button>
      </div>
    </div>
  );
};

export default ModoorockAdminAttractionItem;
