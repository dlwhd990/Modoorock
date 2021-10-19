import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminFirstPage from "../adminFirstPage/adminFirstPage";
import styles from "./adminMain.module.css";

const AdminMain = (props) => {
  const [user, setUser] = useState({
    name: "이종혁",
  });

  const [menuSelected, setMenuSelected] = useState("메인페이지");

  const onButtonClickHandler = (e) => {
    setMenuSelected(e.currentTarget.dataset.value);
  };

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setUser(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className={styles.admin_main}>
      {user ? (
        <section className={styles.user_on_container}>
          <section className={styles.side_menu}>
            <div className={styles.logo_container}>
              <img
                src="/Modoorock/images/modoorock.png"
                alt="logo"
                className={styles.logo}
              />
              <span className={styles.logo_title}>모두락</span>
            </div>
            <div className={styles.menu_container}>
              <div className={styles.menu_title}>기능</div>
              <div
                className={`${
                  menuSelected === "메인페이지"
                    ? `${styles.menu_item} ${styles.menu_item_on}`
                    : `${styles.menu_item} ${styles.menu_item_off}`
                }`}
                data-value="메인페이지"
                onClick={onButtonClickHandler}
              >
                <div className={styles.menu_icon_container}>
                  <i className={`${styles.menu_icon} fas fa-home`}></i>
                </div>
                <p className={styles.menu_text}>메인페이지</p>
              </div>
              <div
                className={`${
                  menuSelected === "관광지 관리"
                    ? `${styles.menu_item} ${styles.menu_item_on}`
                    : `${styles.menu_item} ${styles.menu_item_off}`
                }`}
                data-value="관광지 관리"
                onClick={onButtonClickHandler}
              >
                <div className={styles.menu_icon_container}>
                  <i
                    className={`${styles.menu_icon} fas fa-map-marker-alt`}
                  ></i>
                </div>
                <p className={styles.menu_text}>관광지 관리</p>
              </div>
              <div
                className={`${
                  menuSelected === "문의 관리"
                    ? `${styles.menu_item} ${styles.menu_item_on}`
                    : `${styles.menu_item} ${styles.menu_item_off}`
                }`}
                data-value="문의 관리"
                onClick={onButtonClickHandler}
              >
                <div className={styles.menu_icon_container}>
                  <i className={`${styles.menu_icon} fas fa-comments`}></i>
                </div>
                <p className={styles.menu_text}>문의 관리</p>
              </div>
              <div
                className={`${
                  menuSelected === "포인트 관리"
                    ? `${styles.menu_item} ${styles.menu_item_on}`
                    : `${styles.menu_item} ${styles.menu_item_off}`
                }`}
                data-value="포인트 관리"
                onClick={onButtonClickHandler}
              >
                <div className={styles.menu_icon_container}>
                  <i className={`${styles.menu_icon} fas fa-coins`}></i>
                </div>
                <p className={styles.menu_text}>포인트 관리</p>
              </div>
            </div>
          </section>
          <section className={styles.main_container}>
            <header className={styles.header}>
              <div className={styles.header_search_container}>
                <input
                  type="text"
                  className={styles.header_search}
                  spellCheck="false"
                  placeholder="검색"
                />
                <i className={`${styles.search_icon} fas fa-search`}></i>
              </div>
              <div className={styles.logout_container}>
                <p className={styles.user_name}>{`${user.name} 님`}</p>
                <p className={styles.logout_button}>로그아웃</p>
              </div>
            </header>
            <section className={styles.content_container}>
              <AdminFirstPage />
            </section>
          </section>
        </section>
      ) : (
        <section className={styles.not_admin}>접근 권한이 없습니다.</section>
      )}
    </section>
  );
};

export default AdminMain;
