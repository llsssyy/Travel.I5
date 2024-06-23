import React, { useState, useEffect } from "react";

import { MEMBER_DB_IN_LOCAL_STORAGE, 
         MEMO_DB_IN_LOCAL_STORAGE, 
         getMyMemoObjs, 
         setMyMemoObjs, 
         getToBeModifiedMemoObj } from '../const/const.js';
import { setLoginedSessionID, 
         getLoginedSessionID } from '../session.js'
import { getDateTime } from '../utils.js';

const MemoModifyModal = (props) => {

    // hook
    const [mTxt, setMTxt] = useState('');
    const [mRegDate, setMRegDate] = useState('');
    const [mModDate, setMModDate] = useState('');

    useEffect(() => {
        console.log('useEffect!!');
        
        let toBeModifiedMemoObj = getToBeModifiedMemoObj(getLoginedSessionID(), props.keyToBeModified);

        setMTxt(toBeModifiedMemoObj.mTxt);
        setMRegDate(toBeModifiedMemoObj.mRegDate);
        setMModDate(toBeModifiedMemoObj.mModDate);

    }, []);

    // handler
    const mTxtChangeHandler = (e) => {
        console.log('MEMO TXET CHANGEED!!');

        setMTxt(e.target.value);

    }

    // function
    const modifyBtnClickHandler = () => {
        console.log('MODIFY BTN CLICKED!!');

        let myMemoObjs = getMyMemoObjs(getLoginedSessionID());
        myMemoObjs[props.keyToBeModified] = {
            'mTxt'         : mTxt,
            'mRegDate'     : mRegDate,
            'mModDate'     : getDateTime(),
        }
        setMyMemoObjs(getLoginedSessionID(), myMemoObjs);

        props.setShowMemoMofidyModal(false); 

    }

    return(
        <>
            <input type="text" name="mTxt" value={mTxt} onChange={mTxtChangeHandler} placeholder="Input memo" />
            <button onClick={modifyBtnClickHandler}>MODIFY</button>
        </>
    );
}

export default MemoModifyModal;
