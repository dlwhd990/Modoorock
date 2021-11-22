import React, { useEffect, useState } from "react";
import ModoorockAdminUserItem from "./modoorockAdminUserItem/modoorockAdminUserItem";
import styles from "./modoorockAdminUserPage.module.css";

const ModoorockAdminUserPage = ({ userList, loadUserList }) => {
  const [inputValue, setInputValue] = useState("");
  const [resultUserList, setResultUserList] = useState(userList);
  const onInputValueChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const result = userList.filter((user) => user.id.includes(inputValue));
    setResultUserList(result);
  }, [inputValue]);

  return (
    <section className={styles.user_page}>
      <div className={styles.main}>
        <div className={styles.top}>
          <h1 className={styles.title}>회원관리</h1>
          <input
            value={inputValue}
            onChange={onInputValueChangeHandler}
            type="text"
            className={styles.search_input}
          />
        </div>
        <section className={styles.header}>
          <p className={styles.idx}>번호</p>
          <p className={styles.id}>아이디</p>
          <p className={styles.name}>이름</p>
          <p className={styles.phone}>연락처</p>
          <p className={styles.grade}>권한</p>
          <p className={styles.date}>가입일</p>
          <p className={styles.change_grade}>권한변경</p>
        </section>
        <div className={styles.list}>
          {resultUserList.map((item) => (
            <ModoorockAdminUserItem
              key={item.idx}
              item={item}
              loadUserList={loadUserList}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModoorockAdminUserPage;
