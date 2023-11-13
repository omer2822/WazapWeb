import React from 'react';

function RegBtn({ onClick }) {

    return(
    <>
        <button type="button" onClick={onClick} className="btn" id="RegisterButton">Register</button>

    </>
    );

}

export default RegBtn;