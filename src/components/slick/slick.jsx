import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import styles from "./slick.module.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        width: 100,
        height: 100,
        top: 130,
        right: -120,
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        width: 100,
        height: 100,
        top: 130,
        left: -40,
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
}

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      autoplay: true,
      autoplaySpeed: 3500,
      pauseOnHover: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
    return (
      <div className={styles.slick_container}>
        <Slider {...settings}>
          <div className={styles.image_box}>
            <img
              src="https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp"
              alt=""
              className={styles.image}
            />
            <p className={styles.desc}>[북촌 한옥마을 미션투어]</p>
          </div>
          <div className={styles.image_box}>
            <img
              src="https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp"
              alt=""
              className={styles.image}
            />
            <p className={styles.desc}>[북촌 한옥마을 미션투어]</p>
          </div>
          <div className={styles.image_box}>
            <img
              src="https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp"
              alt=""
              className={styles.image}
            />
            <p className={styles.desc}>[북촌 한옥마을 미션투어]</p>
          </div>
          <div className={styles.image_box}>
            <img
              src="https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp"
              alt=""
              className={styles.image}
            />
            <p className={styles.desc}>[북촌 한옥마을 미션투어]</p>
          </div>
          <div className={styles.image_box}>
            <img
              src="https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp"
              alt=""
              className={styles.image}
            />
            <p className={styles.desc}>[북촌 한옥마을 미션투어]</p>
          </div>
          <div className={styles.image_box}>
            <img
              src="https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp"
              alt=""
              className={styles.image}
            />
            <p className={styles.desc}>[북촌 한옥마을 미션투어]</p>
          </div>
        </Slider>
      </div>
    );
  }
}
