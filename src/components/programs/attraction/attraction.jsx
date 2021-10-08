import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ProgramItem from "../programItem/programItem";
import styles from "./attraction.module.css";

const Attraction = ({ programList, areaList }) => {
  const history = useHistory();
  const { path } = useParams();
  const [attractionProgramList, setAttractionProgramList] = useState([]);
  const [areaData, setAreaData] = useState(null);

  const onSelectHandler = (e) => {
    if (e.currentTarget.innerText === "프로그램") {
      history.push(`/programs/area`);
    }
  };

  useEffect(() => {
    const result = [];
    for (let i = 0; i < areaList.length; i++) {
      if (areaList[i].idx === parseInt(path)) {
        setAreaData(areaList[i]);
        break;
      }
    }
    programList.forEach((item) => {
      item.attraction === parseInt(path) && result.push(item);
    });
    setAttractionProgramList(result);
  }, []);

  return (
    <section className={styles.attraction}>
      <section className={styles.attraction_top_banner}></section>
      <section className={styles.select_bar_container}>
        <div
          className={`${styles.select_button} ${styles.on}`}
          onClick={onSelectHandler}
        >
          프로그램 소개
        </div>
      </section>
      <section className={styles.attraction_container}>
        <p className={styles.attraction_title}>
          {areaData && `${areaData.name} 투어 패키지`}
        </p>
        <div className={styles.route_button_container}>
          <div
            className={styles.home_icon_container}
            onClick={() => {
              history.push("/");
              window.scrollTo({ top: 0 });
            }}
          >
            <i className={`${styles.home_icon} fas fa-home`}></i>
          </div>

          <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>
          <p
            className={styles.route_button}
            onClick={() => {
              history.push(`/programs/area`);
              window.scrollTo({ top: 0 });
            }}
          >
            프로그램
          </p>
          <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>
          <p
            className={styles.route_button}
            onClick={() => {
              history.push(`/programs/area`);
              window.scrollTo({ top: 0 });
            }}
          >
            프로그램 소개
          </p>
          <i className={`${styles.arrow_icon} fas fa-chevron-right`}></i>
          <p
            className={styles.route_button}
            onClick={() => {
              window.location.reload();
            }}
          >
            {areaData && `${areaData.name} 투어 패키지`}
          </p>
        </div>
        <section className={styles.attraction_list_container}>
          {attractionProgramList.map((item) => (
            <ProgramItem key={item.idx} item={item} areaList={areaList} />
          ))}
        </section>
      </section>
    </section>
  );
};

export default Attraction;
