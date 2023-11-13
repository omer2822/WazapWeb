import React from 'react';

function DisplayName({ displaynameRef }) {

    return (
        <>
            <div className="row">
                <div className="col">
                    DisplayName
                </div>
            </div>
            
            <input type='text' ref={displaynameRef} id="DisplayName"></input>
            <br></br>

        </>

    );

}
export default DisplayName;