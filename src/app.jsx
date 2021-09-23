import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styles from "./app.module.css";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import AboutUs from "./components/aboutUs/aboutUs";

const App = (props) => {
  return (
    <section className={styles.app}>
      <BrowserRouter>
        <Header />
        <Route exact path="/about">
          <AboutUs />
        </Route>
        <Footer />
      </BrowserRouter>
    </section>
  );
};

export default App;
