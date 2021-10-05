import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styles from "./app.module.css";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Mainpage from "./components/mainpage/mainpage";
import LoginPage from "./components/loginPage/loginPage";
import Signup from "./components/signup/signup";
import Programs from "./components/programs/programs";
import Contact from "./components/contact/contact";
import FindId from "./components/find/findId/findId";
import FindPw from "./components/find/findPw/findPw";
import Introduce from "./components/about/introduce";
import CustomerCenter from "./components/customerCenter/customerCenter";

const App = (props) => {
  const [mainPageSlick, setMainPageSlick] = useState([
    {
      idx: 0,
      date: "보류",
      title: "[북촌 한옥마을 미션투어]",
      content: "https://www.youtube.com/watch?v=fRgizRKpE_Q",
      thumbnail:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
    },
    {
      idx: 1,
      date: "보류",
      title: "[북촌 한옥마을 미션투어]",
      content: "https://www.youtube.com/watch?v=fRgizRKpE_Q",
      thumbnail:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
    },
    {
      idx: 2,
      date: "보류",
      title: "[북촌 한옥마을 미션투어]",
      content: "https://www.youtube.com/watch?v=fRgizRKpE_Q",
      thumbnail:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
    },
    {
      idx: 3,
      date: "보류",
      title: "[북촌 한옥마을 미션투어]",
      content: "https://www.youtube.com/watch?v=fRgizRKpE_Q",
      thumbnail:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
    },
    {
      idx: 4,
      date: "보류",
      title: "[북촌 한옥마을 미션투어]",
      content: "https://www.youtube.com/watch?v=fRgizRKpE_Q",
      thumbnail:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
    },
    {
      idx: 5,
      date: "보류",
      title: "[북촌 한옥마을 미션투어]",
      content: "https://www.youtube.com/watch?v=fRgizRKpE_Q",
      thumbnail:
        "https://static.wixstatic.com/media/9e9163_0d65cbf903064b47872fb9fc8bc3428c~mv2.png/v1/fill/w_724,h_516,al_c,lg_1,q_90/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94_-002%20(1).webp",
    },
  ]);

  const [programList, setProgramList] = useState([
    {
      idx: 0,
      title: "포켓동물원 포켓동물원 포켓동물원",
      area: "[과천 - 서울대공원]",
      user_idx: "관리자(보류)",
      date: "보류",
      price: 25000,
      photo:
        "https://static.wixstatic.com/media/9e9163_dc64f2b4cbc941a5b6dd2a01ff9ac565~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_013.webp",
    },
    {
      idx: 1,
      title: "캠프통 스튜디오",
      area: "[압구정 - 캠프통 카페]",
      user_idx: "관리자(보류)",
      date: "보류",
      price: 25000,
      photo:
        "https://static.wixstatic.com/media/9e9163_1ea9c918e2104ccb89214c92a219e3e6~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_014.webp",
    },
    {
      idx: 2,
      title: "어바웃타임",

      area: "[합천 - 드라마 세트장]",
      user_idx: "관리자(보류)",
      date: "보류",
      price: 25000,
      photo:
        "https://static.wixstatic.com/media/9e9163_65f96fc9a5b44f2db81195bf369909a6~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_010.webp",
    },
    {
      idx: 3,
      title: "포켓동물원",

      area: "[과천 - 서울대공원]",
      user_idx: "관리자(보류)",
      date: "보류",
      price: 25000,
      photo:
        "https://static.wixstatic.com/media/9e9163_dc64f2b4cbc941a5b6dd2a01ff9ac565~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_013.webp",
    },
    {
      idx: 4,
      title: "캠프통 스튜디오",

      area: "[압구정 - 캠프통 카페]",
      user_idx: "관리자(보류)",
      date: "보류",
      price: 25000,
      photo:
        "https://static.wixstatic.com/media/9e9163_1ea9c918e2104ccb89214c92a219e3e6~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_014.webp",
    },
    {
      idx: 5,
      title: "어바웃타임",

      area: "[합천 - 드라마 세트장]",
      user_idx: "관리자(보류)",
      date: "보류",
      price: 25000,
      photo:
        "https://static.wixstatic.com/media/9e9163_65f96fc9a5b44f2db81195bf369909a6~mv2.png/v1/crop/x_0,y_12,w_860,h_1076/fill/w_622,h_778,al_c,q_90,usm_0.66_1.00_0.01/%EC%8A%A4%ED%86%A0%EC%96%B4%ED%8C%9C%20%ED%91%9C%EC%A7%80_%EB%B3%B5%EC%82%AC%EB%B3%B8_010.webp",
    },
  ]);

  const [noticeArticles, setNoticeArticles] = useState([
    {
      idx: 0,
      type: "주문/배송/반품",
      date: "2021/10/05",
      title: "공지입니다.",
      content: "공지내용",
    },
    {
      idx: 1,
      type: "멤버쉽",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
    {
      idx: 2,
      type: "사이트 이용",
      date: "2021/10/05",
      title: "공지입다.",
      content: "공지내용",
    },
    {
      idx: 3,
      type: "주문/배송/반품",
      date: "2021/10/05",
      title: "공지입니다.",
      content: "공지내용",
    },
    {
      idx: 4,
      type: "멤버쉽",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
    {
      idx: 5,
      type: "사이트 이용",
      date: "2021/10/05",
      title: "공지입다.",
      content: "공지내용",
    },
    {
      idx: 6,
      type: "주문/배송/반품",
      date: "2021/10/05",
      title: "공지입니다.",
      content: "공지내용",
    },
    {
      idx: 7,
      type: "멤버쉽",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
    {
      idx: 8,
      type: "사이트 이용",
      date: "2021/10/05",
      title: "공지입다.",
      content: "공지내용",
    },
    {
      idx: 9,
      type: "주문/배송/반품",
      date: "2021/10/05",
      title: "공지입니다.",
      content: "공지내용",
    },
    {
      idx: 10,
      type: "사이트 이용",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
    {
      idx: 11,
      type: "멤버쉽",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
    {
      idx: 12,
      type: "사이트 이용",
      date: "2021/10/05",
      title: "공지입다.",
      content: "공지내용",
    },
    {
      idx: 13,
      type: "주문/배송/반품",
      date: "2021/10/05",
      title: "공지입니다.",
      content: "공지내용",
    },
    {
      idx: 14,
      type: "멤버쉽",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
    {
      idx: 15,
      type: "사이트 이용",
      date: "2021/10/05",
      title: "공지입다.",
      content: "공지내용",
    },
    {
      idx: 16,
      type: "주문/배송/반품",
      date: "2021/10/05",
      title: "공지입니다.",
      content: "공지내용",
    },
    {
      idx: 17,
      type: "멤버쉽",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
    {
      idx: 18,
      type: "사이트 이용",
      date: "2021/10/05",
      title: "공지입다.",
      content: "공지내용",
    },
    {
      idx: 19,
      type: "주문/배송/반품",
      date: "2021/10/05",
      title: "공지입니다.",
      content: "공지내용",
    },
    {
      idx: 20,
      type: "상품",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
    {
      idx: 21,
      type: "멤버쉽",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
    {
      idx: 22,
      type: "사이트 이용",
      date: "2021/10/05",
      title: "공지입다.",
      content: "공지내용",
    },
    {
      idx: 23,
      type: "주문/배송/반품",
      date: "2021/10/05",
      title: "공지입니다.",
      content: "공지내용",
    },
    {
      idx: 24,
      type: "멤버쉽",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
    {
      idx: 25,
      type: "사이트 이용",
      date: "2021/10/05",
      title: "공지입다.",
      content: "공지내용",
    },
    {
      idx: 26,
      type: "주문/배송/반품",
      date: "2021/10/05",
      title: "공지입니다.",
      content: "공지내용",
    },
    {
      idx: 27,
      type: "멤버쉽",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
    {
      idx: 28,
      type: "사이트 이용",
      date: "2021/10/05",
      title: "공지입다.",
      content: "공지내용",
    },
    {
      idx: 29,
      type: "주문/배송/반품",
      date: "2021/10/05",
      title: "공지입니다.",
      content: "공지내용",
    },
    {
      idx: 30,
      type: "멤버쉽",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
    {
      idx: 31,
      type: "멤버쉽",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
    {
      idx: 32,
      type: "사이트 이용",
      date: "2021/10/05",
      title: "공지입다.",
      content: "공지내용",
    },
    {
      idx: 33,
      type: "주문/배송/반품",
      date: "2021/10/05",
      title: "공지입니다.",
      content: "공지내용",
    },
    {
      idx: 34,
      type: "멤버쉽",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
    {
      idx: 35,
      type: "사이트 이용",
      date: "2021/10/05",
      title: "공지입다.",
      content: "공지내용",
    },
    {
      idx: 36,
      type: "주문/배송/반품",
      date: "2021/10/05",
      title: "공지입니다.",
      content: "공지내용",
    },
    {
      idx: 37,
      type: "멤버쉽",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
    {
      idx: 38,
      type: "사이트 이용",
      date: "2021/10/05",
      title: "공지입다.",
      content: "공지내용",
    },
    {
      idx: 39,
      type: "주문/배송/반품",
      date: "2021/10/05",
      title: "공지입니다.",
      content: "공지내용",
    },
    {
      idx: 40,
      type: "사이트 이용",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
    {
      idx: 41,
      type: "멤버쉽",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
    {
      idx: 42,
      type: "사이트 이용",
      date: "2021/10/05",
      title: "공지입다.",
      content: "공지내용",
    },
    {
      idx: 43,
      type: "주문/배송/반품",
      date: "2021/10/05",
      title: "공지입니다.",
      content: "공지내용",
    },
    {
      idx: 44,
      type: "멤버쉽",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
    {
      idx: 45,
      type: "사이트 이용",
      date: "2021/10/05",
      title: "공지입다.",
      content: "공지내용",
    },
    {
      idx: 46,
      type: "주문/배송/반품",
      date: "2021/10/05",
      title: "공지입니다.",
      content: "공지내용",
    },
    {
      idx: 47,
      type: "멤버쉽",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
    {
      idx: 48,
      type: "사이트 이용",
      date: "2021/10/05",
      title: "공지입다.",
      content: "공지내용",
    },
    {
      idx: 49,
      type: "주문/배송/반품",
      date: "2021/10/05",
      title: "공지입니다.",
      content: "공지내용",
    },
    {
      idx: 50,
      type: "사이트 이용",
      date: "2021/10/05",
      title: "공지니다.",
      content: "공지내용",
    },
  ]);

  return (
    <section className={styles.app}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <Route exact path="/">
          <Mainpage programList={programList} viewItems={mainPageSlick} />
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
        <Route exact path="/introduce/:path">
          <Introduce viewItems={mainPageSlick} />
        </Route>
        <Route exact path="/programs/:path">
          <Programs programList={programList} />
        </Route>
        <Route exact path="/customer/:path">
          <CustomerCenter noticeArticles={noticeArticles} />
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
