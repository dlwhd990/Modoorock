import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import AdminAttractionPage from "../adminAttractionPage/adminAttractionPage";
import AdminAttractionUploadPage from "../adminAttractionPage/adminAttractionUploadPage/adminAttractionUploadPage";
import AdminFirstPage from "../adminFirstPage/adminFirstPage";
import styles from "./adminMain.module.css";

const AdminMain = (props) => {
  const history = useHistory();
  const params = useParams();

  const [user, setUser] = useState({
    name: "이종혁",
  });

  const [myAttractionList, setMyAttractionList] = useState([
    {
      idx: 0,
      name: "월미도",
      area: "인천",
      photo: "/Modoorock/images/service_right.png",
      user_idx: "보류(관리자)",
      content:
        "월미도는 서울특별시 종로구 건되어 정궁으로 이용된 궁궐, 정궁, 사적",
    },
    {
      idx: 1,
      name: "경복궁",
      area: "서울",
      photo: "/Modoorock/images/service_right.png",
      user_idx: "보류(관리자)",
      content:
        "서울특별시 종로구 세종로에 있는 조선전기에 창건되어 정궁으로 이용된 궁궐, 정궁, 사적",
    },
    {
      idx: 2,
      name: "해운대",
      area: "부산",
      photo: "/Modoorock/images/service_right.png",
      user_idx: "보류(관리자)",
      content: "해운대는 서울특별시 종로구 세종로에 있는 조선전기",
    },
    {
      idx: 3,
      name: "익산 교도소 세트장",
      area: "전북",
      photo: "/Modoorock/images/service_right.png",
      user_idx: "보류(관리자)",
      content: "해운대는 서울특별시 종로구 세종로에 있는 조선전기",
    },
    {
      idx: 4,
      name: "익산 교도소 세트장 제목 오버플로우 테스트합니다",
      area: "전북",
      photo: "/Modoorock/images/service_right.png",
      user_idx: "보류(관리자)",
      content: "해운대는 서울특별시 종로구 세종로에 있는 조선전기",
    },
    {
      idx: 5,
      name: "익산 교도소 세트장 제목 오버플로우 테스트합니다",
      area: "전북",
      photo: "/Modoorock/images/service_right.png",
      user_idx: "보류(관리자)",
      content: "해운대는 서울특별시 종로구 세종로에 있는 조선전기",
    },

    {
      idx: 6,
      name: "익산 교도소 세트장 제목 오버플로우 테스트합니다",
      area: "전북",
      photo: "/Modoorock/images/service_right.png",
      user_idx: "보류(관리자)",
      content: "해운대는 서울특별시 종로구 세종로에 있는 조선전기",
    },
    {
      idx: 7,
      name: "익산 교도소 세트장 제목 오버플로우 테스트합니다",
      area: "전북",
      photo: "/Modoorock/images/service_right.png",
      user_idx: "보류(관리자)",
      content: "해운대는 서울특별시 종로구 세종로에 있는 조선전기",
    },
    {
      idx: 8,
      name: "익산 교도소 세트장 제목 오버플로우 테스트합니다",
      area: "전북",
      photo: "/Modoorock/images/service_right.png",
      user_idx: "보류(관리자)",
      content: "해운대는 서울특별시 종로구 세종로에 있는 조선전기",
    },
    {
      idx: 9,
      name: "익산 교도소 세트장 제목 오버플로우 테스트합니다",
      area: "전북",
      photo: "/Modoorock/images/service_right.png",
      user_idx: "보류(관리자)",
      content: "해운대는 서울특별시 종로구 세종로에 있는 조선전기",
    },
    {
      idx: 10,
      name: "익산 교도소 세트장 제목 오버플로우 테스트합니다",
      area: "전북",
      photo: "/Modoorock/images/service_right.png",
      user_idx: "보류(관리자)",
      content: "해운대는 서울특별시 종로구 세종로에 있는 조선전기",
    },
    {
      idx: 11,
      name: "익산 교도소 세트장 제목 오버플로우 테스트합니다",
      area: "전북",
      photo: "/Modoorock/images/service_right.png",
      user_idx: "보류(관리자)",
      content: "해운대는 서울특별시 종로구 세종로에 있는 조선전기",
    },
    {
      idx: 12,
      name: "익산 교도소 세트장 제목 오버플로우 테스트합니다",
      area: "전북",
      photo: "/Modoorock/images/service_right.png",
      user_idx: "보류(관리자)",
      content: "해운대는 서울특별시 종로구 세종로에 있는 조선전기",
    },
  ]);

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

  const [menuSelected, setMenuSelected] = useState(params.path);

  const onButtonClickHandler = (e) => {
    const value = e.currentTarget.dataset.value;
    setMenuSelected(e.currentTarget.dataset.value);
    history.push(`/admin/${value}`);
  };

  //useEffect(() => {
  //  axios
  //    .post(`${process.env.REACT_APP_BASEURL}/user/session`)
  //    .then((response) => {
  //      console.log(response);
  //      console.log(response.data);
  //      if (response.data === "") {
  //        setUser(false);
  //      } else {
  //        setUser(response.data);
  //      }
  //      //나의 관광지리스트, 문의리스트 등 정보 setState하는 과정 추가
  //    })
  //    .catch((err) => console.error(err));
  //}, []);

  return (
    <section className={styles.admin_main}>
      {user ? (
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
                <p className={styles.logout_button}>로그아웃</p>
              </div>
            </header>
            <section className={styles.content_container}>
              {params.path_two === "add" && params.path === "attraction" && (
                <AdminAttractionUploadPage />
              )}
              {params.path === "main" && (
                <AdminFirstPage
                  myAttractionList={myAttractionList}
                  myInquireList={myInquireList}
                />
              )}
              {params.path === "attraction" && (
                <AdminAttractionPage myAttractionList={myAttractionList} />
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
