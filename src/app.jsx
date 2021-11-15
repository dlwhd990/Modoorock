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

  const userLogout = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/user/logout`)
      .then(() => {
        setUser(false);
        window.alert("안전하게 로그아웃 되었습니다.");
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

  // 방법 찾을 때  까지 header+footer 모두에게 붙임 (admin 페이지에서는 안떠야하기 때문에)
  return (
    <section className={styles.app}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Route exact path="/">
          <Header user={user} userLogout={userLogout} />
          <Mainpage
            programList={programList}
            viewItems={introVideos}
            reviewList={reviewList}
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
          <ProgramDetail
            programList={programList}
            getReviewList={getReviewList}
            toss={toss}
          />
          <Footer />
        </Route>
        <Route exact path="/programs/:path">
          <Header user={user} userLogout={userLogout} />
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
          <Header user={user} userLogout={userLogout} />
          {programList && areaList && reviewList && (
            <Attraction
              programList={programList}
              areaList={areaList}
              getReviewList={getReviewList}
            />
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
          {user && <Mypage user={user} sessionCheck={sessionCheck} />}
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
      </BrowserRouter>
    </section>
  );
};

export default App;
