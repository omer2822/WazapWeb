import React, { useRef } from "react";
import Email from "./Email";
import OpenMessege from "./OpenMessege";
import Password from "./Password";
import SignBtn from "./SignBtn";

function LoginTable({ handleLogin, handleNotSignedUp }) {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  var token = useRef(null);
  var username = useRef(null);
  var chats = useRef(null);
  var details = useRef(null);

  async function SignInValid() {

    const InputEmail = emailRef.current.value;
    const InputPassword = passwordRef.current.value;

    /*//{<!-- Check if the Email Valid and Password matched  --> }
      const isEmailAddressExist = LoginList.find(
      (object) => object.emailAddress === InputEmail
    );

    //{<!-- Check if the Email Valid and Password matched  --> }
    const isEPasswordMatch = LoginList.find(
      (object) => object.emailAddress === InputEmail && object.Password === InputPassword
    );*/


    {/*<!-- Check if the  length of the Email and Password is minimum 8 characters  -->*/ }
    if (InputEmail.length < 8 || InputPassword.length < 8) {
      alert("Email and Password should be minimum 8 characters");
      return
    }


    {/*<!-- Check if the email contain @ -->*/ }
    if (!InputEmail.includes("@")) {
      alert("Email must contain @");
      return
    }


    {/*<!-- Check if the password contain numbers-->*/ }
    if (!/[0-9]/.test(InputPassword)) {
      alert("Password must contain numbers")
      return
    }

    {/*<!-- Check if the password contain alphabet charcters-->*/ }
    if (!/[a-z]/.test(InputPassword)) {
      if (!/[A-Z]/.test(InputPassword)) {
        alert("Password must contain alphaber charcters")
        return
      }
    }

    await log(InputEmail, InputPassword);

    if (!token) {
      alert("Invalid username or password");
      return;
    }
    await fetchChats(token);
    if (chats.length > 0) {
      await fetchCurrentChatDetails(chats[0]);
    }

    // instead of user, function returns token and username
    handleLogin(token, username, chats, details);
  }

    //Get token from the server
    async function log(InputEmail, InputPassword) {
      const data = {
        username: InputEmail,
        password: InputPassword
      }
      // extract token from header
      try {
        const res = await fetch('http://localhost:5000/api/Tokens', {
          "method": "post",
          "headers": {
            "Content-Type": "application/json",
          },
          "body": JSON.stringify(data)
        })
        
        token = await res.text();
        username = InputEmail;
      } catch (error) {
        console.error('Error:', error);
      }
    }

    async function fetchChats(token) {
      try {
          const res = await fetch("http://localhost:5000/api/Chats", {
              "method": "get",
              "headers": {
                  "authorization": "Bearer " + token
              }
          })
          chats = await res.json();
      } catch (error) {
          console.error("Error:", error);
          throw error;
      }
  }

  async function fetchCurrentChatDetails(chat) {
    try {
        const res = await fetch("http://localhost:5000/api/Chats/" + chat.id, {
            "method": "get",
            "headers": {
                "authorization": "Bearer " + token
            }
        })
        details = await res.json();
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
} 


  return (
    <>
      { /* <Landscape /> */}

      <div className="container-xxl" id="loginContainer">

        <div className="col" id="loginForm">

          <OpenMessege handleNotSignedUp={handleNotSignedUp} />

          <Email emailRef={emailRef} />

          <Password passwordRef={passwordRef} />

          <SignBtn onClick={SignInValid} />
        </div>

      </div>
    </>
  );

}

export default LoginTable;