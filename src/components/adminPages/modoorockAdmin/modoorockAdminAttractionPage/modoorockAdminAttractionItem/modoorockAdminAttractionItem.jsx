import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./modoorockAdminAttractionItem.module.css";
import ModoorockAdminProgramItem from "./modoorockAdminProgramItem/modoorockAdminProgramItem";

const ModoorockAdminAttractionItem = ({
  item,
  userList,
  programList,
  loadAttractionList,
  loadProgramList,
}) => {
  const [user, setUser] = useState(null);
  const [myProgramList, setMyProgramList] = useState(null);
  const [programCount, setProgramCount] = useState(0);
  const [detailOn, setDetailOn] = useState(false);

  const attractionDeleteButtonHandler = (e) => {
    e.stopPropagation();
    const confirm = window.confirm(
      "정말로 관광지를 삭제하시겠습니까? 관광지를 삭제하면 관광지에 포함된 체험 상품들까지 모두 삭제되며 이는 절대 복구할 수 없습니다."
    );
    if (!confirm) {
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASEURL}/attraction/deleteattraction`, {
        idx: item.idx,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("삭제가 완료되었습니다.");
          loadAttractionList();
        } else {
          window.alert("에러가 발생했습니다. 새로고침 후에 다시 시도해주세요");
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    let count = 0;
    const myList = [];
    userList.forEach((user) => {
      if (user.idx === item.userIdx) {
        setUser(user);
        return false;
      }
    });
    programList.forEach((program) => {
      if (program.attractionIdx === item.idx) {
        count++;
        myList.push(program);
      }
    });
    setMyProgramList(myList);
    setProgramCount(count);
  }, [programList]);

  return (
    <div className={styles.item}>
      <div
        className={styles.attraction_container}
        onClick={() => setDetailOn(!detailOn)}
      >
        <div className={styles.image_container}>
          <img
            src={`${process.env.REACT_APP_BASEURL}-images/Attraction/${item.photo}`}
            alt="attraction_image"
            className={styles.image}
          />
        </div>
        <div className={styles.data_container}>
          <div className={styles.badge_container}>
            <div className={styles.badge}>{item.area}</div>
            <div className={styles.badge_count}>
              {`${programCount} 개의 체험상품`}
            </div>
          </div>
          <p className={styles.name}>{item.name}</p>
          <p className={styles.content}>{item.content}</p>
          <p className={styles.user}>
            {user &&
              user.phone &&
              `관리자: ${user.id} | 연락처: ${user.phone.slice(
                0,
                3
              )}-${user.phone.slice(3, 7)}-${user.phone.slice(7, 11)}`}
          </p>
        </div>
        <div className={styles.button_container}>
          <button
            className={styles.delete_button}
            onClick={attractionDeleteButtonHandler}
          >
            삭제
          </button>
        </div>
      </div>
      {detailOn &&
        myProgramList &&
        myProgramList.map((item) => (
          <ModoorockAdminProgramItem
            key={item.idx}
            item={item}
            loadProgramList={loadProgramList}
          />
        ))}
    </div>
  );
};

export default ModoorockAdminAttractionItem;
