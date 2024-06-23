import React, { useState } from "react";

const Diary = () => {
    
    // hook

    const [diary, setDiary] = useState('');

    // handler

    const diaryChangeHandler = (e) => {
        console.log('diaryChangeHandler() CALLED!!');
        
        setDiary(e.target.value);
    
    }
    
    const writeBtnClickHandler = () => {
        console.log('writeBtnClickHandler() CALLED!!');

        

    }

    return (
        <>
        <input type="text" onChange={diaryChangeHandler} placeholder="Write Diary" />
        <button onClick={writeBtnClickHandler}>Write</button>
        </>
    );
}

export default Diary;