import React from "react";
import Menubar from './Menubar';

import './style/common.css'
import './style/wrap.css'

const Wrap = () => {
    return (
        <div>
            <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: '1.3em', padding: '10px', margin: '15px'}}>
                My memo service.
            </div>
            <Menubar />
        </div>
    );
}

export default Wrap;