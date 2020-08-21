import React, {useEffect, useState} from 'react';
import "./style.css"
import SearchBar from "../SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {arrayMove, List} from "react-movable";
import {deleteRoute, setNewRoutesOrder} from "../../AC";

function RoutesList() {
    const {routes, order} = useSelector(state => state.routes)
    const [newOrder, setNewOrder] = useState(order)
    const dispatch = useDispatch();

    const handleClick = (id) => () => {
        dispatch(deleteRoute(id))
    }

    useEffect(() => {
        setNewOrder(order.toArray())
    }, [order])

    useEffect(() => {
        if(newOrder.toString() === order.toArray().toString()) return
        dispatch(setNewRoutesOrder(newOrder))
    }, [newOrder])

    return (
        <div className={"routes-list-wrapper"}>
            <SearchBar/>
            <List
                values={newOrder.map((id) => {
                    return {id: id, location: routes.get(id)}
                })}
                onChange={({ oldIndex, newIndex }) => {
                    setNewOrder(arrayMove(newOrder, oldIndex, newIndex))
                }}
                renderList={({ children, props }) => <ul className={"routes-list"} {...props}>{children}</ul>}
                renderItem={({ value, props }) => {
                    return(
                        <li className={"routes-list__element"} {...props}>
                            <p className={"routes-list__element__destination"}>{value.location}</p>
                            <button className={"search-bar__submit"} onClick={handleClick(value.id)}>-</button>
                        </li>)}
                }
            />
        </div>
    );
}

export default RoutesList;