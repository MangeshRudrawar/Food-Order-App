import MealForm from './MealForm';
import { useContext } from 'react';
import classes from './MealItem.module.css';
import CartContext from '../../store/cart-context';
const MealItem=(props)=>{
    const cartctx=useContext(CartContext);
    const price=`${props.price} Rupees`;

    const addToCartHandler=(amount)=>{
        cartctx.addItem({
            id:props.id,
            name: props.name,
            amount:amount,
            price:props.price
        });
    };
    return(
    <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price} </div>
        </div>
        <div>
            <MealForm id={props.id} onAddToCart={addToCartHandler}></MealForm>
        </div>

    </li>);

};
export default MealItem;