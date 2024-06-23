import React, { useState } from "react";
import { getCurrentTime } from "../utils";

const SignUp = (props) => {

    // hook

    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uMail, setUMail] = useState('');
    const [uPhone, setUPhone] = useState('');

    // handler

    const signUpBtnClickHandler = () => {
        console.log('[SignUp] signUpBtnClickHandler()')

        let memDBInStorage = localStorage.getItem('memberDB');
        let memDBStr = JSON.parse(memDBInStorage);
        if (memDBStr == null) {
            let newMemObj = {
                [uId]: {
                    'uPw': uPw,
                    'uMail': uMail,
                    'uPhone': uPhone,
                }
            }

            let newMemStr = JSON.stringify(newMemObj);
            localStorage.setItem('memberDB', newMemStr);
        } else {

            let memDBInStorage = localStorage.getItem('memberDB');
            let memDBJsObj = JSON.parse(memDBInStorage);

            memDBJsObj[uId] = {
                'uPw': uPw,
                'uMail': uMail,
                'uPhone': uPhone,
            }

            let newMemStr = JSON.stringify(memDBJsObj);
            localStorage.setItem('memberDB', newMemStr);

        }

        let memoDBInStorage = localStorage.getItem('memoDB');
        let memoDBJsObj = JSON.parse(memoDBInStorage);
        if (memoDBJsObj == null) {
            let newMemoObj = {
                [uId]: {
                    [getCurrentTime()] : []
                }
            }

            let newMemoStr = JSON.stringify(newMemoObj);
            localStorage.setItem('memoDB', newMemoStr);

        } else {

            // memoDBJsObj[uId] = memoDBJsObj[uId] || {};
            // memoDBJsObj[uId][getCurrentTime()] = [];

            memoDBJsObj[uId] = {
                    [getCurrentTime()] : []
                }
            }

            let newMemoStr = JSON.stringify(memoDBJsObj);
            localStorage.setItem('memoDB', newMemoStr);

        

        alert('SIGN UP SUCCESS!!');

        setUId('');
        setUPw('');
        setUMail('');
        setUPhone('');

        props.homeViewer(false);
        props.signUpViewer(false);
        props.signInViewer(true);
        props.modifyViewer(false);
        props.memoViewer(false);
        props.memoListViewer(false);
    }


    const uIdChangeHadler = (e) => {
        console.log('[SignUp] uIdChangeHadler()');

        setUId(e.target.value);

    }

    const uPwChangeHadler = (e) => {
        console.log('[SignUp] uPwChangeHadler()');

        setUPw(e.target.value);

    }

    const uMailChangeHadler = (e) => {
        console.log('[SignUp] uMailChangeHadler()');

        setUMail(e.target.value);

    }

    const uPhoneChangeHadler = (e) => {
        console.log('[SignUp] uPhoneChangeHadler()');

        setUPhone(e.target.value);

    }



    // function


    return (
        <div className="sign_up">
            <input type="text" name="uId" value={uId} onChange={uIdChangeHadler} placeholder="Input User ID" />
            <br />
            <input type="password" value={uPw} name="uPw" onChange={uPwChangeHadler} placeholder="Input User PW" />
            <br />
            <input type="email" value={uMail} name="uMail" onChange={uMailChangeHadler} placeholder="Input User MAIL" />
            <br />
            <input type="text" value={uPhone} name="uPhone" onChange={uPhoneChangeHadler} placeholder="Input User PHONE" />
            <br />
            <button onClick={signUpBtnClickHandler}>SIGN UP</button>
        </div>
    )

}

export default SignUp;