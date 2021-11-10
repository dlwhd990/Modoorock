import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./templateSlick.css";
import "slick-carousel/slick/slick-theme.css";
import TemplateSlickItem from "./templateSlickItem/templateSlickItem";

function NextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <img
      src="/modoorock/images/arrow_next.png"
      alt="arrow"
      className={`${className} arrow`}
      style={{
        ...style,
        display: "block",
        width: 40,
        height: 40,
        top: 270,
        right: 0, //임시
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
      src="/modoorock/images/arrow_prev.png"
      alt="arrow"
      className={`${className} arrow`}
      style={{
        ...style,
        display: "block",
        width: 40,
        height: 40,
        top: 270,
        left: 0, //임시
        zIndex: 2,
        backgroundColor: "transparent",
      }}
      onClick={onClick}
    />
  );
}

export default class TemplateSlick extends Component {
  render() {
    const { viewItems, templateTempSelectHandler, templateTempValue } =
      this.props;
    const settings = {
      //autoplaySpeed: 3500,
      //autoplay: true,
      pauseOnHover: true,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
    return (
      <div className="slick_template_container">
        <Slider {...settings}>
          {viewItems.map((item) => (
            <TemplateSlickItem
              key={item.idx}
              item={item}
              templateTempSelectHandler={templateTempSelectHandler}
              templateTempValue={templateTempValue}
            />
          ))}
        </Slider>
      </div>
    );
  }
}
