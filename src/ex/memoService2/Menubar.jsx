import React, { useState } from "react";
import Home from "./Home";
import SignUp from "./membersvc/SignUp";
import SignIn from "./membersvc/SignIn";
import Modify from "./membersvc/Modify";
import Memo from "./memosvc/Memo";
import MemoList from "./memosvc/MemoList";

const Menubar = () => {

    // hook

    const [isHome, setIsHome] = useState(true);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
    const [isModify, setIsModify] = useState(false);
    const [isMemo, setIsMemo] = useState(false);
    const [isMemoList, setIsMemoList] = useState(false);
    const [menuChange, setMenuChange] = useState(false);


    // handler

    const homeMenuClickHandler = () => {
        console.log('[Menubar] homeMenuClickHandler');

        setIsHome(true);
        setIsSignUp(false);
        setIsSignIn(false);
        setIsModify(false);
        setIsMemo(false);
        setIsMemoList(false);

    }

    const signUpMenuClickHandler = () => {
        console.log('[Menubar] signUpMenuClickHandler');

        setIsHome(false);
        setIsSignUp(true);
        setIsSignIn(false);
        setIsModify(false);
        setIsMemo(false);
        setIsMemoList(false);

    }

    const signInMenuClickHandler = () => {
        console.log('[Menubar] signInMenuClickHandler');

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(true);
        setIsModify(false);
        setIsMemo(false);
        setIsMemoList(false);

        
    }

    const signOutMenuClickHandler = () => {
        console.log('[Menubar] signOutMenuClickHandler');

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(true);
        setIsModify(false);
        setIsMemo(false);
        setIsMemoList(false);

        setMenuChange(false);

    }

    const modifyMenuClickHandler = () => {
        console.log('[Menubar] modifyMenuClickHandler');

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(false);
        setIsModify(true);
        setIsMemo(false);
        setIsMemoList(false);

    }

    const memoMenuClickHandler = () => {
        console.log('[Menubar] memoMenuClickHandler');

        if (menuChange == true) {
            
            setIsHome(false);
            setIsSignUp(false);
            setIsSignIn(false);
            setIsModify(false);
            setIsMemo(true);
            setIsMemoList(false);
        } else {
            alert('PLEASE SIGN IN!!');

            setIsHome(false);
            setIsSignUp(false);
            setIsSignIn(true);
            setIsModify(false);
            setIsMemo(false);
            setIsMemoList(false);
        }

    }

    const memoListMenuClickHandler = () => {
        console.log('[Menubar] memoListMenuClickHandler');

        if (menuChange == true) {
            
            setIsHome(false);
            setIsSignUp(false);
            setIsSignIn(false);
            setIsModify(false);
            setIsMemo(false);
            setIsMemoList(true);
        } else {
            alert('PLEASE SIGN IN!!');

            setIsHome(false);
            setIsSignUp(false);
            setIsSignIn(true);
            setIsModify(false);
            setIsMemo(false);
            setIsMemoList(false);
        }

    }

    return (
        <div className="menu_bar">
            <div className="menus">
                {
                    menuChange
                        ?
                        <>
                            <a href="#none" onClick={homeMenuClickHandler}>HOME</a>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <a href="#none" onClick={signOutMenuClickHandler}>SIGN OUT</a>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <a href="#none" onClick={modifyMenuClickHandler}>MODIFY</a>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <a href="#none" onClick={memoMenuClickHandler}>MEMO</a>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <a href="#none" onClick={memoListMenuClickHandler}>MEMO LIST</a>
                        </>
                        :
                        <>
                            <a href="#none" onClick={homeMenuClickHandler}>HOME</a>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <a href="#none" onClick={signUpMenuClickHandler}>SIGN UP</a>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <a href="#none" onClick={signInMenuClickHandler}>SIGN IN</a>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <a href="#none" onClick={memoMenuClickHandler}>MEMO</a>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <a href="#none" onClick={memoListMenuClickHandler}>MEMO LIST</a>
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
                        memoListViewer={setIsMemoList} />
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
                        menuChange={setMenuChange} />
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

    );
}

export default Menubar;