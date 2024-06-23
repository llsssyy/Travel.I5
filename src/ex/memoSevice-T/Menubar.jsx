import React, { useState } from "react";
import Home from "./Home";
import Memo from "./memo/Memo";
import MemoList from "./memo/MemoList";
import SignUp from "./member/SignUp";
import SignIn from "./member/SignIn";

import { setLoginedSessionID, getLoginedSessionID } from './session.js';
import Modify from "./member/Modify.jsx";

const Menubar = () => {

    // hook
    const [isHome, setIsHome] = useState(true);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
    const [isModify, setModify] = useState(false);
    const [isMemo, setIsMemo] = useState(false);
    const [isMemoList, setIsMemoList] = useState(false);
    
    const [isLogined, setIsLogined] = useState(false);

    // handler
    const homeClickHandler = () => {
        console.log('homeClickHandler() CALLED!!');

        setIsHome(true);
        setIsSignUp(false);
        setIsSignIn(false);
        setModify(false);
        setIsMemo(false);
        setIsMemoList(false);

    }
    const signUpClickHandler = () => {
        console.log('signUpClickHandler() CALLED!!');

        setIsHome(false);
        setIsSignUp(true);
        setIsSignIn(false);
        setModify(false);
        setIsMemo(false);
        setIsMemoList(false);

    }
    const signInClickHandler = () => {
        console.log('signInClickHandler() CALLED!!');

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(true);
        setModify(false);
        setIsMemo(false);
        setIsMemoList(false);

    }
    const signOutClickHandler = () => {
        console.log('signOutClickHandler() CALLED!!');

        setLoginedSessionID();

        setIsHome(true);
        setIsSignUp(false);
        setIsSignIn(false);
        setModify(false);
        setIsMemo(false);
        setIsMemoList(false);

        setIsLogined(false);

    }
    const modifyClickHandler = () => {
        console.log('modifyClickHandler() CALLED!!');

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(false);
        setModify(true);
        setIsMemo(false);
        setIsMemoList(false);

    }
    const memoClickHandler = () => {
        console.log('memoClickHandler() CALLED!!');

        if (getLoginedSessionID() === '') {
            alert('Please SIGN IN!!');

            setIsHome(false);
            setIsSignUp(false);
            setIsSignIn(true);
            setModify(false);
            setIsMemo(false);
            setIsMemoList(false);

            return;

        } 

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(false);
        setModify(false);
        setIsMemo(true);
        setIsMemoList(false);

    }
    const memoListClickHandler = () => {
        console.log('memoListClickHandler() CALLED!!');

        if (getLoginedSessionID() === '') {
            alert('Please SIGN IN!!');

            setIsHome(false);
            setIsSignUp(false);
            setIsSignIn(true);
            setModify(false);
            setIsMemo(false);
            setIsMemoList(false);
            
            return;
            
        } 

        setIsHome(false);
        setIsSignUp(false);
        setIsSignIn(false);
        setModify(false);
        setIsMemo(false);
        setIsMemoList(true);

    }

    // fucntion 
    const changeMunuBar = (loginStatus) => {
        console.log('changeMunuBar() CALLED!!');

        setIsLogined(loginStatus);

    }

    return(
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
                    changeMunuBar={changeMunuBar} 
                    homeViewer={setIsHome} 
                    signUpViewer={setIsSignUp} 
                    signInViewer={setIsSignIn}  
                    memoViewer={setIsMemo}  
                    memoListViewer={setIsMemoList} />
                :
                null
            }
            {
                isModify
                ?
                <Modify 
                    changeMunuBar={changeMunuBar} 
                    homeViewer={setIsHome} 
                    signUpViewer={setIsSignUp} 
                    signInViewer={setIsSignIn}  
                    modifyViewer={setModify}
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