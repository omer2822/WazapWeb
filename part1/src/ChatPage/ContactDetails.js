import React from 'react';
import defaultImg from './default.png';

function ContactDetails({contact}) {

    if (contact.length == 0) {
        contact = { user: { displayName: "Welcome to WebChat!", profilePic: defaultImg } };
    }

    return (
        <>
            <img className="profile-image" src={ contact.user.profilePic }></img>
            <h6>{ contact.user.displayName }</h6>

        </>
    );

}

export default ContactDetails