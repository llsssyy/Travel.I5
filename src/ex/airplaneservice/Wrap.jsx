import React from "react";              // react의 모든 문서는 시작할때 import React로 리액트를 임포트 시켜줘야함!
import MenuBar from "./MenuBar";        // 컴포넌트를 불러오는 과정에서 자동완성(엔터)을 하면 자동으로 import됨! 안되면 수동으로 해주기
import './index.css';                   // css를 import해준 것! 가장 부모 컴포넌트에만 import해주면 됨!

const Wrap = () => {
 
    return (                                                                // return 문의 안쪽은 화면에 직접적으로 렌더링 되는 부분임!! 그러므로 hook이나 handler는 리턴 문 밖에 달기 (보통 리턴문 위쪽에다 씀)
    
        <div id="wrap">
           <MenuBar />                                                      {/* wrap이라는 div안에 MenuBar 컴포넌트 불러왔음! */}
        </div>
    );
}

export default Wrap;                    // 이 문서에서 default(기본적으로) Wrap 함수의 값을 export 해준다. 보통 그래서 모든것을 담고 있는 함수를 적어줌.