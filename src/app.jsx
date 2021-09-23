import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styles from "./app.module.css";
import Header from "./components/header/header";
import Mainpage from "./components/mainpage/mainpage";

const App = (props) => {
  return (
    <section className={styles.app}>
      <BrowserRouter>
        <Header />
        <Route exact path="/">
          <Mainpage />
        </Route>
      </BrowserRouter>
    </section>
  );
};

export default App;
