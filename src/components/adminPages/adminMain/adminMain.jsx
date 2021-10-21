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

  const [myInquireList, setMyInquireList] = useState([
    {
      idx: 0,
      expIdx: 0,
      type: "주문/배송/반품",
      date: "2021-10-05 01:23:45",
      title: "공지입니다.",
      user_idx: 7,
      content: "공지내용",
      answer: null,
    },
    {
      idx: 1,
      expIdx: 0,
      type: "멤버쉽",
      date: "2021-10-05 01:23:46",
      title: "공지니다.",
      user_idx: 7,
      content: "공지내용",
      answer: null,
    },
    {
      idx: 2,
      expIdx: 0,
      type: "사이트 이용",
      date: "2021-10-05 01:21:45",
      title: "공지입다.",
      user_idx: 7,
      content: "공지내용",
      answer: null,
    },
    {
      idx: 3,
      expIdx: 0,
      type: "주문/배송/반품",
      date: "2021-10-05 01:23:49",
      title: "공지입니다.",
      user_idx: 7,
      content: "공지내용",
      answer: null,
    },
    {
      idx: 4,
      expIdx: 0,
      type: "멤버쉽",
      date: "2021-10-11 01:22:23",
      title: "공지니다.",
      user_idx: 7,
      content: "공지내용",
      answer: null,
    },
    {
      idx: 5,
      expIdx: 0,
      type: "사이트 이용",
      date: "2021-10-06 01:29:42",
      title: "공지입다.",
      user_idx: 7,
      content: "공지내용",
      answer: null,
    },
  ]);

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
      .post(`${process.env.REACT_APP_BASEURL}/qna/getqnaexplist`, {
        expIdx,
      }) // 이후에 exp 추가 기능 완성되면
      //관리자의 모든 expIdx 리스트 만들어서 forEach로 QNA 리스트 완성시킨 후 이것을 setState
      //하면 체험 상품 개수만큼 통신해야하니 비효율적인가?
      .then((response) => console.log(response))
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
              {params.path === "main" && myAttractionList && (
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
                  <AdminInquirePage myInquireList={myInquireList} />
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
