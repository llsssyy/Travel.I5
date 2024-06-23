import React, { useState, useEffect } from "react";

import { MEMBER_DB_IN_LOCAL_STORAGE, 
         MEMO_DB_IN_LOCAL_STORAGE, 
         getMemoSvcMemberDB, 
         setMemoSvcMemberDB, 
         getMemoSvcMemoDB,
         setMemoSvcMemoDB } from '../const/const.js';
import { setLoginedSessionID, getLoginedSessionID } from '../session.js'
import { getDateTime } from '../utils.js';

const Modify = (props) => {
    
    // hook
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');
    const [uMail, setUMail] = useState('');
    const [uPhone, setUPhone] = useState('');

    useEffect(() => {
        console.log('useEffect!!');

        let memDBInStorage = localStorage.getItem(MEMBER_DB_IN_LOCAL_STORAGE);   // string
        let memDBJsObj = JSON.parse(memDBInStorage); 
        let myObj = memDBJsObj[getLoginedSessionID()];

        console.log('loginedSessionID: ', getLoginedSessionID());
        console.log('myObj: ', myObj);

        setUId(getLoginedSessionID());
        setUPw(myObj.uPw);
        setUMail(myObj.uMail);
        setUPhone(myObj.uPhone);

    }, []);

    // handler
    const modifyBtnClickHandler = () => {
        console.log('modifyBtnClickHandler() CALLED!!');
        
        let memDBInStorage = localStorage.getItem(MEMBER_DB_IN_LOCAL_STORAGE);   // string
        let memDBJsObj = JSON.parse(memDBInStorage);
        memDBJsObj[uId] = {
            'uPw': uPw,
            'uMail': uMail,
            'uPhone': uPhone,
            'uRegDate' : memDBJsObj[uId].uRegDate,
            'uModDate' : getDateTime(),
        };

        let memDBStr = JSON.stringify(memDBJsObj);
        localStorage.setItem(MEMBER_DB_IN_LOCAL_STORAGE, memDBStr);

        alert('MODIFY SUCCESS!!');

        // setLoginedSessionID();

        props.homeViewer(true);
        props.signUpViewer(false); 
        props.signInViewer(false);
        props.modifyViewer(false)
        props.memoViewer(false);
        props.memoListViewer(false);

    }

    const deleteBtnClickHandler = () => {
        console.log('deleteBtnClickHandler() CALLED!!');

        let result = window.confirm('When you cancel your membership, all data will be deleted.\nAre you sure you want to withdraw?');
        if (result) {
            let memDBJsObj = JSON.parse(getMemoSvcMemberDB());
            delete memDBJsObj[getLoginedSessionID()];
            setMemoSvcMemberDB(memDBJsObj);

            let memoDBJsObj = JSON.parse(getMemoSvcMemoDB());
            delete memoDBJsObj[getLoginedSessionID()];
            setMemoSvcMemoDB(memoDBJsObj);

        }

        alert('Membership withdrawal has been completed.');

        setLoginedSessionID();

        props.homeViewer(true);
        props.signUpViewer(false); 
        props.signInViewer(false);
        props.modifyViewer(false)
        props.memoViewer(false);
        props.memoListViewer(false);

        props.changeMunuBar(false);

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
        <div id="modify"> 
            <input type="text" name="uId" className="txt_field" value={uId} onChange={uIdChangeHandler} placeholder="Input user id" disabled readOnly />
            <br />
            <input type="password" name="uPw" className="txt_field" value={uPw} onChange={uPwChangeHandler} placeholder="Input user pw" />
            <br />
            <input type="email" name="uMail" className="txt_field" value={uMail} onChange={uMailChangeHandler} placeholder="Input user mail" />
            <br />
            <input type="text" name="uPhone" className="txt_field" value={uPhone} onChange={uPhoneChangeHandler} placeholder="Input user phone" />
            <br />
            <input type="button" value="MODIFY" className="basic_btn" onClick={modifyBtnClickHandler}/>
            <input type="button" value="DELETE" className="basic_btn" onClick={deleteBtnClickHandler}/>
        </div>
    );

}

export default Modify;