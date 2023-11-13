import React from 'react';

function UserDetails({user}) {

    return (
        <>
            <div className="settings-tray">
                <img className="profile-image" src={user.profilePic}></img>
                <h6>{user.displayName}</h6>
                <span className="settings-tray--right">
                    <i  className="bi-person-plus" data-bs-toggle="modal" data-bs-target="#addContact"></i>
                </span>
            </div>
        </>

    );

}

export default UserDetails



