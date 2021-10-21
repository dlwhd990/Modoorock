import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import LoadingPage from "../../loadingPage/loadingPage";
import AdminAttractionPage from "../adminAttractionPage/adminAttractionPage";
import AdminAttractionUploadPage from "../adminAttractionPage/adminAttractionUploadPage/adminAttractionUploadPage";
import AdminFirstPage from "../adminFirstPage/adminFirstPage";
import AdminInquirePage from "../adminInquirePage/adminInquirePage";
import AdminPointPage from "../adminPointPage/adminPointPage";
import styles from "./adminMain.module.css";

const AdminMain = ({ userLogout }) => {
  const history = useHistory();
  const params = useParams();

  const [user, setUser] = useState(null);

  const [myAttractionList, setMyAttractionList] = useState(null);

  const [myInquireList, setMyInquireList] = useState(null);

  const [myPointList, setMyPointList] = useState([]);

  const [menuSelected, setMenuSelected] = useState(params.path);

  const onButtonClickHandler = (e) => {
    const value = e.currentTarget.dataset.value;
    setMenuSelected(e.currentTarget.dataset.value);
    history.push(`/admin/${value}`);
  };

  const loadMyAttractionList = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/attraction/getattractionlist`, {
        area: "전체",
      })
      .then((response) => {
        const result = [];
        response.data.forEach((attraction) => {
          if (attraction.userIdx === user.idx) {
            result.push(attraction);
          }
        });
        console.log(result);
        setMyAttractionList(result);
      })
      .catch((err) => console.error(err));
  };

  const loadMyInquireList = (expIdx) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/qna/getqnalist`, {
        userIdx: user.idx,
      }) // 이후에 exp 추가 기능 완성되면
      //관리자의 모든 expIdx 리스트 만들어서 forEach로 QNA 리스트 완성시킨 후 이것을 setState
      //하면 체험 상품 개수만큼 통신해야하니 비효율적인가?

      //일단 테스트를 위해 임시로 내가 쓴 문의글들을 내가 답변하게 만들어놓음
      .then((response) => setMyInquireList(response.data.reverse()))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (response.data === "") {
          setUser(false);
        } else {
          setUser(response.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    user && loadMyAttractionList();
    user && loadMyInquireList();
  }, [user]);

  return (
    <section className={styles.admin_main}>
      {user === null ? (
        <LoadingPage />
      ) : user ? (
        <section className={styles.user_on_container}>
          <section className={styles.side_menu}>
            <div
              className={styles.logo_container}
              onClick={() => {
                window.location.reload();
                window.scrollTo({ top: 0 });
              }}
            >
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
                  menuSelected === "main"
                    ? `${styles.menu_item} ${styles.menu_item_on}`
                    : `${styles.menu_item} ${styles.menu_item_off}`
                }`}
                data-value="main"
                onClick={onButtonClickHandler}
              >
                <div className={styles.menu_icon_container}>
                  <i className={`${styles.menu_icon} fas fa-home`}></i>
                </div>
                <p className={styles.menu_text}>메인페이지</p>
              </div>
              <div
                className={`${
                  menuSelected === "attraction"
                    ? `${styles.menu_item} ${styles.menu_item_on}`
                    : `${styles.menu_item} ${styles.menu_item_off}`
                }`}
                data-value="attraction"
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
                  menuSelected === "inquire"
                    ? `${styles.menu_item} ${styles.menu_item_on}`
                    : `${styles.menu_item} ${styles.menu_item_off}`
                }`}
                data-value="inquire"
                onClick={onButtonClickHandler}
              >
                <div className={styles.menu_icon_container}>
                  <i className={`${styles.menu_icon} fas fa-comments`}></i>
                </div>
                <p className={styles.menu_text}>문의 관리</p>
              </div>
              <div
                className={`${
                  menuSelected === "point"
                    ? `${styles.menu_item} ${styles.menu_item_on}`
                    : `${styles.menu_item} ${styles.menu_item_off}`
                }`}
                data-value="point"
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
                <p className={styles.logout_button} onClick={userLogout}>
                  로그아웃
                </p>
              </div>
            </header>
            <section className={styles.content_container}>
              {params.path_two === "add" && params.path === "attraction" && (
                <AdminAttractionUploadPage user={user} />
              )}
              {params.path === "main" &&
                myAttractionList &&
                myInquireList &&
                myPointList && (
                  <AdminFirstPage
                    myAttractionList={myAttractionList}
                    myInquireList={myInquireList}
                  />
                )}
              {!params.path_two &&
                params.path === "attraction" &&
                myAttractionList && (
                  <AdminAttractionPage myAttractionList={myAttractionList} />
                )}
              {!params.path_two &&
                params.path === "inquire" &&
                myInquireList && (
                  <AdminInquirePage
                    myInquireList={myInquireList}
                    loadMyInquireList={loadMyInquireList}
                    user={user}
                  />
                )}
              {!params.path_two && params.path === "point" && myPointList && (
                <AdminPointPage myPointList={myPointList} />
              )}
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
