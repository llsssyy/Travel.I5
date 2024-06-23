import React, { useState } from "react";
import Home from './Home'
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Diary from "./Diary";
import DiaryList from "./DiaryList";

const Menubar = () => {

    // hook

    const [isHome, setIsHome] = useState(true);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
    const [isDiary, setIsDiary] = useState(false);
    const [isDiaryList, setIsDiaryList] = useState(false);



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

    }

    const diaryMenuClickHandler = () => {
        console.log('diaryMenuClickHandler() CALLED!!');

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(false);
        setIsDiary(true);
        setIsDiaryList(false);

    }

    const diaryListMenuClickHandler = () => {
        console.log('diaryListMenuClickHandler() CALLED!!');

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(false);
        setIsDiary(false);
        setIsDiaryList(true);

    }



    return (
        <>
            <div className="menuWrap">
                <a href="#none" onClick={homeMenuBtnClickHandler}>HOME</a>
                &nbsp;&nbsp;&nbsp;
                <a href="#none" onClick={signUpMenuBtnClickHandler}>SIGN-UP</a>
                &nbsp;&nbsp;&nbsp;
                <a href="#none" onClick={signInMenuBtnClickHandler}>SIGN-IN</a>
                &nbsp;&nbsp;&nbsp;
                <a href="#none" onClick={signOutMenuBtnClickHandler}>SIGN-OUT</a>
                &nbsp;&nbsp;&nbsp;
                <a href="#none" onClick={diaryMenuClickHandler}>DAIRY</a>
                &nbsp;&nbsp;&nbsp;
                <a href="#none" onClick={diaryListMenuClickHandler}>DAIRY-LIST</a>
                &nbsp;&nbsp;&nbsp;
            </div>
            {
                isHome
                    ?
                    <>
                        <Home />
                    </>
                    :
                    null
            }
            {
                isSignUp
                    ?
                    <>
                        <SignUp />
                    </>
                    :
                    null
            }
            {
                isSignIn
                    ?
                    <>
                        <SignIn
                            homeViewer={setIsHome}
                            signUpViewer={setIsSignUp}
                            signInViewer={setIsSignIn}
                            diaryViewer={setIsDiary}
                            diaryListViewer={setIsDiaryList}
                        />
                    </>
                    :
                    null
            }
            {
                isDiary
                    ?
                    <>
                        <Diary 
                         homeViewer={setIsHome}
                         signUpViewer={setIsSignUp}
                         signInViewer={setIsSignIn}
                         diaryViewer={setIsDiary}
                         diaryListViewer={setIsDiaryList}
                        />
                    </>
                    :
                    null
            }
            {
                isDiaryList
                    ?
                    <>
                        <DiaryList />
                    </>
                    :
                    null
            }
        </>
    );
}

export default Menubar;