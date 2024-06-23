import React, { useEffect, useState } from "react";
import { getLoginedSessionID } from "./session";

const Modify = (props) => {

    // hook


    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uMail, setUMail] = useState('');
    const [uPhone, setUPhone] = useState('');

    useEffect(() => {
        let memDBInStorage = localStorage.getItem('memberDB');
        let memDBJsObj = JSON.parse(memDBInStorage);
        let myObj = memDBJsObj[getLoginedSessionID()];

        console.log('loginedSessinID:', getLoginedSessionID());
        console.log('myObj:', myObj);

        setUId(getLoginedSessionID());
        setUPw(myObj.uPw);
        setUMail(myObj.uMail);
        setUPhone(myObj.uPhone);

    }, []);

    // hadler

    const modifyUpBtnClickHandler = () => {
        console.log('[Modify] modifyUpBtnClickHandler()');

        let memDBInStorage = localStorage.getItem('memberDB');
        let memDBJsObj = JSON.parse(memDBInStorage);
        memDBJsObj[uId] = {
            'uPw': uPw,
            'uMail': uMail,
            'uPhone': uPhone,
        };

        let memDBStr = JSON.stringify(memDBJsObj);
        localStorage.setItem('memberDB', memDBStr);

        alert('MODIFY SUCCESS!!');

        props.homeViewer(true);
        props.signUpViewer(false);
        props.signInViewer(false);
        props.modifyViewer(false);
        props.memoViewer(false);
        props.memoListViewer(false);

    }

    const deleteUpBtnClickHandler = () => {
        console.log('[Modify] deleteUpBtnClickHandler()');

        let result = window.confirm('정말 탈퇴 하시겠습니까?');
        if (result) {
            let memDBInStorage = localStorage.getItem('memberDB');
            let memDBJsObj = JSON.parse(memDBInStorage);
            delete memDBJsObj[getLoginedSessionID()];
            let memDBStr = JSON.stringify(memDBJsObj);
            localStorage.setItem('memberDB', memDBStr);

            let memoDBInStorage = localStorage.getItem('memoDB');
            let memoDBJsObj = JSON.parse(memoDBInStorage);
            delete memoDBJsObj[getLoginedSessionID()];
            let momoDBStr = JSON.stringify(memoDBJsObj);
            localStorage.setItem('memoDB', momoDBStr);

            alert('회원 탈퇴 완료!');

            props.homeViewer(true);
            props.signUpViewer(false);
            props.signInViewer(false);
            props.modifyViewer(false);
            props.memoViewer(false);
            props.memoListViewer(false);

        } else {

            return;
            
        }




    }

    const uIdChangeHandler = (e) => {
        console.log('[Modify] uIdChangeHandler()');

        setUId(e.target.value);

    }

    const uPwChangeHandler = (e) => {
        console.log('[Modify] uPwChangeHandler()');

        setUPw(e.target.value);

    }

    const uMailChangeHandler = (e) => {
        console.log('[Modify] uMailChangeHandler()');

        setUMail(e.target.value);

    }

    const uPhoneChangeHandler = (e) => {
        console.log('[Modify] uPhoneChangeHandler()');

        setUPhone(e.target.value);

    }



    return (
        <div className="modify">
            <input type="text" name="uId" value={uId} onChange={uIdChangeHandler} placeholder="Input User ID" disabled readOnly />
            <br />
            <input type="password" name="uPw" value={uPw} onChange={uPwChangeHandler} placeholder="Input User PW" />
            <br />
            <input type="email" name="uMail" value={uMail} onChange={uMailChangeHandler} placeholder="Input User MAIL" />
            <br />
            <input type="text" name="uPhone" value={uPhone} onChange={uPhoneChangeHandler} placeholder="Input User PHONE" />
            <br />
            <input type="button" onClick={modifyUpBtnClickHandler} value="MODIFY" />
            <br />
            <input type="button" onClick={deleteUpBtnClickHandler} value="DELETE" />
        </div>

    );
}

export default Modify;