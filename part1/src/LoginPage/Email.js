import React from "react";

function Email({ emailRef }) {
  return (
    <>
      <div className="row">
        <div className="col" id="text3">
          Email address
        </div>
      </div>
      <input ref={emailRef} id="EmailAdress"></input>
    </>
  );
}

export default Email;
