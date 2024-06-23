import React, { useState } from "react";

import { getMyMemObj } from '../const/const.js';
import { setLoginedSessionID } from '../session.js';

const SignIn = (props) => {

    // hook
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');

    // handler
    const uIdChangeHandler = (e) => {
        console.log('[SignIn] uIdChangeHandler()');
        setUId(e.target.value);

    }
    const uPwChangeHandler = (e) => {
        console.log('[SignIn] uPwChangeHandler()');
        setUPw(e.target.value);
        
    }
    const signInBtnClickHandler = () => {
        console.log('[SignIn] signInBtnClickHandler()');

        let memObj = getMyMemObj(uId);

        if (memObj !== undefined && memObj.uPw === uPw) {
            alert('SIGN IN SUCCESS!!');
            
            props.homeViewer(true); 
            props.signUpViewer(false); 
            props.signInViewer(false); 
            props.memoViewer(false); 
            props.memoListViewer(false); 

            setLoginedSessionID(uId);

            props.changeMenuBar(true);


        } else {
            alert('SIGN IN FAIL!!');

            props.homeViewer(false); 
            props.signUpViewer(false); 
            props.signInViewer(true); 
            props.memoViewer(false); 
            props.memoListViewer(false); 

            setUId('');
            setUPw('');

            setLoginedSessionID();

        }

    }

    return(
        <div id="sign_in">
            <input type="text" 
                className="txt_field" 
                onChange={uIdChangeHandler} 
                placeholder="Input user ID" />
                <br />
            <input type="password" 
                className="txt_field" 
                onChange={uPwChangeHandler} 
                placeholder="Input user PW" />
                <br />
            <input type="button" 
                value = "SIGN IN" 
                className="basic_btn" 
                onClick={signInBtnClickHandler} />
        </div>
    )
}

export default SignIn;