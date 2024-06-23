import React, { useState } from "react";
import { setLoginedSessionID } from "./session";

const SignIn = (props) => {

    // hook

    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');

    // handler

    const signInBtnClickHandler = () => {
        console.log('[SignIn] signInBtnClickHandler()');

        let memDBInStorage = localStorage.getItem('memberDB');
        let memDBJsObj = JSON.parse(memDBInStorage);
        let memObj = memDBJsObj[uId];

        if (memObj !== undefined && memObj.uPw === uPw) {
            alert('SIGN IN SUCCESS!!');

            props.homeViewer(true);
            props.signUpViewer(false);
            props.signInViewer(false);
            props.modifyViewer(false);
            props.memoViewer(false);
            props.memoListViewer(false);
            props.menuChange(true);

            setLoginedSessionID(uId);


        } else {
            alert('SIGN IN FAIL!!');

            props.homeViewer(false);
            props.signUpViewer(false);
            props.signInViewer(true);
            props.modifyViewer(false);
            props.memoViewer(false);
            props.memoListViewer(false);

            setLoginedSessionID('');
            
        }




    }

    const uIdChangeHandler = (e) => {
        console.log('[SignUp] uIdChangeHandler');

        setUId(e.target.value);

    }

    const uPwChangeHandler = (e) => {
        console.log('[SignUp] uPwChangeHandler');

        setUPw(e.target.value);

    }

    return (
        <div className="sign_in">
            <input type="text" name="uId" value={uId} onChange={uIdChangeHandler} placeholder="Input User ID" />
            <br />
            <input type="password" name="uPw" value={uPw} onChange={uPwChangeHandler} placeholder="Input User PW" />
            <br />
            <input type="button" onClick={signInBtnClickHandler} value="SIGN IN" />
        </div>
    );
}

export default SignIn;