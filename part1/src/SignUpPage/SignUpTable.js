import DisplayName from "./DisplayName";
import OpenMessege1 from "./OpenMessege1";
import Password from "./Password";
import Picture from "./Picture";
import RegBtn from "./RegBtn";
import Username from "./Username";
import React, { useRef, useState } from "react";

function SignUpTable({ handleSignUp }) {

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const displaynameRef = useRef(null);
    const [ picDemo, setPicDemo ] = useState("./images/demoPic.jpg");

    //Convert the Image into a Base64 String
    //Images from the local file system
    /*function encodeImageFileAsURL(element) {
        return new Promise((resolve, reject) => {
            const file = element.files[0];
            const reader = new FileReader();

            reader.onloadend = function () {
                resolve(reader.result);
            };

            reader.onerror = function (error) {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    }*/

    async function RegForm() {

        const InputEmail = emailRef.current.value;
        const InputPassword = passwordRef.current.value;
        const Inputdisplayname = displaynameRef.current.value;

        {/*<!-- Checks -->*/ }

        {/*<!-- Check if the  length of the Email and Password is minimum 8 characters  -->*/ }
        if (InputEmail.length < 8 || InputPassword.length < 8) {
            alert("Email and Password should be minimum 8 characters");
            return
        }

        {/*<!-- Check if the email contain @ -->*/ }
        if (!InputEmail.includes("@")) {
            alert("Username(Email) must contain @");
            return
        }

        {/*<!-- Check if the password contain numbers-->*/ }
        if (!/[0-9]/.test(InputPassword)) {
            alert("Password must contain numbers")
            return
        }

        {/*<!-- Check if the password contain alphaber charcters-->*/ }
        if (!/[a-z]/.test(InputPassword)) {
            if (!/[A-Z]/.test(InputPassword)) {
                alert("Password must contain alphaber charcters")
                return
            }
        }

        //Call to Server with details of registration
        await reg();

        async function reg() {
            const data = {
                username: InputEmail,
                password: InputPassword,
                displayName: Inputdisplayname,
                profilePic: picDemo
            };

            try {
                const res = await fetch('http://localhost:5000/api/Users', {
                    'method': 'post',
                    'headers': {
                        'Content-Type': 'application/json',
                    },
                    'body': JSON.stringify(data)
                })

                const flag = await res.text();

                if (!flag) {
                    alert("Username already exists");
                    return;
                  }

            } catch (error) {
                console.error('Error:', error);
            }

            handleSignUp()

        }



    }



    return (
        <>

            {/* <Landscape1 /> */}

            <div className="container-xxl" id="SignupContainer">

                <div className="col" id="SignupForm">

                    <OpenMessege1 handleSignUp={handleSignUp} />

                    <Username emailRef={emailRef} />

                    <Password passwordRef={passwordRef} />

                    <Picture setPicDemo={setPicDemo} picDemo={picDemo} />

                    <DisplayName displaynameRef={displaynameRef} />

                    <RegBtn onClick={RegForm} />


                </div>

            </div>

        </>
    );

}




export default SignUpTable;