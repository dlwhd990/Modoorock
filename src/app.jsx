import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styles from "./app.module.css";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import AboutUs from "./components/about/aboutUs/aboutUs";
import Mainpage from "./components/mainpage/mainpage";
import LoginPage from "./components/loginPage/loginPage";
import ServiceIntro from "./components/about/serviceIntro/serviceIntro";
import Slick from "./components/slick/slick";
import Signup from "./components/signup/signup";
import Programs from "./components/programs/programs";
import Contact from "./components/contact/contact";

const App = (props) => {
  return (
    <section className={styles.app}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <Route exact path="/">
          <Mainpage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/about">
          <AboutUs />
        </Route>
        <Route exact path="/service_intro">
          <ServiceIntro />
        </Route>
        <Route exact path="/programs">
          <Programs />
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
