import React, { MutableRefObject, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthClient } from "../../api/authClient";
import { Spinner } from "../Spinner/Spinner";
import './styles.css'
import { ToastContainer, toast } from "react-toastify";
import { toastHelper } from "../../utils/toastHelper";
import { useTheme } from "../../hooks";

export const AuthPage = ({ type }: { type: "login" | "sign up" }) => {
  const [spinner, setSpinner] = useState(false);
  const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;
  const navigate = useNavigate();
  const currentAuthTitle = type === "login" ? "Log in" : "Sign up";

  const handleAuthResponse = (
    result: boolean | undefined,
    navigatePath: string,
  ) => {
    if(!result){
      setSpinner(false);
      return;
    }

    setSpinner(false);
    navigate(navigatePath);
  }

  const handleLogin = async (username: string, password: string) => {
    if (!username || !password) {
      setSpinner(false);
      toastHelper('error', 'Fill in all the fields')
      return;
    }
    setSpinner(true);
    const result = await AuthClient.login(username, password);
    if (!result) {
      setSpinner(false);
      toastHelper('error', "Opp something wrong!!!")
      return;
    }
    handleAuthResponse(result, '/costs' )
    toastHelper('success', "Access granted")
  };

  const handleRegistration = async (username: string, password: string) => {
    if (!username || !password) {
      setSpinner(false);
      toastHelper('error', "Fill in all the fields")
      return;
    }

    if (password.length < 4) {
      setSpinner(false);
      toastHelper('error', "Password must be more when 4")
      return;
    }
    const result = await AuthClient.registration(username, password);

    if (!result) {
      setSpinner(false);
      toastHelper('error', "Opp something wrong!!!")
      return;
    }
    handleAuthResponse(result, "/login",)
    toastHelper('success', "User has been registered")
  };

  const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
    setSpinner(true);
    event.preventDefault();
    switch (type) {
      case "login":
        handleLogin(usernameRef.current.value, passwordRef.current.value)
        break;
    
      case "sign up" :
        handleRegistration(usernameRef.current.value, passwordRef.current.value)
      break;
      default:
        break;
    }
  }
  return (
    <div className="container">
      <h1>{currentAuthTitle}</h1>
      <form onSubmit={handleAuth} className="form-group">
        <label className="auth-label">
          Enter username:
          <input ref={usernameRef} type="text" className="form-control" />
        </label>
        <label className="auth-label">
          Enter password:
          <input ref={passwordRef} type="password" className="form-control" />
        </label>
        <button className="btn btn-primary auth-btn">
          {spinner ? <Spinner top={5} left={20} /> : currentAuthTitle}
        </button>
        {type === "login" ? (
          <div>
            <span className="question_text">Don't have an account yet?</span>
            <Link to={"/registration"}>Sign up</Link>
          </div>
        ) : (
          <div>
            <span className="question_text">Already have an account?</span>
            <Link to={"/login"}>Log in</Link>
          </div>
        )}
      </form>
      <ToastContainer/>
    </div>
    
  );
};
