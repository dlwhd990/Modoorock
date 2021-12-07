import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./programsTheme.css";
import "slick-carousel/slick/slick-theme.css";
import ThemeSlickItem from "./themeSlickItem/themeSlickItem";

function NextArrow(props) {
  const { className, style, onClick } = props;
  const [arrowPosition, setArrowPosition] = useState(70);
  const [arrowSize, setArrowSize] = useState(40);
  useEffect(() => {
    if (window.innerWidth > 500) {
      setArrowSize(40);
    } else {
      setArrowSize(20);
    }
  }, [window.innerWidth]);
  useEffect(() => {
    if (window.innerWidth > 1150) {
      setArrowPosition(70);
    } else if (window.innerWidth > 800) {
      setArrowPosition(40);
    } else {
      setArrowPosition(12);
    }
  }, [window.innerWidth]);

  return (
    <img
      src="/modoorock/images/arrow-right.png"
      alt="arrow"
      className={`${className} arrow`}
      style={{
        ...style,
        display: "block",
        width: arrowSize,
        height: arrowSize,
        top: 250,
        right: arrowPosition,
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  const [arrowPosition, setArrowPosition] = useState(70);
  const [arrowSize, setArrowSize] = useState(40);
  useEffect(() => {
    if (window.innerWidth > 500) {
      setArrowSize(40);
    } else {
      setArrowSize(20);
    }
  }, [window.innerWidth]);
  useEffect(() => {
    if (window.innerWidth > 1150) {
      setArrowPosition(100);
    } else if (window.innerWidth > 800) {
      setArrowPosition(60);
    } else {
      setArrowPosition(12);
    }
  }, [window.innerWidth]);

  return (
    <img
      src="/modoorock/images/arrow-left.png"
      alt="arrow"
      className={`${className} arrow`}
      style={{
        ...style,
        display: "block",
        width: arrowSize,
        height: arrowSize,
        top: 250,
        left: arrowPosition,
        zIndex: 2,
        backgroundColor: "transparent",
      }}
      onClick={onClick}
    />
  );
}

export default class ProgramsThemeSlick extends Component {
  state = {
    slideNum:
      window.innerWidth > 1600
        ? 4
        : window.innerWidth > 1200
        ? 3
        : window.innerWidth > 780
        ? 2
        : 1,
  };
  render() {
    const { viewItems, areaList, getReviewList } = this.props;
    console.log(viewItems);

    const settings = {
      //autoplaySpeed: 3500,
      //autoplay: true,
      pauseOnHover: true,
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: this.state.slideNum,
      slidesToScroll: this.state.slideNum,
      arrows: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
    return (
      <div className="slick_programs_container">
        <Slider {...settings}>
          {viewItems.map((item) => (
            <ThemeSlickItem
              key={item.idx}
              item={item}
              areaList={areaList}
              getReviewList={getReviewList}
            />
          ))}
        </Slider>
      </div>
    );
  }
  updateDimensions = () => {
    let num;
    if (window.innerWidth > 1600) {
      num = 4;
    } else if (window.innerWidth > 1200) {
      num = 3;
    } else if (window.innerWidth > 780) {
      num = 2;
    } else {
      num = 1;
    }
    this.setState({ slideNum: num });
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
}
