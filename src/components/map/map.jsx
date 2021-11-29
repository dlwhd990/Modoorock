import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./map.module.css";

const Map = (props) => {
  //test
  const markerData = [
    {
      title: "콜드스퀘어",
      lat: 37.62197524055062,
      lng: 127.16017523675508,
    },
    {
      title: "하남돼지집",
      lat: 37.620842424005616,
      lng: 127.1583774403176,
    },
    {
      title: "수유리우동",
      lat: 37.624915253753194,
      lng: 127.15122688059974,
    },
    {
      title: "맛닭꼬",
      lat: 37.62456273069659,
      lng: 127.15211256646381,
    },
  ];
  const imageSrc = "/modoorock/images/map_marker_attraction.png";
  const clickImageSrc = "/modoorock/images/map_marker_attraction_pick.png";

  useEffect(() => {
    const firstSetting = async () => {
      const key =
        "In8axo7mHXm%2FnoXZcwxqOrNJu8CpjzpOEhvGF8yqc6yhYtrXMZR6GuvmoZEGqH49uPEz7PtWM5dNgJ74x21yBQ%3D%3D";
      const uri = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/locationBasedList?ServiceKey=${key}&contentTypeId=12&mapX=126.981106&mapY=37.568477&radius=2000&listYN=Y&MobileOS=ETC&MobileApp=Modoorock&arrange=A&numOfRows=12&pageNo=1&_type=json`;
      await fetch(uri)
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    };
    firstSetting();
    mapStart();
  }, []);

  const mapStart = () => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.6219, 127.1601),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);

    var imageSize = new window.kakao.maps.Size(24, 35);

    // 마커 이미지 생성
    let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
    //let clickMarkerImage = new window.kakao.maps.MarkerImage(
    //  clickImageSrc,
    //  imageSize
    //);

    markerData.forEach((item) => {
      new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(item.lat, item.lng),
        title: item.title,
        image: markerImage,
      });
    });
  };

  return (
    <div className="">
      <div id="map" className={styles.map}></div>
    </div>
  );
};

export default Map;
