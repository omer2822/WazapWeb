import React from "react";
function ReceivedMessageItem({message}) {

    return (
        <>

            <div className="row g-0">
                <div className="col-md-3">
                    <div className="chat-bubble">
                        {message.content}
                    </div>
                </div>
            </div>

        </>

    );

}

export default ReceivedMessageItem;