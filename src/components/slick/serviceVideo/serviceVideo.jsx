import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "./serviceVideo.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props) {
  const { className, style, onClick } = props;

  return (
    <img
      src="/modoorock/images/arrow-right.png"
      alt="arrow"
      className={`${className} arrow`}
      style={{
        ...style,
        display: "block",
        width: 40,
        height: 40,
        top: 230,
        right: 0,
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
      src="/modoorock/images/arrow-left.png"
      alt="arrow"
      className={`${className} arrow`}
      style={{
        ...style,
        display: "block",
        width: 40,
        height: 40,
        top: 230,
        left: 0,
        zIndex: 2,
        backgroundColor: "transparent",
      }}
      onClick={onClick}
    />
  );
}

export default class ServiceVideo extends Component {
  state = {
    slideNum: window.innerWidth > 1100 ? 3 : window.innerWidth > 780 ? 2 : 1,
  };
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
      variableWIdth: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
    return (
      <div className="slick_service_container">
        <Slider {...settings}>
          {viewItems.map((item) => (
            <div key={item.idx} className="image_box">
              <img
                src={`${process.env.REACT_APP_BASEURL}-images/Advertise/${item.thumbnail}`}
                alt="thumbnail"
                className="thumbnail"
                onClick={() => {
                  window.location.href = item.content;
                }}
              />
              <p className="title">{item.title}</p>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
  updateDimensions = () => {
    let num;
    if (window.innerWidth > 1100) {
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
