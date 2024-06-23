import React, { useState } from "react";
import Home from "./Home";
import Reservation from "./Reservation";
import ReservationList from "./ReservationList";
import SignUp from "./SignUp";
import SignIn from "./SignIn";                          // 컴포넌트 불러올때 자동완성 시키면 저절로 임포트됨! 안되면 수동으로 입력하기

const MenuBar = () => {

    // 비구조할당
    // 구조파괴할당
    // hook
    const [isHome, setIsHome] = useState(true);                 // true or false , string이나 숫자, boolean 값도 넣을 수 있음!
    const [isSignUp, setIsSignUp] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);
    const [isReservation, setIsReservation] = useState(false);
    const [isReservationList, setReservationList] = useState(false);

    // handler
    const homeClickHandler = () => {
        console.log('homeClickHandler() CALLED!!');

        setIsHome(true);                                // home버튼을 클릭하면 setIsHome만 true가 되서 홈화면만 보임!
        setIsSignUp(false);                             // 102번줄 참조
        setIsSignIn(false);
        setIsReservation(false);
        setReservationList(false);

    }

    const signUpClickHandler = () => {
        console.log('signUpClickHandler() CALLED!!');

        setIsHome(false);                               // signUp버튼을 클릭하면 setIsSignUp만 true가 되서 회원가입화면만 보임!
        setIsSignUp(true);                              // 109번줄 참조
        setIsSignIn(false);
        setIsReservation(false);
        setReservationList(false);

    }

    const signInClickHandler = () => {
        console.log('signInClickHandler() CALLED!!');

        setIsHome(false);                               // signIn버튼을 클릭하면 setIsSignIn만 true가 되서 로그인화면만 보임!
        setIsSignUp(false);                             // 122번줄 참조
        setIsSignIn(true);
        setIsReservation(false);
        setReservationList(false);

    }

    const signOutClickHandler = () => {
        console.log('signOutClickHandler() CALLED!!');

        setIsHome(false);                               // signOut버튼을 클릭하면 setIsSignIn만 true가 되서 로그인화면만 보임! (로그아웃 화면에서 어떻게 보여야 하는지 정해서 그렇게하기)
        setIsSignUp(false);                             // signOut화면은 아직 구현 안했음!
        setIsSignIn(true);
        setIsReservation(false);
        setReservationList(false);

    }

    const reservationClickHandler = () => {
        console.log('reservationClickHandler() CALLED!!');

        setIsHome(false);                               // reservation버튼을 클릭하면 setIsReservation만 true가 되서 예약화면만 보임!
        setIsSignUp(false);                             // 135번줄 참조
        setIsSignIn(false);
        setIsReservation(true);
        setReservationList(false);

    }

    const reservationListClickHandler = () => {
        console.log('reservationListClickHandler() CALLED!!');

        setIsHome(false);                               // reservationList버튼을 클릭하면 setIsreservationList만 true가 되서 예약리스트화면만 보임!
        setIsSignUp(false);                             // 142번줄 참조
        setIsSignIn(false);
        setIsReservation(false);
        setReservationList(true);

    }

    return (
        <>
            <div>
                <a href="#none" onClick={homeClickHandler}>HOME</a>                                     {/* HOME버튼에 homeClickHandler 달아줌! */}
                &nbsp;&nbsp; | &nbsp;&nbsp;                 
                <a href="#none" onClick={signUpClickHandler}>SIGN-UP</a>                                {/* SIGN-UP버튼에 signUpClickHandler 달아줌! */}
                &nbsp;&nbsp; | &nbsp;&nbsp;                 
                <a href="#none" onClick={signInClickHandler}>SIGN-IN</a>                                {/* SIGN-IN버튼에 signInClickHandler 달아줌! */}
                &nbsp;&nbsp; | &nbsp;&nbsp;                 
                <a href="#none" onClick={signOutClickHandler}>SIGN-OUT</a>                              {/* SIGN-OUT버튼에 signOutClickHandler 달아줌! */}
                &nbsp;&nbsp; | &nbsp;&nbsp;                 
                <a href="#none" onClick={reservationClickHandler}>RESERVATION</a>                       {/* RESERVATION버튼에 reservationClickHandler 달아줌! */}
                &nbsp;&nbsp; | &nbsp;&nbsp;
                <a href="#none" onClick={reservationListClickHandler}>RESERVATION-LIST</a>              {/* RESERVATION-LIST버튼에 reservationListClickHandler 달아줌! */}
            </div>
            {
                isHome                                                          // isHome이 true이면 Home 컴포넌트 실행(HOME버튼 클릭하면 setIsHome이 true로 바뀌게 설정해놓았음.)
                    ?                                                           // isHome 기본값 = true; 새로고침했을때 Home 컴포넌트가 보이게 하기 위해서)
                    <Home />
                    :
                    null
            }
            {
                isSignUp
                    ?
                    <SignUp                                                     // isSignUp이 true이면 SignUp 컴포넌트 실행(SIGN-UP 버튼 클릭하면 setIsSignUp true로 바뀌게 설정해놓았음.)
                        homeViewer={setIsHome}                                  // SignUp 컴포넌트 안에서 Wrap에서 선언한 Hook들의 값을 바꾸어주기 위해서 자식에게 내려줌!
                        signUpViewer={setIsSignUp}                              
                        signInViewer={setIsSignIn}
                        reservationViewer={setIsReservation}
                        reservationListViewer={setReservationList}
                    />
                    :
                    null
            }
            {
                isSignIn
                    ?
                    <SignIn                                                     // isSignIn이 true이면 SignIn 컴포넌트 실행(SIGN-IN 버튼 클릭하면 setIsSignUp true로 바뀌게 설정해놓았음.)
                    homeViewer={setIsHome}                                      // SignIn 컴포넌트 안에서 Wrap에서 선언한 Hook들의 값을 바꾸어주기 위해서 자식에게 내려줌!
                    signUpViewer={setIsSignUp}
                    signInViewer={setIsSignIn}
                    reservationViewer={setIsReservation}
                    reservationListViewer={setReservationList}
                    />
                    :
                    null
            }
            {
                isReservation                                                   // isReservation이 true이면 Reservation 컴포넌트 실행(RESERVATION 버튼 클릭하면 setIsReservation true로 바뀌게 설정해놓았음.)
                    ?
                    <Reservation 
                    homeViewer={setIsHome}                                      // SignIn 컴포넌트 안에서 Wrap에서 선언한 Hook들의 값을 바꾸어주기 위해서 자식에게 내려줌!
                    signUpViewer={setIsSignUp}
                    signInViewer={setIsSignIn}
                    reservationViewer={setIsReservation}
                    reservationListViewer={setReservationList}
                    />
                    :
                    null
            }
            {
                isReservationList                                                // isReservationList이 true이면 ReservationList 컴포넌트 실행(RESERVATION-LIST 버튼 클릭하면 setReservationList true로 바뀌게 설정해놓았음.)
                    ?
                    <ReservationList />
                    :
                    null
            }
        </>
    );
}

export default MenuBar;