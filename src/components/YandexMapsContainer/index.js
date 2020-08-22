import React, {useEffect, useRef, useState} from 'react';
import {Map, Placemark, Polyline, ZoomControl} from "react-yandex-maps";
import "./style.css"
import {useDispatch, useSelector} from "react-redux";
import {replaceRoute} from "../../AC";

function YandexMapsContainer() {
    const [ymaps, setYmaps] = useState(null);
    const [placeMarks, setPlaceMarks] = useState([]);
    const myMap = useRef(null);
    const {routes, order, loading, center} = useSelector(state => state.routes);
    const dispatch = useDispatch();

    const handleDrag = (id) => (ev) => {
        dispatch(replaceRoute(id, ev.originalEvent.target.geometry._coordinates))
    }

    useEffect(() => {
        console.log(myMap)
    }, [center])

    useEffect(() => {
        if(ymaps && !loading){
            setPlaceMarks(order.map((id) => {
                return <Placemark geometry={routes.get(id).latitude} options={{draggable: true}} onDragEnd={handleDrag(id)}/>
            }))
        }
    }, [ymaps, routes])

    return (
        <div className={"yandex-map-wrapper"}>
            <Map
                ref={myMap}
                onLoad={(api) => setYmaps(api)}
                modules={['geocode']}
                width={"100vw"}
                height={"100vh"}
                defaultState={
                    {
                        center: center,
                        zoom: 9,
                    }
                }
            >
                <ZoomControl options={{ float: 'right' }} />
                {placeMarks}
                {order.size > 1 && <Polyline geometry={order.map(id => routes.get(id).latitude).toArray()}/>}
            </Map>
        </div>
    );
}

export default YandexMapsContainer;