import React, { useState, useEffect } from "react";

import { MEMBER_DB_IN_LOCAL_STORAGE, 
         MEMO_DB_IN_LOCAL_STORAGE, 
         getMyMemoObjs, 
         setMyMemoObjs } from '../const/const.js';
import { setLoginedSessionID, 
         getLoginedSessionID } from '../session.js'
import { getDateTime,
         convertMapToArray } from '../utils.js';

import '../style/memoModifyModal.css';
import MemoModifyModal from "./MemoModifyModal.jsx";
import Banner from "./Banner.jsx";

const MemoList = (props) => {

    // hook
    const [tempFlag, setTempFlag] = useState(true);
    const [myMemoArr, setMyMemoArr] = useState([]);
    const [showMemoMofidyModal, setShowMemoMofidyModal] = useState(false);
    const [keyToBeModified, setKeyToBeModified] = useState('');

    useEffect(() => {
        console.log('useEffect() CALLED!!');

        let myMemoObjs = getMyMemoObjs(getLoginedSessionID());
        setMyMemoArr(convertMapToArray(myMemoObjs).reverse());

    }, [tempFlag, showMemoMofidyModal]);

    // handler
    const modifyBtnClickHandler = (e, key) => {
        console.log('MODIFY BUTTON CLICKED!!');
        
        setKeyToBeModified(key);
        setShowMemoMofidyModal(true);

    }

    const deleteBtnClickHandler = (e, key) => {
        console.log('DELETE BUTTON CLICKED!!');

        let result = window.confirm('Are you sure you want to delete?');

        if (result) {
            let myMemoObjs = getMyMemoObjs(getLoginedSessionID());
            delete myMemoObjs[key];
            setMyMemoObjs(getLoginedSessionID(), myMemoObjs);

            alert('The memo has been deleted!!');

            setTempFlag((pv) => !pv);

        } else {
            alert('Canceled.');

        }

    }

    // css
    const style_div = {
        width: "1700px",
        margin: "0 auto",
    }
    
    const style_li = {
        padding: "4px", 
        marginTop: "5px",
        borderTop: "0px",
        borderRight: "0px",
        borderBottom: "1px",
        borderLeft: "0px",
        borderColor: "#dadada", 
        borderStyle: "solid",
    }

    return(
        <div id="memo_list">

            <Banner />

            <hr />

            <ul>
                {
                    myMemoArr.map((myMemo, idx) =>
                        <>
                            <li style={{ textAlign: 'left', }}>
                                [<span style={{display: 'inline-block', width: '150px' }}>{myMemo.key}</span>]
                                &nbsp;&nbsp;
                                <span style={{display: 'inline-block', width: '400px' }}>{myMemo.mTxt}</span>
                                &nbsp;&nbsp;
                                {/* {myMemo.mRegDate}&nbsp;&nbsp;|&nbsp;&nbsp; */}
                                <span style={{display: 'inline-block', width: '160px' }}>{myMemo.mModDate}</span>
                                &nbsp;&nbsp;
                                <button className="basic_btn" onClick={(e) => modifyBtnClickHandler(e, myMemo.key)}>Modify</button>
                                <button className="basic_btn" onClick={(e) => deleteBtnClickHandler(e, myMemo.key)}>Delete</button>
                            </li>
                        </>
                    )
                }
            </ul>

            { 
                showMemoMofidyModal 
                ? 
                <div className="modalBg">
                    <div className="modal">
                        <MemoModifyModal 
                            keyToBeModified={keyToBeModified} 
                            setShowMemoMofidyModal={setShowMemoMofidyModal} />
                        <br /><br />
                        <button className="basic_btn" onClick={() => {
                            console.log('MODIFY MODAL CLOSED!!');
                            setKeyToBeModified('');
                            return setShowMemoMofidyModal(false);
                            }}>CLOSE</button>
                    </div>
                </div>
                : 
                null 
            }

        </div>
    );
}

export default MemoList;
