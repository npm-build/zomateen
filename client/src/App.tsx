import React from "react";
import Header from "./components/Header";
import Navbar from "./components/NavBar";
import AboutPage from "./pages/About.pages";
import Home from "./pages/Home.pages";
import { Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./styles/Home.styles.scss";

function App() {
  const location = useLocation();

  return (
    <div id="home-grid">
      <Navbar />
      <Header />
      <div id="content">
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={AboutPage} />
          </Switch>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
