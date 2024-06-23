import React, { useEffect, useRef, useState } from "react";
import { getLoginSessionID } from "../user_management/session";
import "../util";
import "../css/modal.css"
import { getDateTime } from "../util";

const Modal = (props) =>{

    const [uComment, setComment] = useState("");    //댓글창의 값을 가져오기 위한 useState
    const [uModify, setModify] = useState("");    //댓글창의 값을 가져오기 위한 useState
    const [keysComments, setKeysComment] = useState([]);    //키값의 내용을 저장할 배열 useState
    const [tmpState, setTmpState] = useState(true);     //댓글창이 갱신 되어야 할때 쓰이는 useState
    const [selectCommentIdx, setSelectCommentIdx] = useState(-1);   //현재 선택한 댓글의 idx를 가지고 있는 useState
    const [selectCommnetColor, setSelectCommnetColor] = useState("#fff");   //선택한 댓글의 배경색을 변경해줄 useState    
    const [keysInfo, setKeysInfo] = useState([]);
    const [onBgClick, setOnBgClick] = useState(false);

    const modalBodyRef = useRef(null);

    useEffect(() =>{        
        console.log("modal useEffect()");        
        
        let commentDBObj = JSON.parse(localStorage.getItem("commentDB"));   //commentDB 파싱
        if(commentDBObj !== undefined && commentDBObj !== null)     //commentDB의 객체가 비어 있지 않으면
        {      
            CommnetView();  //댓글을 보여준다.
        }

        let themeDBObj = JSON.parse(localStorage.getItem("themeDB"));   //각각의 DB를 파싱
        let localDBObj = JSON.parse(localStorage.getItem("localDB"));
        let infoArr = [];
        console.log(localDBObj);
        if(themeDBObj[props.keyValue] !== undefined)        //테마db에 키값이 있으면
        {
            console.log("themeDBObj");
            infoArr.push(themeDBObj[props.keyValue].localName)
            infoArr.push(themeDBObj[props.keyValue].title)
            infoArr.push(themeDBObj[props.keyValue].theme)
            infoArr.push(themeDBObj[props.keyValue].info)
            
            setKeysInfo(infoArr);
        }
        
        else if(localDBObj[props.keyValue] !== undefined)       //로컬db에 키값이 있으면
        {
            console.log("localDBObj");
            infoArr.push(localDBObj[props.keyValue].localName)
            infoArr.push(localDBObj[props.keyValue].title)
            infoArr.push(localDBObj[props.keyValue].local)
            infoArr.push(localDBObj[props.keyValue].info)

            setKeysInfo(infoArr);
        }
        
        document.body.style.overflow = "hidden";
    },[tmpState]);

    const txtAreaHandler = (e) =>{  //댓글창에 텍스트가 입력 될 때 마다 uComment의 값을 변환 하는 핸들러
        setComment(e.target.value);
    }

    const txtModifyHandler = (e) =>{  //댓글창에 텍스트가 입력 될 때 마다 uModify의 값을 변환 하는 핸들러
        setModify(e.target.value); 
    }

    const commentBtnHandler = () =>{    //댓글 쓰기 버튼을 누르면 실행되는 핸들러        
        console.log("commentBtnHandler CALLED!!");
        if(getLoginSessionID() === "")
        {
            alert("로그인 해주세요");
            return;
        }

        if(uComment==="")
        {
            alert("내용을 입력 해주세요")
            return;
        }

        console.log(getDateTime());

        setComment("");

        let commentDBObj = JSON.parse(localStorage.getItem("commentDB"));   //commentDB를 불러와 객체화 한다.
        if(commentDBObj === undefined || commentDBObj === null)         //commentDB가 비어 있을때
        {
            commentDBObj = {[props.keyValue]:[{     //부모 에게 받아온 키값을 키값으로 밸류를 배열 형태로 현재 로그인 중인 id와 입력한 댓글로 객체를 만든다.
                id:getLoginSessionID(),
                comment:uComment,
                time: getDateTime(),
            }]};            
            localStorage.setItem("commentDB", JSON.stringify(commentDBObj));    //객체를 문자열화 하여 commentDB에 저장한다.
        }
        else   //commentDB가 비어 있지 않을 때
        {
            if (!commentDBObj.hasOwnProperty(props.keyValue)) {     //받아온 키값과 동일한 키 값이 DB에 존재하지 않을 경우
                commentDBObj[props.keyValue] = [{       // 받아온 키값을 키값으로 밸류를 배열 형태로 현재 로그인 중인 id와 입력한 댓글로 객체를 만든다.
                    id: getLoginSessionID(),
                    comment: uComment,
                    time: getDateTime(),
                }];
            } else {        //받아온 키값과 동일한 키 값이 DB에 존재 할 경우
                commentDBObj[props.keyValue].push({     //현재 키값에 배열의 push함수를 이용하여 밸류를 저장한다.
                    id: getLoginSessionID(),
                    comment: uComment,
                    time: getDateTime(),
                });
            }
            localStorage.setItem("commentDB", JSON.stringify(commentDBObj));
        }    
        
        CommnetView();      //댓글이 추가 되었으므로 댓글창을 갱신 한다.
    }

    const CommnetView = () =>{  //댓글창에 댓글을 추가 하고 갱신하는 함수.
        console.log("CommnetView() CALLED!!");
        let commentDBObj = JSON.parse(localStorage.getItem("commentDB"));       //commnetDB를 가져온다.
        
        if(commentDBObj[props.keyValue] !== undefined && commentDBObj[props.keyValue] !== null) //commentDB의 부모에게 받아온 키값으로 만들어 진게 있을때
        {
            let commentsNum = Object.keys(commentDBObj[props.keyValue]);    //객체의 키값의 갯수를 배열로 받아온다.
            let comments = [];                                              //저장 되어있는 값을 받아낼 배열
            for(let i=0; i<commentsNum.length; i++)     //반복문으로 commentsNum의 갯수 만큼 반복한다.
            {
                comments.unshift(commentDBObj[props.keyValue][i]);  //comments배열에 키값이 가지고 있는 밸류값을 하나하나 역순으로 넣어준다.
            }
            console.log(comments);
            setKeysComment(comments);   //useState의 keysComment에 배열 comments를 저장한다.
        }
    }

    const modifyBtnHandler = () =>{     //수정완료 버튼을 눌렀 을때.
        console.log("modifyBtnHandler CALLED!!");

        if(uModify==="")    //수정할때 댓글에 아무 입력 값이 없으면
        {
            alert("내용을 입력 해주세요")
            return;
        }

        setModify("");

        let commentDBObj = JSON.parse(localStorage.getItem("commentDB"));   //commentDB를 파싱
        let comments = commentDBObj[props.keyValue];        //commentDBObj의 부모에게 받은 키값이 가르키는 객체를 가져온다.
        let selectComment = (comments.length - selectCommentIdx) - 1    //modify가 눌린 댓글의 index를 가져온다.

        let modifyValue = {     //수정된 댓글의 값을 가지고 있을 객체
            id: getLoginSessionID(),
            comment: uModify,
            time: getDateTime(),
        }        

        comments.splice(selectComment, 1, modifyValue); //splice 함수를 이용해 선택된 댓글을 수정함.

        localStorage.setItem("commentDB", JSON.stringify(commentDBObj));    //DB에 저장
        
        setTmpState((pv) => !pv);   //댓글창을 갱신 시키기 위한 state값 변경
        setSelectCommentIdx(-1);    //index 초기화
    }

    const commentModifyBtnHandler = (e, uid, index, comment) => {    //댓글 옆의 수정 버튼이 눌렸을 때
        console.log("commentmodifyBtnHandler CALLED!!");

        if(selectCommentIdx !== -1) //index가 -1이 아닐때 (이미 수정 버튼이 눌렸을 때.)
        {
            if(index === selectCommentIdx)  //이전에 누른 수정 버튼이 눌렸을 떄
            {
                setSelectCommentIdx(-1);    //idx 초기화
            }
            else                            //이전에 누른 수정 버튼이 아닌 다른 버튼이 눌렸을때
            {
                setSelectCommentIdx(index); //선택된 버튼의 idx로 변경
            }            
        }

        if(uid === getLoginSessionID() && selectCommentIdx ===-1)    //댓글을 쓴 사람의 id와 로그인 중인 사람의 id가 같고 수정 버튼이 눌리지 않았을 때
        {
            setSelectCommentIdx(pv => pv=index);    //idx를 선택된 댓글의 idx로 변경
            setSelectCommnetColor("#dadada");       //선택된 댓글의 배경을 회색으로 변경
        }

        setModify(comment);
    }

    const commentDeleteBtnHandler = (e, uid, index) => {        //댓글 옆의 삭제 버튼이 눌렸을 때
        console.log("deleteBtnHandler CALLED!!");
        if(selectCommentIdx !== -1)     //어떠한 아무런 댓글이 modify버튼 으로 선택된 상태라면
        {
            setSelectCommentIdx(-1);    //idx를 -1로 초기화
        }
        if(uid === getLoginSessionID())      //댓글을 쓴 사람과 로그인 한 사람이 같다면
        {
            let commentDBObj = JSON.parse(localStorage.getItem("commentDB"));   //commentDB를 파싱해서 객체로 가져옴
            let comments = commentDBObj[props.keyValue];        //부모에게 받은 키값으로 현재 페이지의 댓글들을 가져옴
            let selectComment = (comments.length - index) - 1   //선택된 댓글의 idx를 가져옴

            comments.splice(selectComment, 1);      //idx를 이용해 댓글을 삭제.
            localStorage.setItem("commentDB", JSON.stringify(commentDBObj));    //DB에 저장

            setTmpState((pv) => !pv);   //페이지 갱신
        }
    }

    const modalBackHandler = () => {       //모달 밖의 검은 영역을 클릭 했을때
        console.log("modalBackHandler CALLED!!");        
        props.modalViewer(false);       //모달 페이지 종료
        document.body.style.overflow = "auto";
        if(props.menuViewer !== undefined)  //props에서 메뉴뷰어 인자를 받았으면
            props.menuViewer(true);         //모달이 꺼질 때 MenuBar를 보이게 한다.
    }

    const modalBgMouseDownHandler = () =>{
        console.log("modalBgMouseDownHandler CALLED!!");
        setOnBgClick(true);
    }

    const modalBgMouseUpHandler = () =>{
        console.log("modalBgMouseUpHandler CALLED!!");
        if(onBgClick)
        {
            props.modalViewer(false);       //모달 페이지 종료
            document.body.style.overflow = "auto";
            if(props.menuViewer !== undefined)  //props에서 메뉴뷰어 인자를 받았으면
            props.menuViewer(true);         //모달이 꺼질 때 MenuBar를 보이게 한다.
        }
    }


    return(
        <div onMouseDown={modalBgMouseDownHandler} onMouseUp={modalBgMouseUpHandler} className="modal" ref={modalBodyRef}>
            <div onMouseDown={(e) => e.stopPropagation()} className="body" >
                <div>
                    <h1 className="main_Title">{`${keysInfo[0]}`}</h1>
                    <h2 className="sub_Title">{`${keysInfo[1]}`}</h2>
                    <img className="tripimg" src={`./resources/prj_imgs/modal/${keysInfo[2]}.png`} />                    
                    <div className="detail">
                        <h3>상세정보</h3>
                        <div>&nbsp;{`${keysInfo[3]}`}</div>
                    </div>

                    <div className="comment">
                        <h3>&nbsp;&nbsp;&nbsp;댓글</h3>
                        <div className="commentBox">
                            <textarea name="commentArea" cols="200" rows="5" value={uComment} onChange={txtAreaHandler}></textarea>
                            <button onClick={commentBtnHandler}>Comment</button>
                        </div>                        
                        <ul>
                            {
                            
                            keysComments.map((comments, index) => (
                                <li className="commentlist" key={index}
                                    style={{backgroundColor:
                                    index === selectCommentIdx ?
                                    selectCommnetColor: null,}}                                     
                                > 
                                    {
                                        index === selectCommentIdx ?
                                        <>
                                        <textarea name="modifyArea" cols="200" rows="5" value={uModify} onChange={txtModifyHandler}></textarea>
                                        <button onClick={modifyBtnHandler}>modify</button>
                                            
                                        </>
                                        :
                                        <>
                                            <span className="id">{`${comments.id} `}</span>
                                            <span className="comment">{`${comments.comment}`}</span>
                                            <span className="time">{`${comments.time}`}</span>
                                            {
                                                getLoginSessionID() === comments.id?
                                                <span className="btn">
                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <button onClick={(e) => commentModifyBtnHandler(e, comments.id, index, comments.comment)}>
                                                        Modify
                                                    </button>&nbsp;&nbsp;
                                                    <button onClick={(e) => commentDeleteBtnHandler(e, comments.id, index)}>
                                                        Delete
                                                    </button>
                                                </span>
                                                :
                                                null
                                            }
                                        </>
                                        
                                    }
                                </li>
                            ))
                            }                           
                        </ul>
                        <div className="page">

                        </div>
                    </div>
                </div>                
            </div>
        </div>
    );
}

export default Modal;