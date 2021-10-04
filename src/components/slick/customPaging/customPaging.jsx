import React, { Component } from "react";
import Slider from "react-slick";
import "./customPaging.css";

export default class CustomPaging extends Component {
  render() {
    const settings = {
      customPaging: function (i) {
        return (
          <a>
            <img src={`/Modoorock/images/${i + 1}.png`} className="dot_image" />
          </a>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="custom_paging_container">
        <Slider {...settings}>
          <div>
            <img src="/Modoorock/images/kakao.png" className="image" />
          </div>
          <div>
            <img src="/Modoorock/images/arrow.png" className="image" />
          </div>
          <div>
            <img src="/Modoorock/images/logo_blue.png" className="image" />
          </div>
          <div>
            <img src="/Modoorock/images/logo_dark.png" className="image" />
          </div>
        </Slider>
      </div>
    );
  }
}
