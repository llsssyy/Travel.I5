import React, { useState } from "react";
import { setLoginedSessionID } from "../diaryservice/session";

const SignIn = (props) => {

    // hook

    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');

    // handler

    const signInBtnClickHandler = () => {
        console.log('signInBtnClickHandler() CALLED!!');
    
        let memObjInStorage = localStorage.getItem('memberDB');
        let curMemDBObj = JSON.parse(memObjInStorage);
        let sltMemObj = curMemDBObj[uId];

        if (sltMemObj !== undefined && sltMemObj.uPw === uPw) {
            alert('SIGN IN SUCCESS!!');

            setLoginedSessionID(uId);

            props.homeViewer(false);
            props.signUpViewer(false);
            props.signInViewer(false);
            props.diaryViewer(true);
            props.diaryListViewer(false);

        } else {
            alert('SIGN IN FAILED!!');

            setUId('');
            setUPw('');

            setLoginedSessionID();

        }


    }
    
    
    
    const uIdChangeHandler = (e) => {
        console.log('uIdChangeHandler() CALLED!!');

        setUId(e.target.value);

    }

    const uPwChangeHandler = (e) => {
        console.log('uIdChangeHandler() CALLED!!');

        setUPw(e.target.value);
        
    }


    return (
        <>
        <input type="text" name="uId" value={uId} onChange={uIdChangeHandler} placeholder="Input User ID" />
        <br />
        <input type="password" name="uPw" value={uPw} onChange={uPwChangeHandler} placeholder="Input User PW" />
        <br />
        <input type="button" onClick={signInBtnClickHandler} value="SIGN IN" />
        </>
    );
}

export default SignIn;