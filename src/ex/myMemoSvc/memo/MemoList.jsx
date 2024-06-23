import React, { useEffect, useState } from "react";

import {
    MEMBER_DB_IN_LOCAL_STORAGE,
    MEMO_DB_IN_LOCAL_STORAGE,
    getMyMemoObjs,
    setMyMemoObjs
} from '../const/const.js';
import {
    setLoginedSessionID,
    getLoginedSessionID
} from '../session.js'
import {
    getDateTime,
    convertMapToArray
} from '../utils.js';

const MemoList = () => {

    // hook
    const [myMemoArr, setMyMemoArr] = useState([]);
    const [tempFlag, setTempFlag] = useState(false);

    useEffect(() => {
        console.log('[MemoList] useEffect!!');

        let myMemoObjs = getMyMemoObjs(getLoginedSessionID());
        setMyMemoArr(convertMapToArray(myMemoObjs).reverse());

    }, [tempFlag]);

    // handler
    const modifyBtnClickHandler = (e, key) => {
        console.log('[MemoList] modifyBtnClickHandler()');
       
        

    }
    const deleteBtnClickHandler = (e, key) => {
        console.log('[MemoList] deleteBtnClickHandler()');
        console.log('key --->', key);

        let result = window.confirm('정말 삭제 하시겠습니까?');
        if (result) {
            let myMemoObjs = getMyMemoObjs(getLoginedSessionID());
            delete myMemoObjs[key];
            setMyMemoObjs(getLoginedSessionID() ,myMemoObjs);

            alert('DELETE SUCCESS!!');
            setTempFlag((pv) => !pv);

        } else {
            alert('삭제가 취소 되었습니다.');

        }

    }

    return (
        <div id="memo_list">
            <ul>
                {
                    myMemoArr.map((memo, idx) => {
                        return (
                            <li key={idx}>
                                {memo.key}
                                &nbsp;&nbsp;
                                {memo.mTxt}
                                &nbsp;&nbsp;
                                {memo.mModDate}
                                &nbsp;&nbsp;
                                <button className="basic_btn" onClick={(e) => modifyBtnClickHandler(e, memo.key)}>modify</button>
                                <button className="basic_btn" onClick={(e) => deleteBtnClickHandler(e, memo.key)}>delete</button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default MemoList;