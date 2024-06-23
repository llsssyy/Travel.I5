import React, { useState } from "react";

import { setLoginedSessionID, getLoginedSessionID } from './session.js'

const SignIn = (props) => {

    // hook
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');

    // handler
    const signInBtnClickHandler = () => {
        console.log('signInBtnClickHandler() CALLED!!');
        
        let memDBInStorage = localStorage.getItem('memberDB');      // string
        let memDBJsObj = JSON.parse(memDBInStorage);                // JS Object(All Member)
        let memObj = memDBJsObj[uId];                               // JS Object(my)

        if (memObj !== undefined && memObj.uPw === uPw) {
            alert('SIGN IN SUCCESS!!');

            props.homeViewer(true);
            props.signUpViewer(false);
            props.signInViewer(false);
            props.reservationViewer(false);
            props.reservationListViewer(false);

            setLoginedSessionID(uId);

            props.changeMunuBar(true);

        } else {
            alert('SIGN IN FAIL!!');

            props.homeViewer(false);
            props.signUpViewer(false);
            props.signInViewer(true);
            props.reservationViewer(false);
            props.reservationListViewer(false);

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
        <>
            <div>
                <input type="text" name="uId" value={uId} onChange={uIdChangeHandler} placeholder="Input user id" />
                <br />
                <input type="password" name="uPw" value={uPw} onChange={uPwChangeHandler} placeholder="Input user pw" />
                <br />
                <input type="button" value="SIGN IN" onClick={signInBtnClickHandler}/>
            </div>
        </>
    );
}
export default SignIn;