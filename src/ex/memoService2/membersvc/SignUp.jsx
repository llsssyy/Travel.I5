import React, { useState } from "react";

const SignUp = (props) => {

    // hook

    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uMail, setUMail] = useState('');
    const [uPhone, setUPhone] = useState('');

    // handler


    const signUpBtnClickHandler = () => {
        console.log('[SignUp] signUpBtnClickHandler()');

        let memDBInStorage = localStorage.getItem('memberDB');
        if (memDBInStorage === null) {
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
            let memDBObj = JSON.parse(localStorage.getItem('memberDB'));
            memDBObj[uId] = {
                'uPw': uPw,
                'uMail': uMail,
                'uPhone': uPhone,
            };

            let newMemStr = JSON.stringify(memDBObj);
            localStorage.setItem('memberDB', newMemStr);

        }

        let memoDBInStorage = localStorage.getItem('memoDB');
        if (memoDBInStorage === null) {
            let newMemoObj = {
                [uId] : {}
            };

            let newMemoStr = JSON.stringify(newMemoObj);
            localStorage.setItem('memoDB', newMemoStr);

        } else {
            let memoDBObj = JSON.parse(localStorage.getItem('memoDB'));
            memoDBObj[uId] = {}

            let newMemoStr = JSON.stringify(memoDBObj);
            localStorage.setItem('memoDB', newMemoStr);
            
        }

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


    return (
        <div className="sign_up">
            <input type="text" name="uId" value={uId} onChange={uIdChangeHandler} placeholder="Input User ID" />
            <br />
            <input type="password" name="uPw" value={uPw} onChange={uPwChangeHandler} placeholder="Input User PW" />
            <br />
            <input type="email" name="uMail" value={uMail} onChange={uMailChangeHandler} placeholder="Input User MAIL" />
            <br />
            <input type="text" name="uPhone" value={uPhone} onChange={uPhoneChangeHandler} placeholder="Input User PHONE" />
            <br />
            <input type="button" onClick={signUpBtnClickHandler} value="SIGN UP" />
        </div>
    );
}

export default SignUp;