import React from 'react';

function Username({ emailRef }) {

    return (
        <>
            <div className="row">
            <div className="col">
                Username
            </div>
            </div>

            <input ref={emailRef} id="Username"></input>
        </>

    );
}

export default Username;