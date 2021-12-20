import React from "react";
import ModoorockAdminReportItem from "./modoorockAdminReportItem/modoorockAdminReportItem";
import styles from "./modoorockAdminReportPage.module.css";

const ModoorockAdminReportPage = ({ reportList, loadReportList }) => {
  console.log(reportList);
  return (
    <section className={styles.report_page}>
      <div className={styles.main}>
        <div className={styles.top}>
          <h1 className={styles.title}>신고관리</h1>
        </div>
        <section className={styles.header}>
          <p className={styles.idx}>번호</p>
          <p className={styles.report_id}>신고자</p>
          <p className={styles.content}>내용</p>
          <p className={styles.id}>작성자</p>
          <p className={styles.buttons}>취소/삭제</p>
        </section>
        <div className={styles.list}>
          {reportList.length === 0 ? (
            <p className={styles.nothing}>신고 내역이 없습니다.</p>
          ) : (
            reportList.map((item) => (
              <ModoorockAdminReportItem
                key={item.idx}
                item={item}
                loadReportList={loadReportList}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
export default ModoorockAdminReportPage;
