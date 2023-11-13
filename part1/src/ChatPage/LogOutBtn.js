import React from 'react';

function LogOutBtn({handleLogout}) {

    return (


        <span className="settings-tray--right">
            <i onClick={handleLogout} id="logout-btn" className="bi bi-x-lg"></i>
        </span>

    );

}


export default LogOutBtn