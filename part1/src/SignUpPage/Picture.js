import React, { useRef } from 'react';


function Picture({ setPicDemo, picDemo }) {

    const picRef = useRef("./images/demoPic.jpg");

    const handleFileChange = async (event) => {
        const file = await event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = () => {
          const imageDataUrl = reader.result;
          setPicDemo(imageDataUrl);
        };
    
        if (file) {
          reader.readAsDataURL(file);
        }
      };

    return (

        <>

            <div className='row' id="picture"> 
                <input ref={picRef} type="file" id="pictureTitle" name="namefile" onChange={handleFileChange}></input>
            </div>
        
                <img src={picDemo} className="img-fluid" id="demoPic"></img>

        </>

    );

}

export default Picture;