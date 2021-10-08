import React, { Component } from "react";
import Slider from "react-slick";
import "./customPaging.css";

function NextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <img
      src="/Modoorock/images/arrow-right.png"
      alt="arrow"
      className={`${className} arrow`}
      style={{
        ...style,
        display: "block",
        width: 40,
        height: 40,
        top: 350,
        right: -15,
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;

  return (
    <img
      src="/Modoorock/images/arrow-left.png"
      alt="arrow"
      className={`${className} arrow`}
      style={{
        ...style,
        display: "block",
        width: 40,
        height: 40,
        top: 350,
        left: -15,
        zIndex: 2,
        backgroundColor: "transparent",
      }}
      onClick={onClick}
    />
  );
}

export default class CustomPaging extends Component {
  render() {
    const settings = {
      customPaging: function (i) {
        return (
          <a>
            <img
              src={`/Modoorock/images/${i + 1}.png`}
              alt="select_image"
              className="dot_image"
            />
          </a>
        );
      },
      autoplaySpeed: 3500,
      autoplay: true,
      pauseOnHover: true,
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
    return (
      <div className="custom_paging_container">
        <Slider {...settings}>
          <div>
            <img
              src="/Modoorock/images/1.png"
              alt="slide_image"
              className="image"
            />
          </div>
          <div>
            <img
              src="/Modoorock/images/2.png"
              alt="slide_image"
              className="image"
            />
          </div>
          <div>
            <img
              src="/Modoorock/images/3.png"
              alt="slide_image"
              className="image"
            />
          </div>
          <div>
            <img
              src="/Modoorock/images/4.png"
              alt="slide_image"
              className="image"
            />
          </div>
        </Slider>
      </div>
    );
  }
}
