import React from 'react';
import { useRef } from 'react'


function AddContact({addChat}) {

    /*function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }*/

    const textBox = useRef(null);

    const newChat = function () {
        const username = textBox.current.value;
        if (username !== "") {
            //const imgNum = getRandomInt(2, 10).toString();
            //const img = "./images/image" + imgNum + ".jpg";
            addChat(username);
        }
    }


    return (

        <>

            <div className="modal fade" id="addContact" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Add new chat</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input ref={textBox} type="text" placeholder="Contact's identifier"></input>
                        </div>
                        <div className="modal-footer">
                            <button onClick={newChat} id="add-contact-btn" type="button" className="btn" data-bs-dismiss="modal">Add</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AddContact;
