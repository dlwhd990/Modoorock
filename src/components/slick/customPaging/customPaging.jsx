import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import "./customPaging.css";

function NextArrow(props) {
  const { className, style, onClick } = props;
  const [arrow, setArrow] = useState("none");
  useEffect(() => {
    if (window.innerWidth > 640) {
      setArrow("block");
    } else {
      setArrow("none");
    }
  }, [window.innerWidth]);
  return (
    <img
      src="/modoorock/images/arrow-right.png"
      alt="arrow"
      className={`${className} arrow`}
      style={{
        ...style,
        display: arrow,
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
  const [arrow, setArrow] = useState("none");
  useEffect(() => {
    if (window.innerWidth > 640) {
      setArrow("block");
    } else {
      setArrow("none");
    }
  }, [window.innerWidth]);
  return (
    <img
      src="/modoorock/images/arrow-left.png"
      alt="arrow"
      className={`${className} arrow`}
      style={{
        ...style,
        display: arrow,
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
    const { imageList } = this.props;
    const settings = {
      customPaging: function (i) {
        return (
          <a>
            <img
              src={`${process.env.REACT_APP_BASEURL}-images/Exp/${
                imageList[i - 1 + 1]
              }`}
              alt="select_image"
              className="dot_image"
            />
          </a>
        );
      },
      //autoplaySpeed: 5000,
      //autoplay: true,
      //pauseOnHover: true,
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
          {imageList.map((item) => (
            <div key={item}>
              <img
                src={`${process.env.REACT_APP_BASEURL}-images/Exp/${item}`}
                alt="slide_image"
                className="image"
              />
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
