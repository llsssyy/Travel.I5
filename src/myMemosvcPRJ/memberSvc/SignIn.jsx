import React, { useState } from "react";
import { setLoginedSession } from "./session";

const SignIn = (props) => {

    // hook

    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');


    // handler

    const signInBtnClickHandler = () => {
        console.log('[SignIn] signInBtnClickHandler()')

        let memDBInStorage = localStorage.getItem('memberDB');
        let memDBJsObj = JSON.parse(memDBInStorage);
        let myMemObj = memDBJsObj[uId]

        if (myMemObj !== undefined && myMemObj.uPw === uPw) {

            alert('SIGN IN SUCCESS!!');

            setUId('');
            setUPw('');

            props.homeViewer(false);
            props.signUpViewer(false);
            props.signInViewer(false);
            props.memoViewer(true);
            props.memoListViewer(false);
            props.loginStatus(true);

            setLoginedSession(uId);

        } else {

            alert('SIGN IN FAIL!!');

            setUId('');
            setUPw('');

            setLoginedSession('');

        }
    }



    const uIdChangeHadler = (e) => {
        console.log('[SignIn] uIdChangeHadler()');

        setUId(e.target.value);

    }

    const uPwChangeHadler = (e) => {
        console.log('[SignIn] uPwChangeHadler()');

        setUPw(e.target.value);

    }


    return (
        <div className="sign_in">
            <input type="text" name="uId" value={uId} onChange={uIdChangeHadler} placeholder="Input User ID" />
            <br />
            <input type="password" value={uPw} name="uPw" onChange={uPwChangeHadler} placeholder="Input User PW" />
            <br />
            <button onClick={signInBtnClickHandler}>SIGN UP</button>
        </div>
    )

}

export default SignIn;