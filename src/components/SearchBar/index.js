import React, {useState} from 'react';
import "./style.css"
import {useDispatch} from "react-redux";
import {addNewRoute} from "../../AC";

function SearchBar() {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");

    const handleInput = (ev) => {
        setSearchQuery(ev.target.value)
    }

    const handleClick = () => {
        if(searchQuery){
            dispatch(addNewRoute(searchQuery))
        }
    }

    return (
        <div className={"search-bar"}>
            <input onChange={handleInput} value={searchQuery} className={"search-bar__input"}/>
            <button onClick={handleClick} className={"search-bar__submit"}>+</button>
        </div>
    );
}

export default SearchBar;