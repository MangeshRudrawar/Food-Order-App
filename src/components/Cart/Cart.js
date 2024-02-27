import classes from './Cart.module.css';
import { useContext,useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import React from 'react';
const Cart=(props)=>{
    const [ischeckOut,setCheckout]=useState(false);
    const[isSubmitting, setIsSubmitting]=useState(false);
    const[submitted, setSubmitted]=useState(false);
    const ctx=useContext(CartContext);
    const totalBill=ctx.totalAmount;
    const hasItems=ctx.items.length>0;

    const RemoveHandler=(id)=>{
        ctx.removeItem(id);

    };
    const AddHandler=(item)=>{
         ctx.addItem({...item,amount:1});
        

    };
    const orderHandler=()=>{
        setCheckout(true);
    };
    const submitOrderHandler=async(userData)=>{
        setIsSubmitting(true);
        await fetch('https://food-app-database-d644d-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body: JSON.stringify({
                user:userData,
                orderdItems:ctx.items
            })
        });
        setIsSubmitting(false);
        setSubmitted(true);
        ctx.clearCart();
    };

    const cartItems=(
        <ul className={classes['cart-items']}>
            {ctx.items.map((item)=>(
            <CartItem 
            key={item.id} 
            name={item.name} 
            amount={item.amount} 
            price={item.price}
            onRemove={RemoveHandler.bind(null,item.id)}
            onAdd={AddHandler.bind(null,item)}
            >
            </CartItem>
            ))}
        </ul>
        );
    
    const confirmClick =(<div className={classes.actions}>
        <button className={classes['buttonn--alt']} onClick={props.onClose}>Close</button>
        {hasItems && (<button className={classes.button} onClick={orderHandler}>Order</button>)}
        </div>
        );

    const cartModalContent=
    <React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalBill}</span>
        </div>
        {ischeckOut && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
        {!ischeckOut && confirmClick }
    </React.Fragment>

    const isSubmittingModalConetnt =<p>Submitting Your Order...</p>;

    const submittedModalConetnt=<React.Fragment>
        <p className={classes.finalScreen}>✌️ YAY!! ✌️</p> 
        <p className={classes.finalScreen}>ORDER RECEIVED🥳..THANK YOU🙏</p> 
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose}>
                Close
            </button>
        </div>
    </React.Fragment>
    

    return <Modal onClose={props.onClose}>
        {!isSubmitting && !submitted && cartModalContent}
        {isSubmitting && isSubmittingModalConetnt}
        {!isSubmitting && submitted && submittedModalConetnt}
        </Modal>

};
export default Cart;
