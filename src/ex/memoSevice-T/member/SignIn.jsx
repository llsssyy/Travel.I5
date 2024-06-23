import React, { useState } from "react";

import { getMyMemObj } from '../const/const.js';
import { setLoginedSessionID, 
         getLoginedSessionID } from '../session.js'

const SignIn = (props) => {

    // hook
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');

    // handler
    const signInBtnClickHandler = () => {
        console.log('signInBtnClickHandler() CALLED!!');
        
        let memObj = getMyMemObj(uId);

        if (memObj !== undefined && memObj.uPw === uPw) {
            alert('SIGN IN SUCCESS!!');

            props.homeViewer(true);
            props.signUpViewer(false);
            props.signInViewer(false);
            props.memoViewer(false);
            props.memoListViewer(false);

            setLoginedSessionID(uId);

            props.changeMunuBar(true);

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
    
    const uIdChangeHandler = (e) => {
        console.log('uIdChangeHandler() CALLED!!');
        setUId(e.target.value);
    }

    const uPwChangeHandler = (e) => {
        console.log('uPwChangeHandler() CALLED!!');
        setUPw(e.target.value);
    }

    return(
        <div id="sign_in">
            <input type="text" className="txt_field" name="uId" value={uId} onChange={uIdChangeHandler} placeholder="Input user id" />
            <br />
            <input type="password" className="txt_field" name="uPw" value={uPw} onChange={uPwChangeHandler} placeholder="Input user pw" />
            <br />
            <input type="button" value="SIGN IN" className="basic_btn" onClick={signInBtnClickHandler}/>
        </div>
    );
}
export default SignIn;