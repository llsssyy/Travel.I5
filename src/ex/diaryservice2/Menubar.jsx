import React, { useState } from "react";
import Home from "./Home";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Diary from "./Diary";
import DiaryList from "./DiaryList";

const MenuBar = () => {

    // hook

    const [isHome, setIsHome] = useState(true);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
    const [isDiary, setIsDiary] = useState(false);
    const [isDiaryList, setIsDiaryList] = useState(false);
    const [isLogined, setIsLogined] = useState(false);


    // handler

    const homeMenuBtnClickHandler = () => {
        console.log('homeMenuBtnClickHandler() CALLED!!');

        setIsHome(true);
        setIsSignUp(false);
        setIsSignIn(false);
        setIsDiary(false);
        setIsDiaryList(false);

    }

    const signUpMenuBtnClickHandler = () => {
        console.log('signUpMenuBtnClickHandler() CALLED!!');

        setIsHome(false);
        setIsSignUp(true);
        setIsSignIn(false);
        setIsDiary(false);
        setIsDiaryList(false);

    }

    const signInMenuBtnClickHandler = () => {
        console.log('signInMenuBtnClickHandler() CALLED!!');

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(true);
        setIsDiary(false);
        setIsDiaryList(false);

    }

    const signOutMenuBtnClickHandler = () => {
        console.log('signOutMenuBtnClickHandler() CALLED!!');

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(true);
        setIsDiary(false);
        setIsDiaryList(false);
        setIsLogined(false);

    }

    const diaryMenuBtnClickHandler = () => {
        console.log('diaryMenuBtnClickHandler() CALLED!!');

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(false);
        setIsDiary(true);
        setIsDiaryList(false);

    }

    const diaryListMenuBtnClickHandler = () => {
        console.log('diaryListMenuBtnClickHandler() CALLED!!');

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(false);
        setIsDiary(false);
        setIsDiaryList(true);

    }


    return (
        <>
            <a href="#none" onClick={homeMenuBtnClickHandler}>HOME</a>
            &nbsp; | &nbsp;
            {
                isLogined
                    ?
                    <>
                        <a href="#none" onClick={signOutMenuBtnClickHandler}>SIGN-OUT</a>
                        &nbsp; | &nbsp;
                    </>
                    :
                    <>
                        <a href="#none" onClick={signUpMenuBtnClickHandler}>SIGN-UP</a>
                        &nbsp; | &nbsp;
                        <a href="#none" onClick={signInMenuBtnClickHandler}>SIGN-IN</a>
                        &nbsp; | &nbsp;
                    </>
            }
            <a href="#none" onClick={diaryMenuBtnClickHandler}>DIARY</a>
            &nbsp; | &nbsp;
            <a href="#none" onClick={diaryListMenuBtnClickHandler}>DIARY-LIST</a>
            <br />
            {
                isHome
                ?
                <Home />
                :
                null
            }
            {
                isSignUp
                ?
                <SignUp />
                :
                null
            }
             {
                isSignIn
                ?
                <SignIn 
                setIsHome={setIsHome}
                setIsSignUp={setIsSignUp}
                setIsSignIn={setIsSignIn}
                setIsDiary={setIsDiary}
                setIsDiaryList={setIsDiaryList}
                />
                :
                null
            }
             {
                isDiary
                ?
                <Diary />
                :
                null
            }
              {
                isDiaryList
                ?
                <DiaryList />
                :
                null
            }
        </>
    );
}

export default MenuBar;