import React, {useEffect, useState} from 'react';
import {Map, Placemark, Polyline, ZoomControl} from "react-yandex-maps";
import "./style.css"
import {useDispatch, useSelector} from "react-redux";
import {removeError, replaceRoute, yandexMapsLoaded} from "../../AC";

function YandexMapsContainer() {
    const [ymaps, setYmaps] = useState(null);
    const [ymapsRef, setYmapsRef] = useState(null);
    const [placeMarks, setPlaceMarks] = useState([]);
    const {routes, order, loading, center, error} = useSelector(state => state.routes);
    const dispatch = useDispatch();

    const handleDrag = (id) => (ev) => {
        dispatch(replaceRoute(id, ev.originalEvent.target.geometry._coordinates))
    }

    useEffect(() => {
        if(error){
            setTimeout(() => dispatch(removeError()), 2500);
        }
    }, [error])

    useEffect(() => {
        if (loading) return
        ymapsRef.setCenter(center, 8, {duration: 200})
    },[center])

    useEffect(() => {
        if(ymaps){
            setPlaceMarks(order.map((id) => {
                return (
                    <Placemark
                        geometry={routes.get(id).latitude}
                        options={{draggable: true}}
                        onDragEnd={handleDrag(id)}
                        properties={{balloonContent: routes.get(id).location}}
                        modules={['geoObject.addon.balloon']}
                    />)
            }))
        }
    }, [ymaps, routes])

    return (
        <div className={"yandex-map-wrapper"}>
            {error && <p className={"modal-error"}>{error}</p>}
            <Map
                onLoad={(api) => {
                    setYmaps(api)
                    dispatch(yandexMapsLoaded())
                }}
                width={"100vw"}
                height={"100vh"}
                defaultState={{center: center, zoom: 9,}}
                instanceRef={(ref) => setYmapsRef(ref)}
            >
                <ZoomControl options={{ float: 'right' }} />
                {placeMarks}
                {order.size > 1 && <Polyline geometry={order.map(id => routes.get(id).latitude).toArray()}/>}
            </Map>
        </div>
    );
}

export default YandexMapsContainer;