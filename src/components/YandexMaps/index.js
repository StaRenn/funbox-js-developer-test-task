import React, {useEffect, useState} from 'react';
import {Map, Placemark, Polyline, YMaps, ZoomControl} from "react-yandex-maps";
import "./style.sass";
import {useDispatch, useSelector} from "react-redux";
import {replaceRoute, setMapCenter, yandexMapsLoaded} from "../../AC";

function YandexMaps() {
    const [ymaps, setYmaps] = useState(null);
    const [ymapsRef, setYmapsRef] = useState(null);
    const [placeMarks, setPlaceMarks] = useState([]);
    const {routes, order, center} = useSelector(state => state.routes);
    const dispatch = useDispatch();

    const handleDrag = (id) => (ev) => {
        dispatch(replaceRoute(id, ev.originalEvent.target.geometry._coordinates))
    }

    //on map drag end set new map center to the state
    useEffect(() => {
        if (!ymapsRef) return
        ymapsRef.events.add("actionend", () => dispatch(setMapCenter(ymapsRef.getCenter())))
    },[ymapsRef])

    //when ymaps loaded and route added/changed it will render/rerender placemarks
    useEffect(() => {
        if(ymaps){
            setPlaceMarks(order.map((id) => {
                return (
                    <Placemark
                        geometry={routes.get(id).coords}
                        options={{draggable: true}}
                        onDragEnd={handleDrag(id)}
                        properties={{balloonContent: routes.get(id).name}}
                        modules={['geoObject.addon.balloon']}
                    />)
            }))
        }
    }, [ymaps, routes])

    return (
        <div className={"yandex-map-wrapper"}>
            <YMaps>
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
                    <ZoomControl options={{ position: {left: "auto", right: 10, top: 108} }} />
                    {placeMarks}
                    {order.size > 1 &&
                        <Polyline
                            geometry={order.map(id => routes.get(id).coords).toArray()}
                            options={{strokeWidth: 4, strokeOpacity: 0.5}}
                        />
                    }
                </Map>
            </YMaps>
        </div>
    );
}

export default YandexMaps;