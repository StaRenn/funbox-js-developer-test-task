import React from 'react';
import "./style.css"
import RoutesList from "../../components/RoutesList";
import YandexMaps from "../../components/YandexMaps";

function MainPage() {
    return (
        <div className={"main-page-wrapper"}>
            <RoutesList />
            <YandexMaps/>
        </div>
    );
}

export default MainPage;