import React from "react";
import { getCurrentTime } from "../utils";



const MemoList = () => {

    let memoDBInStorage = localStorage.getItem('memoDB');
    let memoDBJsObj = JSON.parse(memoDBInStorage);

    if (memoDBJsObj == null) {
        memoDBJsObj = [];
    }


    const memoArr = Object.values(memoDBJsObj);


    return (
        <div className="memo_list">
            <ul>
                {memoArr.map((memo) => (
                    <li key={memo.id}>
                        {`${memo.mTxt} ${memo.mRegDate} ${memo.mModDate}`}
                    </li>
                ))};
            </ul>
        </div>
    )

}

export default MemoList;