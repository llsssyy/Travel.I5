import React, { useState } from "react";

import { MEMBER_DB_IN_LOCAL_STORAGE,
         MEMO_DB_IN_LOCAL_STORAGE,
         getMemoSvcMemberDB, 
         getMemoSvcMemoDB } from '../const/const.js';
import { getDateTime } from '../utils.js';

const SignUp = (props) => {

    // hook
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uMail, setUMail] = useState('');
    const [uPhone, setUPhone] = useState('');

    // handler
    const signUpBtnClickHandler = () => {
        console.log('signUpBtnClickHandler() CALLED!!');
        
        let memDBInStorage = getMemoSvcMemberDB();
        if (memDBInStorage === null) {
            let newMemObj = {
                [uId]: {
                'uPw': uPw,
                'uMail': uMail,
                'uPhone': uPhone,
                'uRegDate' : getDateTime(),
                'uModDate' : getDateTime(),
            }}
            let newMemStr = JSON.stringify(newMemObj);
            localStorage.setItem(MEMBER_DB_IN_LOCAL_STORAGE, newMemStr);

        } else {

            let memDBJsObj = JSON.parse(memDBInStorage);                        // js Object
            memDBJsObj[uId] = {
                'uPw': uPw,
                'uMail': uMail,
                'uPhone': uPhone,
                'uRegDate' : getDateTime(),
                'uModDate' : getDateTime(),
            };

            let newMemStr = JSON.stringify(memDBJsObj);                         // stirng
            localStorage.setItem(MEMBER_DB_IN_LOCAL_STORAGE, newMemStr);
        }

        let memoDBInStorage = getMemoSvcMemoDB();
        if (memoDBInStorage === null) {

            let newMemoObj = {
                [uId]: {}
            }
            let newMemoStr = JSON.stringify(newMemoObj);
            localStorage.setItem(MEMO_DB_IN_LOCAL_STORAGE, newMemoStr);

        } else {
            let memoDBJsObj = JSON.parse(memoDBInStorage);                      // JsObjcet
            memoDBJsObj[uId] = {};

            let newMemoStr = JSON.stringify(memoDBJsObj);         // stirng
            localStorage.setItem(MEMO_DB_IN_LOCAL_STORAGE, newMemoStr);

        }

        alert('SIGN UP SUCCESS!!');
        
        props.homeViewer(true);
        props.signUpViewer(false);
        props.signInViewer(false);
        props.memoViewer(false);
        props.memoListViewer(false);
        
    }
    
    const uIdChangeHandler = (e) => {
        console.log('uIdChangeHandler() CALLED!!');
        setUId(e.target.value);
    }

    const uPwChangeHandler = (e) => {
        console.log('uPwChangeHandler() CALLED!!');
        setUPw(e.target.value);
    }

    const uMailChangeHandler = (e) => {
        console.log('uMailChangeHandler() CALLED!!');
        setUMail(e.target.value);
    }

    const uPhoneChangeHandler = (e) => {
        console.log('uPhoneChangeHandler() CALLED!!');
        setUPhone(e.target.value);
    }

    return(
        <div id="sign_up">
            <input type="text" className="txt_field" name="uId" onChange={uIdChangeHandler} placeholder="Input user id" />
            <br />
            <input type="password" className="txt_field" name="uPw" onChange={uPwChangeHandler} placeholder="Input user pw" />
            <br />
            <input type="email" className="txt_field" name="uMail" onChange={uMailChangeHandler} placeholder="Input user mail" />
            <br />
            <input type="text" className="txt_field" name="uPhone"  onChange={uPhoneChangeHandler} placeholder="Input user phone" />
            <br />
            <input type="button" value="SIGN UP" className="basic_btn" onClick={signUpBtnClickHandler}/>
        </div>
    );
}
export default SignUp;