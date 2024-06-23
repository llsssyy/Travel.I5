import React, { useState } from "react";
import { getLoginedSessionID } from './session'

const Diary = (props) => {
    
    // hook

    const [diary, setDiary] = useState('');
    
    // handler

    const diaryBtnClickHandler = () => {
        console.log('diaryBtnClickHandler() CALLED!!');

    let diaryObjInStorage = localStorage.getItem('diaryDB');
    let curDiaryObj = JSON.parse(diaryObjInStorage);
    let myDiaryArr = curDiaryObj[getLoginedSessionID()];
    myDiaryArr.unshift(diary);
    curDiaryObj[getLoginedSessionID()] = myDiaryArr;
    localStorage.setItem('diaryDB', JSON.stringify(curDiaryObj));

    alert('DIARY WRITE SUCCESS!!');


    props.homeViewer(false);
    props.signUpViewer(false);
    props.signInViewer(false);
    props.diaryViewer(false);
    props.diaryListViewer(true);


    }
    
    const diaryChangeHandler =  (e) => {
        console.log('diaryChangeHandler() CALLED!!');

        setDiary(e.target.value);

    }
    
    return (
        <>
            <input type="text" name="diary" onChange={diaryChangeHandler} 
            placeholder="Write Today Diary"
            value={diary}
            />
            &nbsp;&nbsp;
            <input type="button" onClick={diaryBtnClickHandler} value='WRITE' />
        </>
    );
}

export default Diary;