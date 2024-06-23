import React, { useState } from "react";
import { getCurrentTime } from "../utils";
import { getLoginedSession } from "./session";

const Modify = (props) => {

    // hook

    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uMail, setUMail] = useState('');
    const [uPhone, setUPhone] = useState('');


    useState(() => {

        let memDBInStorage = localStorage.getItem('memberDB');
        let memDBJsObj = JSON.parse(memDBInStorage);

        let myMemObj = memDBJsObj[getLoginedSession()];

        setUId(getLoginedSession());
        setUPw(myMemObj.uPw);
        setUMail(myMemObj.uMail);
        setUPhone(myMemObj.uPhone);


    }, []);

    // handler


    const modifyUpBtnClickHandler = () => {
        console.log('[Modify] modifyUpBtnClickHandler()')

        let memDBInStorage = localStorage.getItem('memberDB');
        let memDBJsObj = JSON.parse(memDBInStorage);

        memDBJsObj[uId] = {
            'uPw': uPw,
            'uMail': uMail,
            'uPhone': uPhone,
        }

        let newMemStr = JSON.stringify(memDBJsObj);
        localStorage.setItem('memberDB', newMemStr);

        alert('MODIFY SUCCESS!!');

        props.homeViewer(false);
        props.signUpViewer(false);
        props.signInViewer(true);
        props.modifyViewer(false);
        props.memoViewer(false);
        props.memoListViewer(false);
    }

    const deleteUpBtnClickHandler = () => {
        console.log('[Modify] deleteUpBtnClickHandler()')

        let result = window.confirm('정말 회원 탈퇴 하시겠습니까?')

        if (result) {

        let memDBInStorage = localStorage.getItem('memberDB');
        let memDBJsObj = JSON.parse(memDBInStorage);
        // let mymemDBObj = memDBJsObj[getLoginedSession()];

        delete memDBJsObj[getLoginedSession()];
        localStorage.setItem('memberDB', JSON.stringify(memDBJsObj));

        let memoDBInStorage = localStorage.getItem('memoDB');
        let memoDBJsObj = JSON.parse(memoDBInStorage);

        delete memoDBJsObj[getLoginedSession()];
        localStorage.setItem('memoDB', JSON.stringify(memoDBJsObj));

        props.homeViewer(false);
        props.signUpViewer(true);
        props.signInViewer(false);
        props.modifyViewer(false);
        props.memoViewer(false);
        props.memoListViewer(false);


        } else {

            return;

        }

    }

    const uIdChangeHadler = (e) => {
        console.log('[Modify] uIdChangeHadler()');

        setUId(e.target.value);

    }

    const uPwChangeHadler = (e) => {
        console.log('[Modify] uPwChangeHadler()');

        setUPw(e.target.value);

    }

    const uMailChangeHadler = (e) => {
        console.log('[Modify] uMailChangeHadler()');

        setUMail(e.target.value);

    }

    const uPhoneChangeHadler = (e) => {
        console.log('[Modify] uPhoneChangeHadler()');

        setUPhone(e.target.value);

    }


    return (
        <div className="modify">
            <input type="text" name="uId" value={uId} onChange={uIdChangeHadler} disabled readOnly placeholder="Input User ID" />
            <br />
            <input type="password" value={uPw} name="uPw" onChange={uPwChangeHadler} placeholder="Input User PW" />
            <br />
            <input type="email" value={uMail} name="uMail" onChange={uMailChangeHadler} placeholder="Input User MAIL" />
            <br />
            <input type="text" value={uPhone} name="uPhone" onChange={uPhoneChangeHadler} placeholder="Input User PHONE" />
            <br />
            <button onClick={modifyUpBtnClickHandler}>MODIFY</button>
            <br />
            <button onClick={deleteUpBtnClickHandler}>DELETE</button>
        </div>
    )

}

export default Modify;