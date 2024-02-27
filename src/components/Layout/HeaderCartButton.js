import React from "react";
import { useContext , useEffect,useState} from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from './HeaderCartButton.module.css';
const HeaderCartButton=(props)=>{
    const[high, setHigh]=useState(false);
    const cartCtx= useContext(CartContext);
    const{items}=cartCtx;
    const ItemCount=items.reduce((curNum, onitem)=>
    {
        return curNum + onitem.amount;
    },0);
    
    const btn=`${classes.button} ${high? classes.bump:''}`;
    useEffect(()=>{
        if(items.length===0){
            return;

        }
        setHigh(true);
        const timer=setTimeout(()=>{
            setHigh(false);

        },300);
        return()=>{
            clearTimeout(timer);
        };

    },[items]);


    return<button className={btn} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon></CartIcon>
        </span>
        <span>My Cart</span>
        <span className={classes.badge}>{ItemCount}</span>
    </button>
};

export default HeaderCartButton;