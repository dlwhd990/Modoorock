import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import styles from "./modoorockAdmin.module.css";
import ModoorockAdminAdPage from "./modoorockAdminAdPage/modoorockAdminAdPage";
import ModoorockAdminArticlePage from "./modoorockAdminArticlePage/modoorockAdminArticlePage";
import ModoorockAdminAttractionPage from "./modoorockAdminAttractionPage/modoorockAdminAttractionPage";
import ModoorockAdminBackgroundUploadPage from "./modoorockAdminBackgroundUploadPage/modoorockAdminBackgroundUploadPage";
import ModoorockAdminInquirePage from "./modoorockAdminInquirePage/modoorockAdminInquirePage";
import ModoorockAdminUserPage from "./modoorockAdminUserPage/modoorockAdminUserPage";

const ModoorockAdmin = (props) => {
  const history = useHistory();
  const { path } = useParams();
  const [selected, setSelected] = useState("메인");
  const [attractionList, setAttractionList] = useState(null);
  const [programList, setProgramList] = useState(null);
  const [noticeList, setNoticeList] = useState(null);
  const [faqList, setFaqList] = useState(null);
  const [inquireList, setInquireList] = useState(null);
  const [advertiseList, setAdvertiseList] = useState(null);
  const [userList, setUserList] = useState(null);

  const modoorockAdminCheck = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (response.data === "" || response.data.idType !== 2) {
          window.alert("권한이 없습니다.");
          window.location.href = "/Modoorock";
        } else {
          loadAttractionList();
          loadUserList();
          loadProgramList();
          loadInquireList();
          loadAdvertiseList();
          loadNoticeList();
          loadFaqList();
        }
      })
      .catch((err) => console.error(err));
  };

  const onSelectHandler = (e) => {
    setSelected(e.currentTarget.innerText);
    history.push(`/modoorockadmin/${e.currentTarget.dataset.param}`);
    window.scrollTo({ top: 0 });
  };

  const loadAttractionList = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/attraction/getattractionlist`, {
        area: "전체",
      })
      .then((response) => setAttractionList(response.data))
      .catch((err) => console.error(err));
  };

  const loadUserList = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/getuserlist`)
      .then((response) => setUserList(response.data.reverse()))
      .catch((err) => console.error(err));
  };

  const loadProgramList = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/exp/getexpthemelist`, {
        theme: "전체",
      })
      .then((response) => setProgramList(response.data.reverse()))
      .catch((err) => console.error(err));
  };

  const loadInquireList = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/qna/getqnaexplist`, {
        idx: 0,
      })
      .then((response) => setInquireList(response.data.reverse()))
      .catch((err) => console.error(err));
  };

  const loadAdvertiseList = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/advertise/getadvertiselist`)
      .then((response) => setAdvertiseList(response.data.reverse()))
      .catch((err) => console.error(err));
  };

  const loadNoticeList = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/notice/getnoticelist`, {
        type: "전체",
      })
      .then((response) => setNoticeList(response.data.reverse()))
      .catch((err) => console.error(err));
  };

  const loadFaqList = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/faq/getfaqlist`, {
        type: "전체",
      })
      .then((response) => setFaqList(response.data.reverse()))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    modoorockAdminCheck();
  }, []);

  return (
    <section className={styles.main}>
      <header className={styles.header}>
        <img
          src="/Modoorock/images/modoorock.png"
          alt="logo"
          className={styles.logo}
          onClick={() => {
            setSelected("메인");
            history.push("/modoorockadmin");
            window.scrollTo({ top: 0 });
          }}
        />
        <nav className={styles.nav}>
          <ul className={styles.menu_list}>
            <li
              className={`${
                selected === "홍보영상"
                  ? `${styles.menu_item} ${styles.selected}`
                  : `${styles.menu_item} ${styles.not_selected}`
              }`}
              onClick={onSelectHandler}
              data-param="advertise"
            >
              홍보영상
            </li>
            <li
              className={`${
                selected === "관광지 관리"
                  ? `${styles.menu_item} ${styles.selected}`
                  : `${styles.menu_item} ${styles.not_selected}`
              }`}
              onClick={onSelectHandler}
              data-param="attraction"
            >
              관광지 관리
            </li>
            <li
              className={`${
                selected === "게시물 관리"
                  ? `${styles.menu_item} ${styles.selected}`
                  : `${styles.menu_item} ${styles.not_selected}`
              }`}
              onClick={onSelectHandler}
              data-param="article"
            >
              게시물 관리
            </li>
            <li
              className={`${
                selected === "문의/답변"
                  ? `${styles.menu_item} ${styles.selected}`
                  : `${styles.menu_item} ${styles.not_selected}`
              }`}
              onClick={onSelectHandler}
              data-param="inquire"
            >
              문의/답변
            </li>
            <li
              className={`${
                selected === "배경 업로드"
                  ? `${styles.menu_item} ${styles.selected}`
                  : `${styles.menu_item} ${styles.not_selected}`
              }`}
              onClick={onSelectHandler}
              data-param="background"
            >
              배경 업로드
            </li>
            <li
              className={`${
                selected === "회원관리"
                  ? `${styles.menu_item} ${styles.selected}`
                  : `${styles.menu_item} ${styles.not_selected}`
              }`}
              onClick={onSelectHandler}
              data-param="user"
            >
              회원관리
            </li>
            <li
              className={`${
                selected === "통계"
                  ? `${styles.menu_item} ${styles.selected}`
                  : `${styles.menu_item} ${styles.not_selected}`
              }`}
              onClick={onSelectHandler}
              data-param="stat"
            >
              통계
            </li>
          </ul>
        </nav>
      </header>
      {!path ? (
        <section className={styles.mainpage}>
          <div className={styles.filter}></div>
          <div className={styles.data_container}>
            <p className={styles.title}>모두락 관리자 페이지</p>
            <p className={styles.subtitle}>웹사이트 관리 시스템</p>
          </div>
        </section>
      ) : path === "advertise" ? (
        advertiseList && (
          <ModoorockAdminAdPage
            advertiseList={advertiseList}
            loadAdvertiseList={loadAdvertiseList}
          />
        )
      ) : path === "attraction" ? (
        attractionList &&
        userList &&
        programList && (
          <ModoorockAdminAttractionPage
            attractionList={attractionList}
            userList={userList}
            programList={programList}
            loadAttractionList={loadAttractionList}
          />
        )
      ) : path === "inquire" ? (
        inquireList && (
          <ModoorockAdminInquirePage
            inquireList={inquireList}
            loadInquireList={loadInquireList}
          />
        )
      ) : path === "background" ? (
        <ModoorockAdminBackgroundUploadPage />
      ) : path === "user" ? (
        userList && (
          <ModoorockAdminUserPage
            userList={userList}
            loadUserList={loadUserList}
          />
        )
      ) : path === "article" ? (
        noticeList &&
        faqList &&
        inquireList && (
          <ModoorockAdminArticlePage
            noticeList={noticeList}
            faqList={faqList}
            inquireList={inquireList}
            loadNoticeList={loadNoticeList}
            loadFaqList={loadFaqList}
          />
        )
      ) : (
        <></>
      )}
    </section>
  );
};

export default ModoorockAdmin;
