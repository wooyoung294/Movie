import React from 'react';
import useOrderStore from "../store/orderStore";
import dash from '../assets/img/dash.svg'
import asc from '../assets/img/caret-up-fill.svg'
import desc from '../assets/img/caret-down-fill.svg'
import './SortBtn.css'
type myBtnType={
    type: "Title" | "Date" | "Average",
    label: string
}
function SortBtn({type, label} : myBtnType) {

    const {orderType,orderBy,setOrder} = useOrderStore()
    const handledOrder = (name: "Title" | "Date" | "Average") => {
        if (orderType !== name) {
            setOrder(name, "ASC");
        } else if (orderBy === "ASC") {
            setOrder(name, "DESC");
        } else if (orderBy === "DESC") {
            setOrder("NONE", "NONE");
        }
    };

    // const isActive = orderType === type;
    const icon = orderType === type ? orderBy === "ASC" ? asc : desc : dash;
    return (
        <button className={'sortBtn'} name={type} onClick={() => handledOrder(type)}>
            {label} <img src={icon} alt={'ORDER'}/>
        </button>
    );
}

export default SortBtn;
