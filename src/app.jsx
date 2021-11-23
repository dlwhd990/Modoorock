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
import FindIdResult from "./components/find/findId/findIdResult/findIdResult";
import AdminMain from "./components/adminPages/adminMain/adminMain";
import NoticeView from "./components/customerCenter/notice/noticeView/noticeView";
import ModoorockAdmin from "./components/adminPages/modoorockAdmin/modoorockAdmin";
import SearchResultPage from "./components/customerCenter/searchResultPage/searchResultPage";
import InquireSearchPage from "./components/customerCenter/inquire/inquireSearchPage/inquireSearchPage";
import { loadTossPayments } from "@tosspayments/sdk";
import PaySuccessPage from "./components/paySuccessPage/paySuccessPage";
import KakaoRedirect from "./components/loginPage/kakaoRedirect/kakaoRedirect";

axios.defaults.withCredentials = true;

const App = (props) => {
  const clientKey = process.env.REACT_APP_SECRET_KEY;
  async function toss(options) {
    const tossPayments = await loadTossPayments(clientKey);
    tossPayments.requestPayment("카드", options);
  }

  const [introVideos, setIntroVideos] = useState([]);

  const [areaList, setAreaList] = useState(null);

  const [programList, setProgramList] = useState(null);

  const [faqArticles, setFaqArticles] = useState(null);
  const [noticeArticles, setNoticeArticles] = useState(null);
  const [inquireArticles, setInquireArticles] = useState(null);

  const [user, setUser] = useState(null);

  const sessionCheck = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/session`)
      .then((response) => {
        if (response.data !== "") {
          setUser(response.data);
        } else {
          setUser(false);
        }
      })
      .catch((err) => console.error(err));
  };

  const userLogout = (check) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/logout`)
      .then(() => {
        setUser(false);
        !check && window.alert("안전하게 로그아웃 되었습니다.");
        window.location.href = "/modoorock";
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
        userIdx: user.idx,
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
      .then((response) => setAreaList(response.data.reverse()))
      .catch((err) => {
        console.error(err);
      });
  };

  const getProgramList = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/exp/getexpthemelist`, {
        theme: "전체",
      })
      .then((response) => setProgramList(response.data))
      .catch((err) => console.error(err));
  };

  const getIntroVideos = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/advertise/getadvertiselist`)
      .then((response) => setIntroVideos(response.data))
      .catch((err) => console.error(err));
  };

  const getReviewList = (expIdx, setState) => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/review/getreviewlist`, {
        expIdx,
      })
      .then((response) => setState(response.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    sessionCheck();
    getNoticeList();
    getFaqList();
    getAttractionList();
    getProgramList();
    getIntroVideos();
  }, []);

  useEffect(() => {
    user && getInquireList();
  }, [user]);

  return (
    <section className={styles.app}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route exact path="/">
          <Header user={user} userLogout={userLogout} />
          <Mainpage
            programList={programList}
            viewItems={introVideos}
            getReviewList={getReviewList}
          />
          <Footer />
        </Route>
        <Route exact path="/login">
          <Header user={user} userLogout={userLogout} />
          <LoginPage />
          <Footer />
        </Route>
        <Route exact path="/signup">
          <Header user={user} userLogout={userLogout} />
          <Signup />
          <Footer />
        </Route>
        <Route exact path="/find">
          <Header user={user} userLogout={userLogout} />
          <Find />
          <Footer />
        </Route>
        <Route exact path="/find/id/:phone">
          <Header user={user} userLogout={userLogout} />
          <FindIdResult />
          <Footer />
        </Route>
        <Route exact path="/introduce/:path">
          <Header user={user} userLogout={userLogout} />
          <Introduce viewItems={introVideos} />
          <Footer />
        </Route>
        <Route exact path="/programs/view/:path">
          <Header user={user} userLogout={userLogout} />
          <ProgramDetail getReviewList={getReviewList} toss={toss} />
          <Footer />
        </Route>
        <Route exact path="/programs/:path">
          <Header user={user} userLogout={userLogout} />
          {programList && areaList && (
            <Programs
              areaList={areaList}
              programList={programList}
              getReviewList={getReviewList}
            />
          )}
          <Footer />
        </Route>
        <Route exact path="/programs/attraction/:path">
          <Header user={user} userLogout={userLogout} />
          {areaList && (
            <Attraction areaList={areaList} getReviewList={getReviewList} />
          )}
          <Footer />
        </Route>
        <Route exact path="/customer/:path">
          <Header user={user} userLogout={userLogout} />
          {noticeArticles && faqArticles && (inquireArticles || !user) ? (
            <CustomerCenter
              user={user}
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
        <Route exact path="/customer/notice/search/:query">
          <Header user={user} userLogout={userLogout} />
          {noticeArticles && (
            <SearchResultPage
              noticeArticles={noticeArticles}
              getNoticeList={getNoticeList}
            />
          )}
          <Footer />
        </Route>
        <Route exact path="/customer/inquire/search/:query">
          <Header user={user} userLogout={userLogout} />
          {inquireArticles && (
            <InquireSearchPage
              inquireArticles={inquireArticles}
              getInquireList={getInquireList}
            />
          )}
          <Footer />
        </Route>
        <Route exact path="/customer/:path/write">
          <Header user={user} userLogout={userLogout} />
          <WriteMain user={user} />
          <Footer />
        </Route>
        <Route exact path="/customer/notice/view/:path">
          <Header user={user} userLogout={userLogout} />
          <NoticeView />
          <Footer />
        </Route>
        <Route exact path="/contact">
          <Header user={user} userLogout={userLogout} />
          <Contact />
          <Footer />
        </Route>
        <Route exact path="/mypage/:path">
          <Header user={user} userLogout={userLogout} />
          {user && (
            <Mypage
              user={user}
              sessionCheck={sessionCheck}
              userLogout={userLogout}
            />
          )}
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
        <Route
          exact
          path="/admin/:path/:path_two/:path_three/:path_four/:path_five"
        >
          <AdminMain userLogout={userLogout} />
        </Route>
        <Route exact path="/modoorockadmin">
          <ModoorockAdmin />
        </Route>
        <Route exact path="/modoorockadmin/:path">
          <ModoorockAdmin />
        </Route>
        <Route exact path="/success">
          <PaySuccessPage />
        </Route>
        <Route exact path="/kakaoredirect">
          <KakaoRedirect />
        </Route>
      </BrowserRouter>
    </section>
  );
};

export default App;
