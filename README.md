## Travel.I5
React를 이용한 여행지 추천 웹페이지 구현 Project

---

![image01.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/4b5586b7-f187-4e65-8bba-cb9af3b94c07/7e16a9ab-dfe4-4af6-9a68-1ba593d839a0/image01.png)

## 1️⃣ 프로젝트 개요

1. **주제:**
    - 국내 **여행자**들을 위한 **여행지 추천 웹사이트** 개발
2. **선정 배경:**
    - “**with 코로나**” 시대에 맞춰 긴 침묵을 깬 **여행 수요**와 함께, 국내 여행자들을 위한 **특별한 경험**을 제안하고 싶었다.
    - 여행자 개개인의 **취향**과 **관심사**에 맞는 **여행지**를 선택하여 **한눈에** 찾아볼 수 있는 웹페이지를 제작 하고 싶었다.
3. **기획 의도:**
    - 여행하는 동안 필요한 **지역 정보**와 **행사**, **계절 관광지 정보**를 제공하여 여행의 불편함을 최소화 하고 즐거운 경험을 할 수 있도록 돕고싶었다.
4. **프로젝트 내용:**
    - **멤버 서비스** 및 여행지 **모달창**, **캐러셀** 기능 구현
5. **활용 방안 및 기대 효과:**
    - 미처 알지 못했던 다양한 **여행지의 정보**를 손쉽게 얻을 수 있다.
    - 사용자들의 **소통**을 이용해 여행지를 느껴볼 수 있다.

## 2️⃣ 프로젝트 구성

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/4b5586b7-f187-4e65-8bba-cb9af3b94c07/a679697b-bbf7-4c23-a3a6-1c5ff915e7a6/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/4b5586b7-f187-4e65-8bba-cb9af3b94c07/411fc14b-292d-4ad4-ab61-8d21e8ac8fd9/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/4b5586b7-f187-4e65-8bba-cb9af3b94c07/4f40e836-55b4-4e52-a46a-fa5c05708379/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/4b5586b7-f187-4e65-8bba-cb9af3b94c07/88972bdd-b2d6-4db6-88c2-b9c51ef14d17/Untitled.png)

## 3️⃣ 핵심기능

### 1. 멤버 서비스

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/4b5586b7-f187-4e65-8bba-cb9af3b94c07/97706ea1-cafa-4009-b084-acf85fbb3976/Untitled.png)

- **회원가입, 회원탈퇴, 정보수정**
    - **local storage**를 이용하여 **회원 DB**를 저장하여 **회원 관리 기능** 구현하였음.
- **로그인** / **로그아웃**

### 2. 유저에게 여행지의 정보를 제공

![image01.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/4b5586b7-f187-4e65-8bba-cb9af3b94c07/7e16a9ab-dfe4-4af6-9a68-1ba593d839a0/image01.png)

![image02.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/4b5586b7-f187-4e65-8bba-cb9af3b94c07/1746748a-7db4-42c2-ad92-7c6713c49029/image02.png)

- **React-Slick** 및 **React-Swiper** 라이브러리를 이용하여 메인 **캐러셀** 및 **지역별** , **테마별** 추천 여행지 **캐러셀** 기능 구현하였음.
- **각각의 여행지**를 클릭 시 **해당 여행지의 정보가 출력** 되게끔 구현하였음.
    - 선택 아이템의 **key값**을 연동하여 해당 여행지의 **정보**가 **모달창**에 출력되게 구현하였음.

### 3. 댓글 작성 기능

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/4b5586b7-f187-4e65-8bba-cb9af3b94c07/202c1a16-efc8-4553-83aa-481b63de79e8/Untitled.png)

- **로그인 한 회원**만 **댓글 작성** 가능. 자신의 댓글 **수정** 및 삭제 **가능**
    - 여행지의 **key값**으로 **코멘트 DB**에 등록되어 있는 **댓글 출력**
    - 댓글의 ID와 로그인한 ID가 **동일할 경우** 댓글 **수정** 및 **삭제** 가능

## 4️⃣ 프로젝트 파일

[react-pjt.7z](https://drive.google.com/file/d/19evBauFEd2Tw9akmvTZhuyOvpFvXAUwP/view?usp=sharing)

[[I5] 프로젝트결과보고서_여행 추천 사이트 제작_v1.5.pptx](https://drive.google.com/file/d/1bdOkrlVNeMQ6faHySP6PFqxaNYK69Ftv/view?usp=sharing)

## 5️⃣ 시연 영상

https://youtu.be/ItNCyZ2bVSU

## 6️⃣ 맡은 역할

- **지역**별 여행지 **컴포넌트** 부분
- **지역**별 여행지 더미 데이터를 이용한 **캐러샐 이미지 컨텐츠 출력** 및 **모달** 연결
- **footer** 구현

## 7️⃣ 프로젝트를 진행하면서 느꼈던 점

- 기존의 **HTML, CSS**와는 달리 **React**를 사용하면서 이미 만들어져 있는 **라이브러리**를 사용하는 것에 익숙하지 않아 프로젝트 초반에 약간의 어려움을 겪었으나, 충분한 사용방법 숙지와 여러 자료들을 취합해 공부 한 결과 **라이브러리**를 사용하는 것에 익숙해져 최종 결과물을 도출 할 수 있었다.
