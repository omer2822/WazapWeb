import React from 'react';

function SentMessageItem({message}) {

    return (
        <>

            <div className="row g-0  offset-md-9">
                <div className="col-md-3">
                    <div className="chat-bubble">
                        {message.content}
                    </div>
                </div>
            </div>

        </>

    );

}

export default SentMessageItem;