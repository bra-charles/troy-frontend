import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Forms from "../components/Forms/form.js";
import SignUpForm from "../components/Forms/SignUpForm";
import SignInForm from "../components/Forms/SignInForm";
import api from "../api.js";
import { usePageStyle } from "../components/PageContext/PageStyleContext.jsx";

function FormsComponent() {
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

  const [signIn, toggle] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/signup/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      console.log("User signed up successfully:", response.data);
      setFormData({ username: "", email: "", password: "" });
      toggle(true);
    } catch (error) {
      console.error("Error signing up:", error.response?.data);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/signin/", {
        username: formData.username,
        password: formData.password,
      });
      const { access, refresh } = response.data;
      console.log("Access Token:", access);
      console.log("Refresh Token:", refresh);

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      
      console.log("Navigating to /home");
      navigate("/home");
    } catch (error) {
      console.error("Error signing in:", error.response?.data);
    }
  };

  return (
    <Forms.Container>
      <Forms.SignUpContainer signinIn={signIn}>
        <SignUpForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSignUp}
        />
      </Forms.SignUpContainer>

      <Forms.SignInContainer signinIn={signIn}>
        <SignInForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSignIn}
        />
      </Forms.SignInContainer>

      <Forms.OverlayContainer signinIn={signIn}>
        <Forms.Overlay signinIn={signIn}>
          <Forms.LeftOverlayPanel signinIn={signIn}>
            <Forms.Title>Welcome Back!</Forms.Title>
            <Forms.Paragraph>
              To keep connected with us please login with your personal info
            </Forms.Paragraph>
            <Forms.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Forms.GhostButton>
          </Forms.LeftOverlayPanel>

          <Forms.RightOverlayPanel signinIn={signIn}>
            <Forms.Title>Hello, Friend!</Forms.Title>
            <Forms.Paragraph>
              Enter Your personal details and start journey with us
            </Forms.Paragraph>
            <Forms.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Forms.GhostButton>
          </Forms.RightOverlayPanel>
        </Forms.Overlay>
      </Forms.OverlayContainer>
    </Forms.Container>
  );
}

export default FormsComponent;
