import React, { useState } from "react";
import Home from "./Home";
import SignUp from "./memberSvc/SignUp"
import SignIn from "./memberSvc/SignIn"
import Modify from "./memberSvc/Modify"
import Memo from "./memoSvc/Memo"
import MemoList from "./memoSvc/MemoList"
import { setLoginedSession } from "./memberSvc/session";

const Menubar = () => {

    // hook

    const [isHome, setIsHome] = useState(true);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
    const [isModify, setIsModify] = useState(false);
    const [isMemo, setIsMemo] = useState(false);
    const [isMemoList, setIsMemoList] = useState(false);
    const [isLogined, setIsLogined] = useState(false);

    // handler

    const homeMenuBtnClickHandler = () => {
        console.log('[Menubar] homeMenuBtnClickHandler()');

        setIsHome(true);
        setIsSignUp(false);
        setIsSignIn(false);
        setIsModify(false);
        setIsMemo(false);
        setIsMemoList(false);

    }

    const signUpMenuBtnClickHandler = () => {
        console.log('[Menubar] signUpMenuBtnClickHandler()');

        setIsHome(false);
        setIsSignUp(true);
        setIsSignIn(false);
        setIsModify(false);
        setIsMemo(false);
        setIsMemoList(false);

    }


    const signInMenuBtnClickHandler = () => {
        console.log('[Menubar] signInMenuBtnClickHandler()');

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(true);
        setIsModify(false);
        setIsMemo(false);
        setIsMemoList(false);

    }


    const signOutMenuBtnClickHandler = () => {
        console.log('[Menubar] signOutMenuBtnClickHandler()');

        setIsHome(true);
        setIsSignUp(false);
        setIsSignIn(false);
        setIsModify(false);
        setIsMemo(false);
        setIsMemoList(false);

        setLoginedSession('');
        setIsLogined(false);

    }


    const modifyMenuBtnClickHandler = () => {
        console.log('[Menubar] modifyMenuBtnClickHandler()');

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(false);
        setIsModify(true);
        setIsMemo(false);
        setIsMemoList(false);

    }


    const memoMenuBtnClickHandler = () => {
        console.log('[Menubar] memoMenuBtnClickHandler()');

        if (isLogined) {

            setIsHome(false);
            setIsSignUp(false);
            setIsSignIn(false);
            setIsModify(false);
            setIsMemo(true);
            setIsMemoList(false);

        } else {
            alert('Please Sign In!!');

            return;
        }
    }


    const memoListMenuBtnClickHandler = () => {
        console.log('[Menubar] memoListMenuBtnClickHandler()');

        if (isLogined) {

            setIsHome(false);
            setIsSignUp(false);
            setIsSignIn(false);
            setIsModify(false);
            setIsMemo(false);
            setIsMemoList(true);

        } else {
            alert('Please Sign In!!');

            return;
        }
    }


    // function


    return (
        <>
            <div className="menubar">
                <div className="menus">
                    {
                        isLogined
                            ?
                            <>
                                <a href="#none" onClick={homeMenuBtnClickHandler}>Home</a>
                                &nbsp;|&nbsp;&nbsp;
                                <a href="#none" onClick={signOutMenuBtnClickHandler}>Sign Out</a>
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                <a href="#none" onClick={modifyMenuBtnClickHandler}>Modify</a>
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                <a href="#none" onClick={memoMenuBtnClickHandler}>Memo</a>
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                <a href="#none" onClick={memoListMenuBtnClickHandler}>Memo List</a>
                            </>
                            :
                            <>
                                <a href="#none" onClick={homeMenuBtnClickHandler}>Home</a>
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                <a href="#none" onClick={signUpMenuBtnClickHandler}>Sign Up</a>
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                <a href="#none" onClick={signInMenuBtnClickHandler}>Sign In</a>
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                <a href="#none" onClick={memoMenuBtnClickHandler}>Memo</a>
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                <a href="#none" onClick={memoListMenuBtnClickHandler}>Memo List</a>
                            </>

                    }
                </div>
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
                        <SignUp
                            homeViewer={setIsHome}
                            signUpViewer={setIsSignUp}
                            signInViewer={setIsSignIn}
                            modifyViewer={setIsModify}
                            memoViewer={setIsMemo}
                            memoListViewer={setIsMemoList}
                        />
                        :
                        null
                }
                {
                    isSignIn
                        ?
                        <SignIn
                            homeViewer={setIsHome}
                            signUpViewer={setIsSignUp}
                            signInViewer={setIsSignIn}
                            modifyViewer={setIsModify}
                            memoViewer={setIsMemo}
                            memoListViewer={setIsMemoList}
                            loginStatus = {setIsLogined} />
                        :
                        null
                }
                {
                    isModify
                        ?
                        <Modify
                            homeViewer={setIsHome}
                            signUpViewer={setIsSignUp}
                            signInViewer={setIsSignIn}
                            modifyViewer={setIsModify}
                            memoViewer={setIsMemo}
                            memoListViewer={setIsMemoList} />
                        :
                        null
                }
                {
                    isMemo
                        ?
                        <Memo
                            homeViewer={setIsHome}
                            signUpViewer={setIsSignUp}
                            signInViewer={setIsSignIn}
                            modifyViewer={setIsModify}
                            memoViewer={setIsMemo}
                            memoListViewer={setIsMemoList} />
                        :
                        null
                }
                {
                    isMemoList
                        ?
                        <MemoList
                            homeViewer={setIsHome}
                            signUpViewer={setIsSignUp}
                            signInViewer={setIsSignIn}
                            modifyViewer={setIsModify}
                            memoViewer={setIsMemo}
                            memoListViewer={setIsMemoList} />
                        :
                        null
                }
            </div>
        </>
    )
}

export default Menubar;