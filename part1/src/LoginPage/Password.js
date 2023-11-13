import React from "react";

function Password({ passwordRef }) {
  return (
    <>
      <div className="row">
        <div className="col" id="text4">
          Password
        </div>
      </div>

      <div id="inputPassword">
        <input type="password" ref={passwordRef} id="Password"></input>
      </div>
    </>
  );
}

export default Password;
