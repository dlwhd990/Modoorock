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
    const { viewItems } = this.props;
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
          {viewItems.map((item) => (
            <div className={styles.image_box}>
              <img
                src={item.image_url}
                alt="slide_image"
                className={styles.image}
              />
              <p className={styles.desc}>{item.desc}</p>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
