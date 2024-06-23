import React, { useState } from "react";

import {
    MEMBER_DB_IN_LOCAL_STORAGE, MEMO_DB_IN_LOCAL_STORAGE,
    getMyMemoObjs, setMyMemoObjs
} from '../const/const.js';
import { setLoginedSessionID, getLoginedSessionID } from '../session.js'
import { getDateTime } from '../utils.js';

const Memo = (props) => {

    // hook

    const [memoTxt, setMemoTxt] = useState('');


    // handler

    const memoTxtChangeHandler = (e) => {
        console.log('[Memo] memoTxtChangeHandler()');

        setMemoTxt(e.target.value);

    }

    const writeBtnClickHandler = () => {
        console.log('[Memo] writeBtnClickHandler()');

        let myMemoObjs = getMyMemoObjs(getLoginedSessionID());
        myMemoObjs[getDateTime()] = {
            'mTxt': memoTxt,
            'mRegDate': getDateTime(),
            'mModDate': getDateTime(),
        }

        setMyMemoObjs(getLoginedSessionID(), myMemoObjs);

        alert('MEMO WRITE SUCCESS!!');

        props.homeViewer(false);
        props.signUpViewer(false);
        props.signInViewer(false);
        props.memoViewer(false);
        props.memoListViewer(true);

    }



    return (
        <div id="memo">
            <input type="text" className="txt_field" onChange={memoTxtChangeHandler} />
            <button className="basic_btn" onClick={writeBtnClickHandler}>WRITE</button>
        </div>
    )
}

export default Memo;