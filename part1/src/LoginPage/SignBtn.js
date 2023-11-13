import React from "react";

function SignBtn({ onClick }) {

  return (
    <>
      <br /> <br />
      <button type="button" onClick={onClick} className="btn" id="SignInButton">
        Sign in
      </button>
    </>
  );
}

export default SignBtn;
