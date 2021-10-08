import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./programsTheme.css";
import "slick-carousel/slick/slick-theme.css";
import ThemeSlickItem from "../../programs/themeSlickItem/themeSlickItem";

function NextArrow(props) {
  const { className, style, onClick } = props;
  const [arrowPosition, setArrowPosition] = useState(70);
  const [arrowDisplay, setArrowDisplay] = useState("none");
  useEffect(() => {
    if (window.innerWidth > 500) {
      setArrowDisplay("block");
    } else {
      setArrowDisplay("none");
    }
  }, [window.innerWidth]);
  useEffect(() => {
    if (window.innerWidth > 1150) {
      setArrowPosition(70);
    } else if (window.innerWidth > 800) {
      setArrowPosition(40);
    } else {
      setArrowPosition(0);
    }
  }, [window.innerWidth]);

  return (
    <img
      src="/Modoorock/images/arrow_next.png"
      alt="arrow"
      className={`${className} arrow`}
      style={{
        ...style,
        display: arrowDisplay,
        width: 40,
        height: 40,
        top: 200,
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
  const [arrowDisplay, setArrowDisplay] = useState("none");
  useEffect(() => {
    if (window.innerWidth > 500) {
      setArrowDisplay("block");
    } else {
      setArrowDisplay("none");
    }
  }, [window.innerWidth]);
  useEffect(() => {
    if (window.innerWidth > 1150) {
      setArrowPosition(100);
    } else if (window.innerWidth > 800) {
      setArrowPosition(60);
    } else {
      setArrowPosition(0);
    }
  }, [window.innerWidth]);

  return (
    <img
      src="/Modoorock/images/arrow_prev.png"
      alt="arrow"
      className={`${className} arrow`}
      style={{
        ...style,
        display: arrowDisplay,
        width: 40,
        height: 40,
        top: 200,
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
    const { viewItems, areaList } = this.props;
    const settings = {
      //autoplaySpeed: 3500,
      //autoplay: true,
      pauseOnHover: true,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: this.state.slideNum,
      slidesToScroll: 1,
      arrows: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
    return (
      <div className="slick_programs_container">
        <Slider {...settings}>
          {viewItems.map((item) => (
            <ThemeSlickItem key={item.idx} item={item} areaList={areaList} />
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
