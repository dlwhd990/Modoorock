import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styles from "./app.module.css";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import AboutUs from "./components/about/aboutUs/aboutUs";
import Mainpage from "./components/mainpage/mainpage";
import LoginPage from "./components/loginPage/loginPage";
import ServiceIntro from "./components/about/serviceIntro/serviceIntro";
import Signup from "./components/signup/signup";
import Programs from "./components/programs/programs";
import Contact from "./components/contact/contact";
import FindId from "./components/find/findId/findId";
import FindPw from "./components/find/findPw/findPw";

const App = (props) => {
  const [sixLatestProgramList, setSixLatestProgramList] = useState([
    {
      id: 0,
      image_url:
        "https://static.wixstatic.com/media/9e9163_dc64f2b4cbc941a5b6dd2a01ff9ac565~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_013.webp",
      title: "[월미도]2020 월림픽: 랭킹에 도전하라_★x3",
      price: "25,000원",
    },
    {
      id: 1,
      image_url:
        "https://static.wixstatic.com/media/9e9163_dc64f2b4cbc941a5b6dd2a01ff9ac565~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_013.webp",
      title: "[월미도]2021 월림픽: 랭킹에 도전하라_★x3",
      price: "25,000원",
    },
    {
      id: 2,
      image_url:
        "https://static.wixstatic.com/media/9e9163_dc64f2b4cbc941a5b6dd2a01ff9ac565~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_013.webp",
      title: "[월미도]2022 월림픽: 랭킹에 도전하라_★x3",
      price: "25,000원",
    },
    {
      id: 3,
      image_url:
        "https://static.wixstatic.com/media/9e9163_dc64f2b4cbc941a5b6dd2a01ff9ac565~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_013.webp",
      title: "[월미도]2023 월림픽: 랭킹에 도전하라_★x3",
      price: "25,000원",
    },
    {
      id: 4,
      image_url:
        "https://static.wixstatic.com/media/9e9163_dc64f2b4cbc941a5b6dd2a01ff9ac565~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_013.webp",
      title: "[월미도]2024 월림픽: 랭킹에 도전하라_★x3",
      price: "25,000원",
    },
    {
      id: 5,
      image_url:
        "https://static.wixstatic.com/media/9e9163_dc64f2b4cbc941a5b6dd2a01ff9ac565~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_013.webp",
      title: "[월미도]2025 월림픽: 랭킹에 도전하라_★x3",
      price: "25,000원",
    },
  ]);
  const [mainPageSlick, setMainPageSlick] = useState([
    {
      id: 0,
      image_url:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
      desc: "[북촌 한옥마을 미션투어]",
    },
    {
      id: 1,
      image_url:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
      desc: "[북 한옥마을 미션투어]",
    },
    {
      id: 2,
      image_url:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
      desc: "[북촌 옥마을 미션투어]",
    },
    {
      id: 3,
      image_url:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
      desc: "[북촌 한옥을 미션투어]",
    },
    {
      id: 4,
      image_url:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
      desc: "[북촌 한옥마을 션투어]",
    },
    {
      id: 5,
      image_url:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
      desc: "[북촌 한옥마을 미투어]",
    },
    {
      id: 6,
      image_url:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
      desc: "[북촌 한옥마을 미션어]",
    },
    {
      id: 7,
      image_url:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
      desc: "[북촌 한옥마을 미션투]",
    },
  ]);

  const [serviceVideoList, setServiceVideoList] = useState([
    {
      id: 0,
      image_url:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
      desc: "[북촌 한옥마을 미션투어]",
    },
    {
      id: 1,
      image_url:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
      desc: "[북 한옥마을 미션투어]",
    },
    {
      id: 2,
      image_url:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
      desc: "[북촌 옥마을 미션투어]",
    },
    {
      id: 3,
      image_url:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
      desc: "[북촌 한옥을 미션투어]",
    },
    {
      id: 4,
      image_url:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
      desc: "[북촌 한옥마을 션투어]",
    },
    {
      id: 5,
      image_url:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
      desc: "[북촌 한옥마을 미투어]",
    },
    {
      id: 6,
      image_url:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
      desc: "[북촌 한옥마을 미션어]",
    },
    {
      id: 7,
      image_url:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
      desc: "[북촌 한옥마을 미션투]",
    },
  ]);

  const [programList, setProgramList] = useState([
    {
      id: 0,
      image_url:
        "https://static.wixstatic.com/media/9e9163_dc64f2b4cbc941a5b6dd2a01ff9ac565~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_013.webp",
      title: "포켓동물원",
      subtitle: "전설의 동물을 찾아라!",
      location: "[과천 - 서울대공원]",
    },
    {
      id: 1,
      image_url:
        "https://static.wixstatic.com/media/9e9163_1ea9c918e2104ccb89214c92a219e3e6~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_014.webp",
      title: "캠프통 스튜디오",
      subtitle: "압구정 카페 캠프통",
      location: "[압구정 - 캠프통 카페]",
    },
    {
      id: 2,
      image_url:
        "https://static.wixstatic.com/media/9e9163_65f96fc9a5b44f2db81195bf369909a6~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_010.webp",
      title: "어바웃타임",
      subtitle: "시간약탈자를 찾아서",
      location: "[합천 - 드라마 세트장]",
    },
    {
      id: 3,
      image_url:
        "https://static.wixstatic.com/media/9e9163_dc64f2b4cbc941a5b6dd2a01ff9ac565~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_013.webp",
      title: "포켓동물원",
      subtitle: "전설의 동물을 찾아라!",
      location: "[과천 - 서울대공원]",
    },
    {
      id: 4,
      image_url:
        "https://static.wixstatic.com/media/9e9163_1ea9c918e2104ccb89214c92a219e3e6~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_014.webp",
      title: "캠프통 스튜디오",
      subtitle: "압구정 카페 캠프통",
      location: "[압구정 - 캠프통 카페]",
    },
    {
      id: 5,
      image_url:
        "https://static.wixstatic.com/media/9e9163_65f96fc9a5b44f2db81195bf369909a6~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_010.webp",
      title: "어바웃타임",
      subtitle: "시간약탈자를 찾아서",
      location: "[합천 - 드라마 세트장]",
    },
  ]);

  return (
    <section className={styles.app}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <Route exact path="/">
          <Mainpage
            sixLatestProgramList={sixLatestProgramList}
            viewItems={mainPageSlick}
          />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/findID">
          <FindId />
        </Route>
        <Route exact path="/findPW">
          <FindPw />
        </Route>
        <Route exact path="/about">
          <AboutUs />
        </Route>
        <Route exact path="/service_intro">
          <ServiceIntro viewItems={serviceVideoList} />
        </Route>
        <Route exact path="/programs">
          <Programs programList={programList} />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Footer />
      </BrowserRouter>
    </section>
  );
};

export default App;
