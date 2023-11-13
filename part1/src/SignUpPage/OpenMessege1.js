import React from 'react';

function OpenMessege1({ handleSignUp }) {

    return (
        <>

            <div className="row">
                <div className="col" id="text1">
                    Sign Up
                </div>
            </div>

            <div className="row textBox">
                <div className="col" id="text2">
                    Already registered? <b id="text2-1"> <a onClick={handleSignUp} type='button'>Login</a></b>
                </div>
            </div>


        </>
    );
}

export default OpenMessege1;