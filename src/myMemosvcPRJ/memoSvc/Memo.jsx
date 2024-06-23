import React, { useState } from "react";
import { getLoginedSession } from "../memberSvc/session";
import { getCurrentTime } from "../utils";

const Memo = (props) => {

    // hook

    const [mTxt, setMTxt] = useState('');

    // handler

    const mTxtChangeHadler = (e) => {
        console.log('[Memo] mTxtChangeHadler()');

        setMTxt(e.target.value);

        console.log(mTxt);

    }

    const writeBtnClickHandler = () => {
        console.log('[Memo] writeBtnClickHandler()');

        let memoDBInStorage = localStorage.getItem('memoDB');
        let memoDBJsObj = JSON.parse(memoDBInStorage);

        if (memoDBJsObj == null) {

        memoDBJsObj[getLoginedSession()] = {
            [getCurrentTime()]: {
                'mTxt': mTxt,
                'mRegDate': getCurrentTime(),
                'mModDate': getCurrentTime(),
            }
        }
    } else {

        let myMemoObj = memoDBJsObj[getLoginedSession()];

        myMemoObj[getCurrentTime()] = {
                'mTxt': mTxt,
                'mRegDate': getCurrentTime(),
                'mModDate': getCurrentTime(),
            }
    }

        let newMemoStr = JSON.stringify(memoDBJsObj);
        localStorage.setItem('memoDB', newMemoStr);

        alert('Memo Write SUCCESS!!');

        props.homeViewer(false);
        props.signUpViewer(false);
        props.signInViewer(false);
        props.modifyViewer(false);
        props.memoViewer(false);
        props.memoListViewer(true);
    } 

    



    return (
        <div className="memo">
            <input type="text" value={mTxt} onChange={mTxtChangeHadler} placeholder="Input User Memo" />
            &nbsp;&nbsp;
            <button onClick={writeBtnClickHandler}>WRITE</button>
        </div>
    )

}

export default Memo;