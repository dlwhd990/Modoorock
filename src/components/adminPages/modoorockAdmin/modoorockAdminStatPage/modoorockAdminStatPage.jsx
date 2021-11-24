import React, { useEffect, useState } from "react";
import styles from "./modoorockAdminStatPage.module.css";

const ModoorockAdminStatPage = ({ expList, userList }) => {
  const [expStatList, setExpStatList] = useState(null);
  const [userStatList, setUserStatList] = useState(null);
  useEffect(() => {
    //체험상품
    const makeExpStatList = () => {
      const tmp = {};
      const result = [];
      expList.forEach((exp) => {
        const date = exp.date.slice(0, 7);
        if (!tmp[date]) {
          tmp[date] = 1;
        } else {
          tmp[date] += 1;
        }
      });
      Object.keys(tmp).forEach((key) => {
        result.push([key, tmp[key]]);
      });
      result.sort();
      setExpStatList(result);
    };

    //회원가입
    const makeUserStatList = () => {
      const tmp = {};
      const result = [];
      userList.forEach((user) => {
        const date = user.registryDate.slice(0, 7);
        if (!tmp[date]) {
          tmp[date] = 1;
        } else {
          tmp[date] += 1;
        }
      });
      Object.keys(tmp).forEach((key) => {
        result.push([key, tmp[key]]);
      });
      result.sort();
      setUserStatList(result);
    };
    makeExpStatList();
    makeUserStatList();
  }, []);

  return (
    <section className={styles.stat_page}>
      <div className={styles.container}>
        <div className={styles.part}>
          <h3 className={styles.title}>체험상품</h3>
          <div className={styles.top}>
            <div className={styles.top_division}>날짜</div>
            <div className={styles.top_division}>판매량</div>
          </div>
          <div className={styles.list}>
            {expStatList &&
              expStatList.map((exp) => (
                <div key={exp[0]} className={styles.item}>
                  <div className={styles.item_part}>{exp[0]}</div>
                  <div className={styles.item_part}>{`${exp[1]}개`}</div>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.part}>
          <h3 className={styles.title}>회원가입</h3>
          <div className={styles.top}>
            <div className={styles.top_division}>날짜</div>
            <div className={styles.top_division}>가입자수</div>
          </div>
          <div className={styles.list}>
            {userStatList &&
              userStatList.map((user) => (
                <div key={user[0]} className={styles.item}>
                  <div className={styles.item_part}>{user[0]}</div>
                  <div className={styles.item_part}>{`${user[1]}명`}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ModoorockAdminStatPage;
