import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import "./slickThree.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props) {
  const { className, style, onClick } = props;
  const [arrowPosition, setArrowPosition] = useState(250);
  useEffect(() => {
    if (window.innerWidth > 1200) {
      setArrowPosition(250);
    } else if (window.innerWidth > 780) {
      setArrowPosition(150);
    } else {
      setArrowPosition(0);
    }
  }, [window.innerWidth]);
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        width: 20,
        height: 20,
        top: 115,
        right: arrowPosition,
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  const [arrowPosition, setArrowPosition] = useState(250);
  useEffect(() => {
    if (window.innerWidth > 1200) {
      setArrowPosition(250);
    } else if (window.innerWidth > 780) {
      setArrowPosition(150);
    } else {
      setArrowPosition(0);
    }
  }, [window.innerWidth]);
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        width: 20,
        height: 20,
        top: 115,
        left: arrowPosition,
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
}

export default class SimpleSliderThree extends Component {
  state = { slideNum: window.innerWidth > 780 ? 3 : 1 };
  render() {
    const { viewItems } = this.props;
    const settings = {
      autoplaySpeed: 3500,
      autoplay: true,
      pauseOnHover: true,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: this.state.slideNum,
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
  updateDimensions = () => {
    let num = window.innerWidth > 780 ? 3 : 1;
    this.setState({ slideNum: num });
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
}
