import React, { useState } from "react";

const SignUp = () => {

    // hook

    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uMail, setUMail] = useState('');
    const [uPhone, setUPhone] = useState('');


    // handler

    const signUpBtnClickHandler = () => {
        console.log('signUpBtnClickHandler() CALLED!!');

        let memberDBInStorage = localStorage.getItem('memberDB');
        console.log(memberDBInStorage);

        if (memberDBInStorage === null) {

            let newMemObj = {
                [uId]: {
                    'uPw': uPw,
                    'uMail': uMail,
                    'uPhone': uPhone
                }
            }

            let newMemStr = JSON.stringify(newMemObj);

            localStorage.setItem('memberDB', newMemStr);


        } else {

            let memberDBJsObj = JSON.parse(memberDBInStorage);

            memberDBJsObj[uId] = {
                'uPw': uPw,
                'uMail': uMail,
                'uPhone': uPhone
            }

            let newMemStr = JSON.stringify(memberDBJsObj)

            localStorage.setItem('memberDB', newMemStr);

        }


        alert('SIGN UP SUCCESS!!');

        setUId('');
        setUPw('');
        setUMail('');
        setUPhone('');


        let diaryObjInStorage = localStorage.getItem('diaryDB');
        if (diaryObjInStorage === null) {
            let diaryDB = {
                [uId]: [],
            };

            localStorage.setItem('diaryDB', JSON.stringify(diaryDB));
        } else {
            let curDiaryDBObj = JSON.parse(diaryObjInStorage);

            curDiaryDBObj[uId] = [];

            localStorage.setItem('diaryDB', JSON.stringify(curDiaryDBObj));
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

const uMailChangeHandler = (e) => {
    console.log('uMailChangeHandler() CALLED!!');

    setUMail(e.target.value);

}

const uPhoneChangeHandler = (e) => {
    console.log('uPhoneChangeHandler() CALLED!!');

    setUPhone(e.target.value);

}


return (
    <>
        <input type="text" value={uId} onChange={uIdChangeHandler} name="uId" placeholder="Input User ID" />
        <br />
        <input type="password" value={uPw} onChange={uPwChangeHandler} name="uPw" placeholder="Input User PW" />
        <br />
        <input type="text" value={uMail} onChange={uMailChangeHandler} name="uMail" placeholder="Input User E-MAIL" />
        <br />
        <input type="text" value={uPhone} onChange={uPhoneChangeHandler} name="uPhone" placeholder="Input User PHONE" />
        <br />
        <input type="button" onClick={signUpBtnClickHandler} value='SIGN UP' />
    </>
);
}

export default SignUp;