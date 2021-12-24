import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminProgramMissionItem from "../adminProgramMissionItem/adminProgramMissionItem";
import styles from "./adminProgramGameItem.module.css";

const AdminProgramGameItem = ({
  item,
  openMissionPopupHandler,
  loadGameList,
  loadMissionList,
  missionLoader,
  setMissionLoaderHandler,
  openAddItemPopupHandler,
}) => {
  const [viewDetail, setViewDetail] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [missionList, setMissionList] = useState(null);

  const viewDetailHandler = () => {
    setViewDetail(!viewDetail);
  };

  const loadDetailData = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/game/getgameinfo`, {
        idx: item.idx,
      })
      .then((response) => setDetailData(response.data))
      .catch((err) => console.error(err));
  };

  const setMissionOrder = () => {
    const newOrder = [];
    missionList.forEach((mission) => {
      newOrder.push(mission.idx.toString());
    });
    axios
      .post(`${process.env.REACT_APP_BASEURL}/game/missionsequence`, {
        idx: item.idx,
        inputSequence: newOrder,
      })
      .then((response) => console.log(response));
  };

  const onDeleteHandler = (e) => {
    e.stopPropagation();
    axios
      .post(`${process.env.REACT_APP_BASEURL}/game/deletegame`, {
        idx: item.idx,
      })
      .then((response) => {
        if (response.data === "success") {
          window.alert("삭제가 완료되었습니다.");
          loadGameList();
        } else {
          window.alert("에러가 발생했습니다. 새로고침 후에 다시 시도해주세요");
        }
      })
      .catch((err) => console.error(err));
  };

  const setMissionListHandler = (data) => {
    const orderList = detailData.sequence.split("#");
    const result = [];
    console.log(orderList);
    orderList.forEach((idx) => {
      const tmp = data.filter((item) => item.idx === parseInt(idx));
      result.push(tmp[0]);
    });
    setMissionList(result);
  };

  const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
  };

  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  const onDragStart = (e) => {
    const initialPosition = Number(e.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: missionList,
    });
    e.dataTransfer.setData("text/html", "");
  };

  const onDragOver = (e) => {
    e.preventDefault();
    let newList = dragAndDrop.originalOrder;
    const draggedFrom = dragAndDrop.draggedFrom;
    const draggedTo = Number(e.currentTarget.dataset.position);
    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFrom
    );
    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDrop = () => {
    setMissionList(dragAndDrop.updatedOrder);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  useEffect(() => {
    if (missionList) {
      setMissionOrder();
    }
  }, [missionList]);

  useEffect(() => {
    loadDetailData();
  }, []);

  useEffect(() => {
    if (!detailData) {
      return;
    }
    loadMissionList(item.idx, setMissionListHandler);
  }, [detailData, missionLoader]);

  return (
    <div className={styles.game_item}>
      <div className={styles.game_top} onClick={viewDetailHandler}>
        <div className={styles.division}>게임</div>
        <p className={styles.game_number}>{item.password}</p>
        <button
          className={styles.add_mission_button}
          data-where={item.idx}
          onClick={openMissionPopupHandler}
        >
          <i className={`${styles.add_button_icon} fas fa-plus`}></i>
        </button>
        <button
          className={styles.delete_mission_button}
          onClick={onDeleteHandler}
        >
          <i className={`${styles.delete_button_icon} fas fa-times`}></i>
        </button>
      </div>
      {viewDetail && (
        <div className={styles.detail}>
          {missionList &&
            missionList.map((item, index) => (
              <AdminProgramMissionItem
                key={item.idx}
                position={index}
                item={item}
                setMissionLoaderHandler={setMissionLoaderHandler}
                openAddItemPopupHandler={openAddItemPopupHandler}
                draggable="true"
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default AdminProgramGameItem;
