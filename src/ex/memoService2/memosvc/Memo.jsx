import React, { useState } from "react";
import { getLoginedSessionID } from "../membersvc/session";
import { getDateTime } from "../utils";

const Memo = (props) => {

    // hook

    const [memoTxt, setMemoTxt] = useState('');

    // handler

    const memoChangeHandler = (e) => {
        console.log('[Memo] memoChangeHandler()');

        setMemoTxt(e.target.value);

    }

    const writeBtnClickHandler = () => {
        console.log('[Memo] writeBtnClickHandler()');

        let memoDBInStorage = localStorage.getItem('memoDB');
        let memoDBJsObj = JSON.parse(memoDBInStorage);
        let myMemoObj = memoDBJsObj[getLoginedSessionID()];

        myMemoObj[getDateTime()] = {
            'mTxt': memoTxt,
            'mRegDate': getDateTime(),
            'mModDate': getDateTime(),
        }

        let myMemoStr = JSON.stringify(myMemoObj);
        localStorage.setItem('memoDB', myMemoStr);

        alert('MEMO WRITE SUCCESS!!');

        props.homeViewer(false);
        props.signUpViewer(false);
        props.signInViewer(false);
        props.modifyViewer(false);
        props.memoViewer(false);
        props.memoListViewer(true);

    }

    return (
        <div className="memo">
            <input type="text" onChange={memoChangeHandler} value={memoTxt} placeholder="Input User Memo" />
            <br />
            <input type="button" onClick={writeBtnClickHandler} value='WRITE' />
        </div>
    );
}

export default Memo;