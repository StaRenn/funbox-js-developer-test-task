import React from 'react';
import "./style.css"
import RoutesList from "../../components/RoutesList";
import YandexMapsContainer from "../../components/YandexMapsContainer";
import {YMaps} from "react-yandex-maps";

function MainPage() {
    return (
        <div className={"main-page-wrapper"}>
            <RoutesList />
            <YMaps>
                <YandexMapsContainer/>
            </YMaps>
        </div>
    );
}

export default MainPage;