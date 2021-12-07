import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import styles from "./map.module.css";

let markers = [];

const Map = (props) => {
  const { lat, lng } = useParams();
  const [map, setMap] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [userLon, setUserLon] = useState(null);
  const [placeData, setPlaceData] = useState(null);
  const [detail, setDetail] = useState(false);

  const titleRef = useRef();
  const imageRef = useRef();
  const addressRef = useRef();
  const telRef = useRef();
  let selectedMarker, selectedMarkerImage;
  let imageSrc, clickImageSrc;

  const deleteMarker = () => {
    if (!markers) {
      return;
    }
    markers.forEach((item) => {
      item.setMap(null);
    });
    markers = [];
  };

  const setPlaceMarkerImage = (type) => {
    if (type === 12) {
      imageSrc = "/modoorock/images/map_marker_attraction.png";
      clickImageSrc = "/modoorock/images/map_marker_attraction_pick.png";
    } else if (type === 14) {
      imageSrc = "/modoorock/images/map_marker_culture.png";
      clickImageSrc = "/modoorock/images/map_marker_culture_pick.png";
    } else if (type === 28) {
      imageSrc = "/modoorock/images/map_marker_leisure.png";
      clickImageSrc = "/modoorock/images/map_marker_leisure_pick.png";
    } else if (type === 38) {
      imageSrc = "/modoorock/images/map_marker_shopping.png";
      clickImageSrc = "/modoorock/images/map_marker_shopping_pick.png";
    } else if (type === 39) {
      imageSrc = "/modoorock/images/map_marker_food.png";
      clickImageSrc = "/modoorock/images/map_marker_food_pick.png";
    } else if (type === 32) {
      imageSrc = "/modoorock/images/map_marker_accommodation.png";
      clickImageSrc = "/modoorock/images/map_marker_accommodation_pick.png";
    } else if (type === 25) {
      imageSrc = "/modoorock/images/map_marker_course.png";
      clickImageSrc = "/modoorock/images/map_marker_course_pick.png";
    } else if (type === 15) {
      imageSrc = "/modoorock/images/map_marker_festival.png";
      clickImageSrc = "/modoorock/images/map_marker_festival_pick.png";
    }
  };

  const placeSetting = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/openapi/locationbasedlist`, {
        mapX: userLon.toString(),
        mapY: userLat.toString(),
        radius: "2000",
        listYN: "Y",
        mobileOS: "ETC",
        mobileApp: "modoorock",
        arrange: "E",
        numOfRows: "300",
        pageNo: "1",
      })
      .then((response) => setPlaceData(response.data.data))
      .catch((err) => console.error(err));
  };

  const loadPlace = () => {
    if (map) {
      var mapCenter = map.getCenter();
      setUserLon(mapCenter.getLng());
      setUserLat(mapCenter.getLat());
    }
  };
  const mapStart = async () => {
    //유저 위도 경도 받아오는 작업 필요
    const nowLat = parseFloat(lat) || 37.55523;
    const nowLng = parseFloat(lng) || 126.97089;

    setUserLat(nowLat);
    setUserLon(nowLng);
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(nowLat, nowLng),
      level: 3,
    };
    setMap(new window.kakao.maps.Map(container, options));
  };

  useEffect(() => {
    if (!map) {
      return;
    }
    window.kakao.maps.event.addListener(map, "dragend", function () {
      loadPlace();
    });
    window.kakao.maps.event.addListener(map, "click", function () {
      let imageSize = new window.kakao.maps.Size(24, 35);
      let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
      selectedMarker && selectedMarker.setImage(markerImage);
      setDetail(false);
    });
  }, [map]);

  useEffect(() => {
    if (!userLat || !userLon) {
      return;
    }
    placeSetting();
  }, [userLat]);

  useEffect(() => {
    placeData && displayMarkers();
  }, [placeData]);

  const displayMarkers = () => {
    deleteMarker();
    let imageSize = new window.kakao.maps.Size(24, 35);
    placeData.forEach((item) => {
      setPlaceMarkerImage(item.contenttypeid);

      // 마커 이미지 생성
      let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
      let clickMarkerImage = new window.kakao.maps.MarkerImage(
        clickImageSrc,
        imageSize
      );

      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(item.mapy, item.mapx),
        title: item.title,
        image: markerImage,
      });
      markers.push(marker);
      window.kakao.maps.event.addListener(marker, "click", function () {
        window.kakao.maps.event.addListener(map, "click", function () {
          selectedMarker && selectedMarker.setImage(selectedMarkerImage);
        });
        selectedMarker && selectedMarker.setImage(selectedMarkerImage);
        selectedMarker = marker;
        selectedMarkerImage = markerImage;
        selectedMarker.setImage(clickMarkerImage);
        titleRef.current.innerText = item.title ? item.title : "코스 시작점";
        imageRef.current.src = item.firstimage
          ? item.firstimage
          : "https://web.modoorock.com/modoorock-images/no_image.png";
        addressRef.current.innerText = item.addr1 ? item.addr1 : "";
        telRef.current.innerText = item.tel ? item.tel : "";
        setDetail(true);
      });
    });
  };

  useEffect(() => {
    mapStart();
  }, []);

  return (
    <div className="">
      <div id="map" className={styles.map}></div>
      <div
        className={`${
          detail
            ? `${styles.detail} ${styles.on}`
            : `${styles.detail} ${styles.off}`
        }`}
      >
        <div className={styles.title_container}>
          <p ref={titleRef} className={styles.title}></p>
        </div>
        <div className={styles.body}>
          <img ref={imageRef} alt="place" className={styles.image} />
          <div className={styles.desc}>
            <div ref={addressRef} className={styles.address}></div>
            <div ref={telRef} className={styles.tel}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
