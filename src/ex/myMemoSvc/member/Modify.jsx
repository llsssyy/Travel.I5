import React, { useEffect, useState } from "react";

import { MEMBER_DB_IN_LOCAL_STORAGE, MEMO_DB_IN_LOCAL_STORAGE, setMemoSvcMemoDB, } from '../const/const.js'
import { getMemoSvcMemberDB, setMemoSvcMemberDB } from '../const/const.js'
import { getMemoSvcMemoDB } from '../const/const.js'
import { getMyMemObj } from '../const/const.js'
import { getDateTime } from '../utils.js'

import { getLoginedSessionID, setLoginedSessionID } from '../session.js'

const Modify = (props) => {

    // hook

    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uMail, setUMail] = useState('');
    const [uPhone, setUPhone] = useState('');

    useEffect(() => {
        console.log('[Modify] useEffect()');

        let myObj = getMyMemObj(getLoginedSessionID());


        setUId(getLoginedSessionID());
        setUPw(myObj.uPw);
        setUMail(myObj.uMail);
        setUPhone(myObj.uPhone);


    }, []);


    // handler

    const uIdChangeHandler = (e) => {
        console.log('[Modify] uIdChangeHandler');
        setUId(e.target.value);

    }

    const uPwChangeHandler = (e) => {
        console.log('[Modify] uPwChangeHandler');
        setUPw(e.target.value);

    }


    const uMailChangeHandler = (e) => {
        console.log('[Modify] uMailChangeHandler');
        setUMail(e.target.value);

    }


    const uPhoneChangeHandler = (e) => {
        console.log('[Modify] uPhoneChangeHandler');
        setUPhone(e.target.value);

    }

    const modifyBtnClickHandler = () => {
        console.log('[Modify] modifyBtnClickHandler');

        let MemoSvcMemberDB = getMemoSvcMemberDB();                // DB(string)
        let memDBJsObj = JSON.parse(MemoSvcMemberDB);               // Obj

        memDBJsObj[uId] = {
            'uPw': uPw,
            'uMail': uMail,
            'uPhone': uPhone,
            'uRegDate': memDBJsObj[uId].uRegDate,
            'uModDate': getDateTime(),
        }

        setMemoSvcMemberDB(memDBJsObj);

        alert('[Modify] MEMBER MODIFY SUCCESS!!');

        props.homeViewer(true);
        props.signUpViewer(false);
        props.signInViewer(false);
        props.modifyViewer(false);
        props.memoViewer(false);
        props.memoListViewer(false);

    }

    const deleteBtnClickHandler = () => {
        console.log('[Modify] deleteBtnClickHandler');

        let result =  window.confirm('정말 탈퇴 하시겠습니까?');
        if (result) {
            let memDBJsObj = JSON.parse(getMemoSvcMemberDB());
            delete memDBJsObj[getLoginedSessionID()];
            setMemoSvcMemberDB(memDBJsObj);

            let memoDBJsObj = JSON.parse(getMemoSvcMemoDB());
            delete memoDBJsObj[getLoginedSessionID()];
            setMemoSvcMemoDB(memoDBJsObj);

        }
        
        alert('삭제 완료!');

        setLoginedSessionID();

        props.homeViewer(true);
        props.signUpViewer(false);
        props.signInViewer(false);
        props.modifyViewer(false);
        props.memoViewer(false);
        props.memoListViewer(false);

        props.changeMenuBar(false);

    }


    return (
        <div id="modify">
            <input type="text"
                value={uId}
                className="txt_field"
                readOnly disabled />
            <br />
            <input type="password"
                value={uPw}
                className="txt_field"
                onChange={uPwChangeHandler}
                placeholder="Input user PW" />
            <br />
            <input type="email"
                value={uMail}
                className="txt_field"
                onChange={uMailChangeHandler}
                placeholder="Input user MAIL" />
            <br />
            <input type="phone"
                value={uPhone}
                className="txt_field"
                onChange={uPhoneChangeHandler}
                placeholder="Input user Phone" />
            <br />
            <input type="button"
                value="MODIFY"
                className="basic-btn"
                onClick={modifyBtnClickHandler} />
            <br />
            <input type="button"
                value="DELETE"
                className="basic-btn"
                onClick={deleteBtnClickHandler} />
        </div>
    )
}

export default Modify;