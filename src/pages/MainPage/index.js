import React from 'react';
import "./style.css"
import RoutesList from "../../components/RoutesList";

function MainPage() {
    return (
        <div className={"main-page-wrapper"}>
            <RoutesList />
        </div>
    );
}

export default MainPage;