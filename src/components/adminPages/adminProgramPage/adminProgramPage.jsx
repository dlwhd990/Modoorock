import axios from "axios";
import { set } from "js-cookie";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import AdminProgramItem from "./adminProgramItem/adminProgramItem";
import styles from "./adminProgramPage.module.css";
import AdminProgramPopup from "./adminProgramPopup/adminProgramPopup";

const AdminProgramPage = (props) => {
  const history = useHistory();
  const { path_three } = useParams();
  const [myProgramList, setMyProgramList] = useState([]);
  const [attractionInfo, setAttractionInfo] = useState(null);
  const [popupData, setPopupData] = useState(null);

  const loadAttractionInfo = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/attraction/getattractioninfo`, {
        idx: parseInt(path_three),
      })
      .then((response) => {
        axios
          .post(`${process.env.REACT_APP_BASEURL}/user/session`)
          .then((res) => {
            if (res.data.idx !== response.data.userIdx) {
              window.alert("이 페이지에 접근할 권한이 없습니다.");
              window.location.href = "/";
              return;
            }
            setAttractionInfo(response.data);
          });
      })
      .catch((err) => console.error(err));
  };

  const loadProgramList = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/exp/getexplist`, {
        theme: "전체",
      })
      .then((response) => {
        const result = [];
        response.data.forEach((item) => {
          if (item.attractionIdx === parseInt(path_three)) {
            result.push(item);
          }
        });
        setMyProgramList(result);
      })
      .catch((err) => console.error(err));
  };

  const addProgramHandler = () => {
    history.push(`/admin/attraction/view/${path_three}/add`);
    window.scrollTo({ top: 0 });
  };

  const popupHandler = (item) => {
    setPopupData(item);
  };

  const closePopupHandler = () => {
    setPopupData(null);
  };

  useEffect(() => {
    loadAttractionInfo();
    loadProgramList();
  }, []);

  return (
    <section className={styles.program_page}>
      <section className={styles.program_top}>
        <div className={styles.title_container}>
          <div className={styles.icon_container_one}>
            <i className={`${styles.head_icon} fas fa-map-marker-alt`}></i>
          </div>
          <p className={styles.title}>
            {attractionInfo && attractionInfo.name}
          </p>
          <p
            className={styles.subtitle}
          >{`${myProgramList.length} 개의 체험상품`}</p>
        </div>
        <button className={styles.add_button} onClick={addProgramHandler}>
          체험상품 추가
        </button>
      </section>
      <section className={styles.main_list}>
        {myProgramList &&
          myProgramList.map((item) => (
            <AdminProgramItem
              key={item.idx}
              item={item}
              attractionIdx={path_three}
              popupHandler={popupHandler}
            />
          ))}
      </section>
      {popupData && (
        <div className={styles.popup_filter}>
          <AdminProgramPopup
            item={popupData}
            closePopupHandler={closePopupHandler}
          />
        </div>
      )}
    </section>
  );
};

export default AdminProgramPage;
