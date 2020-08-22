import React, {useState} from 'react';
import "./style.css"
import {useDispatch} from "react-redux";
import {addNewRoute} from "../../AC";

function SearchBar() {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");

    const handleKeyDown = (ev) => {
        if(ev.key === "Enter"){
            handleAddNewRoute();
        }
    }

    const handleInput = (ev) => {
        setSearchQuery(ev.target.value);
    }

    const handleAddNewRoute = () => {
        if(searchQuery){
            dispatch(addNewRoute(searchQuery));
        }
    }

    return (
        <div className={"search-bar"}>
            <input onKeyDown={handleKeyDown} onChange={handleInput} value={searchQuery} className={"search-bar__input"}/>
            <button onClick={handleAddNewRoute} className={"action-button"}>+</button>
        </div>
    );
}

export default SearchBar;