import React, { useEffect, useState } from "react";
import { getLoginedSessionID } from "./session";

const DiaryList = () => {

    // hook
    const [myDiaryArr, setMyDiaryArr] = useState([]);

    useEffect(() => {
        console.log('useEffect!!');

        let diaryObjInStarage = localStorage.getItem('diaryDB');
        let curDiaryDBObj = JSON.parse(diaryObjInStarage);
        setMyDiaryArr(curDiaryDBObj[getLoginedSessionID()]);

    }, []);

    // handler



    return (
        <div className="diaryListWrap">
            <ul>
                {
                    myDiaryArr.map((diary, idx) => {
                        console.log('diary: ', diary, 'idx : ', idx);

                        return <li>{diary}</li>
                        {

                        }
                    })
                }
            </ul>
        </div>
    );
}

export default DiaryList;