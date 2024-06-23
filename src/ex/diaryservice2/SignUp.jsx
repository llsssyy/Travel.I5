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
                    'uPhone': uPhone,
                }
            }

            let newMemStr = JSON.stringify(newMemObj);
            localStorage.setItem('memberDB', newMemStr);

            setUId('');
            setUPw('');
            setUMail('');
            setUPhone('');

        } else {

            let memberDBJsObj = JSON.parse(memberDBInStorage);

            memberDBJsObj[uId] = {
                'uPw': uPw,
                'uMail': uMail,
                'uPhone': uPhone,
            };

            let newMemStr = JSON.stringify(memberDBJsObj);
            localStorage.setItem('memberDB', newMemStr)

            setUId('');
            setUPw('');
            setUMail('');
            setUPhone('');

            alert('SIGN UP SUCCESS!!');

        };

        let diaryDBInStorage = localStorage.getItem('diaryDB');
        console.log(diaryDBInStorage);

        if (diaryDBInStorage === null) {

            let newMemberDiary = {
                [uId]: {}
            }

            let memberDiaryStr = JSON.stringify(newMemberDiary);
            localStorage.setItem('diaryDB', memberDiaryStr);

        } else {

            let diaryDBparse = JSON.parse(diaryDBInStorage);
            diaryDBparse[uId] = {};

            let diaryDBstr = JSON.stringify(diaryDBparse);
            localStorage.setItem('diaryDB', diaryDBstr)

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
            <input type="text" name="uId" value={uId} onChange={uIdChangeHandler} placeholder="Input User ID" />
            <br />
            <input type="password" name="uPw" value={uPw} onChange={uPwChangeHandler} placeholder="Input User PW" />
            <br />
            <input type="text" name="uMail" value={uMail} onChange={uMailChangeHandler} placeholder="Input User MAIL" />
            <br />
            <input type="text" name="uPhone" value={uPhone} onChange={uPhoneChangeHandler} placeholder="Input User Phone" />
            <br />
            <input type="button" onClick={signUpBtnClickHandler} value='SIGN UP' />
        </>
    );

}


export default SignUp;