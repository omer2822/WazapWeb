import React from 'react';

function Password({ passwordRef }) {

    return (
        <>

            <div className="row">
                <div className="col">
                    Password
                </div>
            </div>
            
            <input type='text' ref={passwordRef} id="Password"></input>
        </>

    );

}

export default Password;