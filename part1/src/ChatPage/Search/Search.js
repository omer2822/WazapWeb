import React from 'react';
import { useRef } from 'react';

function Search({setInput}) {

    const searchBox = useRef(null);

    const search = function () {
        setInput(searchBox.current.value);
    }

    return (
        <>
            <div className="search-box">
                <div className="input-wrapper">
                    <i className="bi-search"></i>
                    <input ref={searchBox} onKeyUp={search} type="text" placeholder="search"></input>
                </div>
            </div>
        </>
    );

}

export default Search;