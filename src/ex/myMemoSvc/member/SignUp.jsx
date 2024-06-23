import React, { useState } from "react";
import { MEMBER_DB_IN_LOCAL_STORAGE, MEMO_DB_IN_LOCAL_STORAGE, setMemoSvcMemberDB } from '../const/const.js'
import { getMemoSvcMemberDB } from '../const/const.js'
import { getMemoSvcMemoDB } from '../const/const.js'
import { getDateTime } from '../utils.js'

const SignUp = (props) => {

    // hook

    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uMail, setUMail] = useState('');
    const [uPhone, setUPhone] = useState('');


    // handler

    const uIdChangeHandler = (e) => {
        console.log('[SignUp] uIdChangeHandler');
        setUId(e.target.value);

    }

    const uPwChangeHandler = (e) => {
        console.log('[SignUp] uPwChangeHandler');
        setUPw(e.target.value);

    }


    const uMailChangeHandler = (e) => {
        console.log('[SignUp] uMailChangeHandler');
        setUMail(e.target.value);

    }


    const uPhoneChangeHandler = (e) => {
        console.log('[SignUp] uPhoneChangeHandler');
        setUPhone(e.target.value);

    }

    const signUpBtnClickHandler = () => {
        console.log('[SignUp] signUpBtnClickHandler');

        // MEMBER

        let memDBInStorage = getMemoSvcMemberDB();
        if (memDBInStorage === null) {

            let newMemObj = {
                [uId]: {
                    'uPw': uPw,
                    'uMail': uMail,
                    'uPhone': uPhone,
                    'uRegDate': getDateTime(),
                    'uModDate': getDateTime(),
                }
            };

            setMemoSvcMemberDB(newMemObj);

        } else {

            let memDBJsObj = JSON.parse(memDBInStorage);
            memDBJsObj[uId] = {
                'uPw': uPw,
                'uMail': uMail,
                'uPhone': uPhone,
                'uRegDate': getDateTime(),
                'uModDate': getDateTime(),
            };

            setMemoSvcMemberDB(memDBJsObj);

        }

        // MEMO

        let memoSvcMemoDB = getMemoSvcMemoDB();
        if (memoSvcMemoDB === null) {

            let newMemoObj = {
                [uId]: {}
            }
            let newMemoStr = JSON.stringify(newMemoObj);
            localStorage.setItem(MEMO_DB_IN_LOCAL_STORAGE, newMemoStr);

        } else {

            let memoDBJsObj = JSON.parse(memoSvcMemoDB);
            memoDBJsObj[uId] = {};

            let newMemoStr = JSON.stringify(memoDBJsObj);
            localStorage.setItem(MEMO_DB_IN_LOCAL_STORAGE, newMemoStr);

        }

        alert('SIGN UP SUCCESS!!');

        props.homeViewer(true);
        props.signUpViewer(false);
        props.signInViewer(false);
        props.memoViewer(false);
        props.memoListViewer(false);

    }


    return (
        <div id="sign_up">
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
            <input type="email"
                className="txt_field"
                onChange={uMailChangeHandler}
                placeholder="Input user MAIL" />
            <br />
            <input type="phone"
                className="txt_field"
                onChange={uPhoneChangeHandler}
                placeholder="Input user Phone" />
            <br />
            <input type="button"
                value="SIGN UP"
                className="basic-btn"
                onClick={signUpBtnClickHandler} />
        </div>
    )
}

export default SignUp;