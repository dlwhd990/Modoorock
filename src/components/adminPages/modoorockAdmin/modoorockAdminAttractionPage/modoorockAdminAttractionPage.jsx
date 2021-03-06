import React from "react";
import ModoorockAdminAttractionItem from "./modoorockAdminAttractionItem/modoorockAdminAttractionItem";
import styles from "./modoorockAdminAttractionPage.module.css";

const ModoorockAdminAttractionPage = ({
  attractionList,
  userList,
  programList,
  loadAttractionList,
  loadProgramList,
}) => {
  return (
    <section className={styles.attraction_page}>
      <h1 className={styles.title}>관광지 관리</h1>
      <section className={styles.main}>
        {attractionList.map((item) => (
          <ModoorockAdminAttractionItem
            key={item.idx}
            item={item}
            userList={userList}
            programList={programList}
            loadAttractionList={loadAttractionList}
            loadProgramList={loadProgramList}
          />
        ))}
      </section>
    </section>
  );
};
export default ModoorockAdminAttractionPage;
