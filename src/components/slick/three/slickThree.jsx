import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import "./slickThree.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        width: 20,
        height: 20,
        top: 115,
        right: 250,
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
        width: 20,
        height: 20,
        top: 115,
        left: 250,
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
}

export default class SimpleSliderThree extends Component {
  render() {
    const { viewItems } = this.props;
    const settings = {
      autoplaySpeed: 3500,
      autoplay: true,
      pauseOnHover: true,
      dots: false,
      infinite: true,
      speed: 500,
      focusOnSelect: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      centerPadding: "20px",
      variableWIdth: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };

    return (
      <div className="slick_container">
        <Slider {...settings}>
          {viewItems.map((item) => (
            <div key={item.id} className="image_box">
              <img src={item.image_url} alt="slide_image" className="image" />
              <p className="desc">{item.desc}</p>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
