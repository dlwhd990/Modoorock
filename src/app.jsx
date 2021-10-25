import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styles from "./app.module.css";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Mainpage from "./components/mainpage/mainpage";
import LoginPage from "./components/loginPage/loginPage";
import Signup from "./components/signup/signup";
import Programs from "./components/programs/programs";
import Contact from "./components/contact/contact";
import Find from "./components/find/find";
import Introduce from "./components/about/introduce";
import CustomerCenter from "./components/customerCenter/customerCenter";
import Attraction from "./components/programs/attraction/attraction";
import ProgramDetail from "./components/programs/programDetail/programDetail";
import axios from "axios";
import WriteMain from "./components/customerCenter/writeMain/writeMain";
import LoadingPage from "./components/loadingPage/loadingPage";
import Mypage from "./components/mypage/mypage";
import SearchResultPage from "./components/customerCenter/searchResultPage/searchResultPage";
import FindIdResult from "./components/find/findId/findIdResult/findIdResult";
import AdminMain from "./components/adminPages/adminMain/adminMain";
import NoticeView from "./components/customerCenter/notice/noticeView/noticeView";

axios.defaults.withCredentials = true;

const App = (props) => {
  const [introVideos, setIntroVideos] = useState([
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

  const [areaList, setAreaList] = useState(null);

  const [programList, setProgramList] = useState([
    {
      idx: 0,
      title:
        "2021 월림픽에 도전하라! 2021 월림픽에 도전하라! 2021 월림픽에 도전하라! 2021 월림픽에 도전하라! 2021 월림픽에 도전하라! 2021 월림픽에 도전하라! 2021 월림픽에 도전하라! 2021 월림픽에 도전하라! 2021 월림픽에 도전하라!",
      content:
        "월미도(月尾島)는 인천광역시 중구 북성동에 속해 있는 섬이었다. 현재는 섬과 육지 사이가 메워졌다. 섬의 생김새가 반달 꼬리 모양 같아 붙여진 이름이다. 가장 높은 곳은 월미산으로, 해발 고도는 108m에 불과하다. 월미도 밑에는 그보다 작은 소월미도가 있다. 인천시민들과 그 주변 도시 주민들이 많이 찾는 명소이기도 하다.",
      user_idx: "관리자(보류)",
      date: 7,
      price: 25000,
      photo: "/Modoorock/images/service_right.png",
      attraction: 2,
    },
    {
      idx: 1,
      title: "2021 경림픽에 도전하라!",
      content:
        "경복궁에서 경림픽에 도전하라 경복궁에서 경림픽에 도전하라 경복궁에서 경림픽에 도전하라 경복궁에서 경림픽에 도전하라 경복궁에서 경림픽에 도전하라 경복궁에서 경림픽에 도전하라 경복궁에서 경림픽에 도전하라 경복궁에서 경림픽에 도전하라 경복궁에서 경림픽에 도전하라 경복궁에서 경림픽에 도전하라 경복궁에서 경림픽에 도전하라 경복궁에서 경림픽에 도전하라 경복궁에서 경림픽에 도전하라 경복궁에서 경림픽에 도전하라 경복궁에서 경림픽에 도전하라 경복궁에서 경림픽에 도전하라 경복궁에서 경림픽에 도전하라 ",
      user_idx: 1,
      date: "보류",
      price: 25000,
      photo: "/Modoorock/images/service_right.png",
      attraction: 1,
    },
    {
      idx: 2,
      title: "2021 경림픽에 도전하라!",
      content: "경복궁에서 경림픽에 도전하라",
      user_idx: 7,
      date: "보류",
      price: 20000,
      photo: "/Modoorock/images/service_right.png",
      attraction: 1,
    },
    {
      idx: 3,
      title: "2021 월림픽에 도전하라!",
      content: "월미도에서 월림픽에 도전하라",
      user_idx: 2,
      date: "보류",
      price: 25000,
      photo: "/Modoorock/images/service_right.png",
      attraction: 3,
    },
    {
      idx: 4,
      title: "해운대에서 해림픽에 도전하라",
      content: "짧은설명 여기에!",
      user_idx: 7,
      date: "보류",
      price: 1000,
      photo: "/Modoorock/images/service_right.png",
      attraction: 9,
    },
    {
      idx: 5,
      title: "[익산 교도소 세트장] 교도소를 체험하라 - 슬기로운 빵탈출",
      content: "교도소 세트장에서 탈출게임을 즐겨보세요",
      user_idx: 7,
      date: "보류",
      price: 11000,
      photo: "/Modoorock/images/service_right.png",
      attraction: 8,
    },
    {
      idx: 6,
      title:
        "English test English test English test English test English test English test",
      content:
        "English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test English test ",
      user_idx: 7,
      date: "보류",
      price: 1000,
      photo: "/Modoorock/images/service_right.png",
      attraction: 5,
    },
  ]);

  const [userIdx, setUserIdx] = useState(null);

  const [faqArticles, setFaqArticles] = useState(null);
  const [noticeArticles, setNoticeArticles] = useState(null);
  const [inquireArticles, setInquireArticles] = useState(null);

  const [reviewList, setReviewList] = useState([
    {
      idx: 0,
      user_idx: "보류",
      exp_idx: 1,
      stars: 3,
      comment:
        "너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다너무재밌습니다",
      date: "2021/06/10",
    },
    {
      idx: 1,
      user_idx: "보류",
      exp_idx: 1,
      stars: 4,
      comment: "너무재밌습니다",
      date: "2021/03/23",
    },
    {
      idx: 2,
      user_idx: "보류",
      exp_idx: 2,
      stars: 3,
      comment: "너무재밌습니다",
      date: "2021/04/13",
    },
    {
      idx: 3,
      user_idx: "보류",
      exp_idx: 5,
      stars: 5,
      comment: "너무재밌습니다",
      date: "2021/08/12",
    },
    {
      idx: 4,
      user_idx: "보류",
      exp_idx: 3,
      stars: 3,
      comment: "너무재밌습니다",
      date: "2021/07/17",
    },
    {
      idx: 5,
      user_idx: "보류",
      exp_idx: 1,
      stars: 4,
      comment: "너무재밌습니다",
      date: "2021/10/11",
    },
    {
      idx: 6,
      user_idx: "보류",
      exp_idx: 4,
      stars: 1,
      comment: "너무재밌습니다",
      date: "2021/10/13",
    },
    {
      idx: 7,
      user_idx: "보류",
      exp_idx: 2,
      stars: 2,
      comment: "너무재밌습니다",
      date: "2021/10/11",
    },
    {
      idx: 8,
      user_idx: "보류",
      exp_idx: 3,
      stars: 3,
      comment: "너무재밌습니다",
      date: "2021/10/13",
    },
    {
      idx: 9,
      user_idx: "보류",
      exp_idx: 1,
      stars: 4,
      comment: "너무재밌습니다",
      date: "2021/10/12",
    },
    {
      idx: 10,
      user_idx: "보류",
      exp_idx: 5,
      stars: 2,
      comment: "너무재밌습니다",
      date: "2021/10/13",
    },
    {
      idx: 11,
      user_idx: "보류",
      exp_idx: 4,
      stars: 5,
      comment: "너무재밌습니다",
      date: "2021/01/13",
    },
    {
      idx: 12,
      user_idx: "보류",
      exp_idx: 1,
      stars: 3,
      comment: "너무재밌습니다",
      date: "2021/10/01",
    },
    {
      idx: 13,
      user_idx: "보류",
      exp_idx: 4,
      stars: 5,
      comment: "너무재밌습니다",
      date: "2021/07/13",
    },
    {
      idx: 14,
      user_idx: "보류",
      exp_idx: 3,
      stars: 1,
      comment: "너무재밌습니다",
      date: "2021/09/13",
    },
    {
      idx: 15,
      user_idx: "보류",
      exp_idx: 2,
      stars: 4,
      comment: "너무재밌습니다",
      date: "2021/10/12",
    },
  ]);

  const [loggedin, setLoggedin] = useState(null);

  const sessionCheck = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (response.data !== "") {
          setLoggedin(true);
          setUserIdx(response.data.idx);
        } else {
          setLoggedin(false);
          setUserIdx(null);
        }
      })
      .catch((err) => console.error(err));
  };

  const userLogout = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/logout`)
      .then(() => {
        setLoggedin(false);
        window.alert("안전하게 로그아웃 되었습니다.");
        window.location.href = "/";
      })
      .catch((err) => console.error(err));
  };

  const getNoticeList = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/notice/getnoticelist`, {
        type: "전체",
      })
      .then((response) => {
        setNoticeArticles(response.data);
      })
      .catch((err) => console.error(err));
  };

  const getFaqList = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/faq/getfaqlist`, {
        type: "전체",
      })
      .then((response) => {
        setFaqArticles(response.data);
      })
      .catch((err) => console.error(err));
  };

  const getInquireList = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/qna/getqnalist`, {
        userIdx,
      })
      .then((response) => {
        setInquireArticles(response.data);
      })
      .catch((err) => console.error(err));
  };

  const getAttractionList = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/attraction/getattractionlist`, {
        area: "전체",
      })
      .then((response) => setAreaList(response.data))
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    sessionCheck();
    getNoticeList();
    getFaqList();
    getAttractionList();
  }, []);

  useEffect(() => {
    userIdx && getInquireList();
  }, [userIdx]);

  // 방법 찾을 때  까지 header+footer 모두에게 붙임 (admin 페이지에서는 안떠야하기 때문에)
  return (
    <section className={styles.app}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route exact path="/">
          <Header loggedin={loggedin} userLogout={userLogout} />
          <Mainpage
            programList={programList}
            viewItems={introVideos}
            reviewList={reviewList}
          />
          <Footer />
        </Route>
        <Route exact path="/login">
          <Header loggedin={loggedin} userLogout={userLogout} />
          <LoginPage />
          <Footer />
        </Route>
        <Route exact path="/signup">
          <Header loggedin={loggedin} userLogout={userLogout} />
          <Signup />
          <Footer />
        </Route>
        <Route exact path="/find">
          <Header loggedin={loggedin} userLogout={userLogout} />
          <Find />
          <Footer />
        </Route>
        <Route exact path="/find/id/:phone">
          <Header loggedin={loggedin} userLogout={userLogout} />
          <FindIdResult />
          <Footer />
        </Route>
        <Route exact path="/introduce/:path">
          <Header loggedin={loggedin} userLogout={userLogout} />
          <Introduce viewItems={introVideos} />
          <Footer />
        </Route>
        <Route exact path="/programs/view/:path">
          <Header loggedin={loggedin} userLogout={userLogout} />
          <ProgramDetail programList={programList} reviewList={reviewList} />
          <Footer />
        </Route>
        <Route exact path="/programs/:path">
          <Header loggedin={loggedin} userLogout={userLogout} />
          {programList && areaList && reviewList && (
            <Programs
              areaList={areaList}
              programList={programList}
              reviewList={reviewList}
            />
          )}
          <Footer />
        </Route>
        <Route exact path="/programs/attraction/:path">
          <Header loggedin={loggedin} userLogout={userLogout} />
          <Attraction
            programList={programList}
            areaList={areaList}
            reviewList={reviewList}
          />
          <Footer />
        </Route>
        <Route exact path="/customer/:path">
          <Header loggedin={loggedin} userLogout={userLogout} />
          {noticeArticles && faqArticles && (inquireArticles || !loggedin) ? (
            <CustomerCenter
              loggedin={loggedin}
              noticeArticles={noticeArticles}
              faqArticles={faqArticles}
              inquireArticles={inquireArticles}
              getNoticeList={getNoticeList}
              getFaqList={getFaqList}
              getInquireList={getInquireList}
            />
          ) : (
            <LoadingPage />
          )}
          <Footer />
        </Route>
        <Route exact path="/customer/:path/write">
          <Header loggedin={loggedin} userLogout={userLogout} />
          <WriteMain loggedin={loggedin} />
          <Footer />
        </Route>
        <Route exact path="/customer/notice/view/:path">
          <Header loggedin={loggedin} userLogout={userLogout} />
          <NoticeView />
          <Footer />
        </Route>
        <Route exact path="/customer/:path/search/:type/:query">
          <Header loggedin={loggedin} userLogout={userLogout} />
          <SearchResultPage
            noticeArticles={noticeArticles}
            faqArticles={faqArticles}
            inquireArticles={inquireArticles}
          />
          <Footer />
        </Route>
        <Route exact path="/contact">
          <Header loggedin={loggedin} userLogout={userLogout} />
          <Contact />
          <Footer />
        </Route>
        <Route exact path="/mypage/:path">
          <Header loggedin={loggedin} userLogout={userLogout} />
          <Mypage loggedin={loggedin} />
          <Footer />
        </Route>
        <Route exact path="/admin/:path">
          <AdminMain userLogout={userLogout} />
        </Route>
        <Route exact path="/admin/:path/:path_two">
          <AdminMain userLogout={userLogout} />
        </Route>
        <Route exact path="/admin/:path/:path_two/:path_three">
          <AdminMain userLogout={userLogout} />
        </Route>
        <Route exact path="/admin/:path/:path_two/:path_three/:path_four">
          <AdminMain userLogout={userLogout} />
        </Route>
      </BrowserRouter>
    </section>
  );
};

export default App;
