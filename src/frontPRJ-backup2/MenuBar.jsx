import React, { useState } from "react";
import Home from "./home/Home";
import SignUp from "./user_management/SignUp";
import SignIn from "./user_management/SignIn";
import { setLoginSessionID } from "./user_management/session";
import Modify from "./user_management/Modify";
import "./css/header.css";

const MenuBar = () => {
  // hook
  const [isHome, setIsHome] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isModify, setIsModify] = useState(false);

  // handler 메뉴내용 조정
  const homeClickHandler = () => {
    console.log("homeClickHandler called");

    setIsHome(true);
    setIsSignUp(false);
    setIsSignIn(false);
    setIsModify(false);
  };

  const signUpClickHandler = () => {
    console.log("signUpClickHandler called");

    setIsHome(false);
    setIsSignUp(true);
    setIsSignIn(false);
  };

  const signInClickHandler = () => {
    console.log("signInClickHandler called");

    setIsHome(false);
    setIsSignUp(false);
    setIsSignIn(true);
  };

  const signOutClickHandler = () => {
    console.log("signOutClickHandler called");

    alert("로그아웃 되었습니다.");
    setLoginSessionID();

    setIsHome(true);
    setIsSignUp(false);
    setIsSignIn(false);
    setIsModify(false);

    setIsLogin(false);
  };

  const memModifyClickHandler = () => {
    console.log("memModifyClickHandler called");

    setIsHome(false);
    setIsSignUp(false);
    setIsSignIn(false);
    setIsModify(true);
  };
  // 로그인 상태에 따라 보여주는 메뉴
  const changeMenuBar = (loginStatus) => {
    console.log("changeMenuBar() CALLED!!");

    setIsLogin(loginStatus);
  };

  // 메뉴창 조정
  return (
    <>
      <div id="wrap_menu">
        <a href="#none" onClick={homeClickHandler}>
          Travel.I5
        </a>
        {isLogin ? (
          <>
            <button>
              <a href="#none" onClick={memModifyClickHandler}>
                정보 수정
              </a>
            </button>
            <button>
              <a href="#none" onClick={signOutClickHandler}>
                로그아웃
              </a>
            </button>
          </>
        ) : (
          <>
            <button>
              <a href="#none" onClick={signUpClickHandler}>
                회원가입
              </a>
            </button>
            <button>
              <a href="#none" onClick={signInClickHandler}>
                로그인
              </a>
            </button>
          </>
        )}
      </div>

      {/* 조건 */}
      {isHome ? <Home /> : null}

      {isSignUp ? (
        <SignUp
          homeViewer={setIsHome}
          signUpViewer={setIsSignUp}
          signInViewer={setIsSignIn}
        />
      ) : null}

      {isSignIn ? (
        <SignIn
          changeMenuBar={changeMenuBar}
          homeViewer={setIsHome}
          signUpViewer={setIsSignUp}
          signInViewer={setIsSignIn}
        />
      ) : null}

      {isModify ? (
        <Modify
          homeViewer={setIsHome}
          signUpViewer={setIsSignUp}
          signInViewer={setIsSignIn}
          modifyViewer={setIsModify}
          changeMenuBar={changeMenuBar}
        />
      ) : null}
    </>
  );
};

export default MenuBar;
