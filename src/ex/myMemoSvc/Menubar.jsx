import React, { useState } from "react";
import Home from './Home.jsx'
import SignUp from './member/SignUp.jsx'
import SignIn from './member/SignIn.jsx'
import Modify from './member/Modify.jsx'
import Memo from './memo/Memo.jsx'
import MemoList from './memo/MemoList.jsx'

import { getLoginedSessionID, setLoginedSessionID } from './session.js';

const Menubar = () => {

    // hook

    const [isLogined, setIsLogined] = useState(false);

    const [isHome, setIsHome] = useState(true);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
    const [isModify, setIsModify] = useState(false);
    const [isMemo, setIsMemo] = useState(false);
    const [isMemoList, setIsMemoList] = useState(false);

    // handler

    const homeClickHandler = () => {
        console.log('[Wrap] homeClickHandler()');

        setIsHome(true);
        setIsSignUp(false);
        setIsSignIn(false);
        setIsModify(false);
        setIsMemo(false);
        setIsMemoList(false);

    }

    const signUpClickHandler = () => {
        console.log('[Wrap] signUpClickHandler()');

        setIsHome(false);
        setIsSignUp(true);
        setIsSignIn(false);
        setIsModify(false);
        setIsMemo(false);
        setIsMemoList(false);

    }

    const signInClickHandler = () => {
        console.log('[Wrap] signInClickHandler()');

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(true);
        setIsModify(false);
        setIsMemo(false);
        setIsMemoList(false);

    }

    const signOutClickHandler = () => {
        console.log('[Wrap] signOutClickHandler()');

        setLoginedSessionID();

        setIsHome(true);
        setIsSignUp(false);
        setIsSignIn(false);
        setIsModify(false);
        setIsMemo(false);
        setIsMemoList(false);

        setIsLogined(false);

    }

    const modifyClickHandler = () => {
        console.log('[Wrap] modifyClickHandler()');

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(false);
        setIsModify(true);
        setIsMemo(false);
        setIsMemoList(false);

    }

    const memoClickHandler = () => {
        console.log('[Wrap] memoClickHandler()');

        if (getLoginedSessionID() === '') {
            alert('Please SIGN IN!!')

            setIsHome(false);
            setIsSignUp(false);
            setIsSignIn(true);
            setIsModify(false);
            setIsMemo(false);
            setIsMemoList(false);

            return;

        }

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(false);
        setIsModify(false);
        setIsMemo(true);
        setIsMemoList(false);

    }

    const memoListClickHandler = () => {
        console.log('[Wrap] memoListClickHandler()');

        if (getLoginedSessionID() === '') {
            alert('Please SIGN IN!!')

            setIsHome(false);
            setIsSignUp(false);
            setIsSignIn(true);
            setIsModify(false);
            setIsMemo(false);
            setIsMemoList(false);

            return;

        }

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(false);
        setIsModify(false);
        setIsMemo(false);
        setIsMemoList(true);

    }

    // function

    const changeMenuBar = (loginStatus) => {
        console.log('[Menubar] changeMenuBar');

        setIsLogined(loginStatus);

    }


    return (
        <div id="menubar">
            <div className="menus">
                <a href="#none" onClick={homeClickHandler}>home</a>
                &nbsp;&nbsp; | &nbsp;&nbsp;
                {
                    isLogined
                        ?
                        <>
                            <a href="#none" onClick={signOutClickHandler}>sign_out</a>
                            &nbsp;&nbsp; | &nbsp;&nbsp;
                            <a href="#none" onClick={modifyClickHandler}>modify</a>
                            &nbsp;&nbsp; | &nbsp;&nbsp;
                        </>
                        :
                        <>
                            <a href="#none" onClick={signUpClickHandler}>sign_up</a>
                            &nbsp;&nbsp; | &nbsp;&nbsp;
                            <a href="#none" onClick={signInClickHandler}>sign_in</a>
                            &nbsp;&nbsp; | &nbsp;&nbsp;
                        </>
                }
                <a href="#none" onClick={memoClickHandler}>memo</a>
                &nbsp;&nbsp; | &nbsp;&nbsp;
                <a href="#none" onClick={memoListClickHandler}>memo_list</a>
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
                        memoViewer={setIsMemo}
                        memoListViewer={setIsMemoList} />
                    :
                    null
            }
            {
                isSignIn
                    ?
                    <SignIn
                        changeMenuBar={changeMenuBar}
                        homeViewer={setIsHome}
                        signUpViewer={setIsSignUp}
                        signInViewer={setIsSignIn}
                        memoViewer={setIsMemo}
                        memoListViewer={setIsMemoList}
                    />
                    :
                    null
            }
            {
                isModify
                    ?
                    <Modify
                        changeMenuBar={changeMenuBar}
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
                        changeMenuBar={changeMenuBar}
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
                    <MemoList />
                    :
                    null
            }

        </div>
    );
}

export default Menubar;