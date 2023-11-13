import React from 'react';

function OpenMessege({handleNotSignedUp}) {

    return(
    <>
       <div className="row">
        <div className="col" id="text1">
            Welcome back!
        </div>
    </div>
    <div className="row">
        <div className="col" id="text2">
            Don’t have an account? <a onClick={handleNotSignedUp} type="button" >Sign up</a>
        </div>
    </div>
    <br/>
    </>
    );
}

export default OpenMessege;