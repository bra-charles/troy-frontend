import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { usePageStyle } from "../components/PageContext/PageStyleContext";
import "../styles/landing.css";

function LandingPage() {
  const { setPageStyle } = usePageStyle();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("auth-body");
    setPageStyle("auth-body");
    return () => {
      document.body.classList.remove("auth-body");
      setPageStyle("");
    };
  }, [setPageStyle]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };
  const handleGetStarted = () => {
    navigate("/chat");
  };
  return (
    <div className="LandingPage">
      <header className="App-header">
        <div className="App-logo">
          <img src={assets.robot_ai} className="logo" alt="logo" />
          <h1 className="App-title">Troy</h1>
        </div>

        <nav className="App-nav">
          <ul>
            <li>
              <a href="/">About Us</a>
            </li>
            <li>
              <a href="/">Contact Us</a>
            </li>
            <li>
              <button onClick={handleLogout}>Log out</button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="App-main">
        <p className="App-intro">
          Your virtual assistant for personalized support,
          <br /> <span> train retrain only for you.</span>
        </p>
        <button className="App-button" onClick={handleGetStarted}>
          Get Started
        </button>
        <div className="main-content">
          <img src={assets.robot_ai} className="background-logo" alt="logo" />
        </div>
      </main>
      {/* <footer className="App-footer">
        <p>Troy</p>
      </footer> */}
    </div>
  );
}

export default LandingPage;
