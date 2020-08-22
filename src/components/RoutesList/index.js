import React from 'react';
import "./style.css"
import SearchBar from "../SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {arrayMove, List} from "react-movable";
import {deleteRoute, setNewRoutesOrder} from "../../AC";

function RoutesList() {
    const {routes, order, loading} = useSelector(state => state.routes)
    const orderArr = order.toArray();
    const dispatch = useDispatch();

    const handleDeleteRoute = (id) => () => {
        if(loading) return
        dispatch(deleteRoute(id))
    }

    return (
        <div className={"routes-list-wrapper"}>
            <SearchBar/>
            <List
                values={orderArr.map((id) => {
                    return {id: id, location: routes.get(id).location}
                })}
                onChange={({ oldIndex, newIndex }) => {
                    dispatch(setNewRoutesOrder(arrayMove(orderArr, oldIndex, newIndex)))
                }}
                renderList={({ children, props }) => <ul className={"routes-list"} {...props}>{children}</ul>}
                renderItem={({ value, props }) => {
                    return(
                        <li className={"routes-list__element"} {...props}>
                            <p className={"routes-list__element__destination"}>{value.location}</p>
                            <button className={"action-button"} onClick={handleDeleteRoute(value.id)}>-</button>
                        </li>)}
                }
            />
        </div>
    );
}

export default RoutesList;