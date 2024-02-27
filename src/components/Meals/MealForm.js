import classes from './MealForm.module.css';
import { useRef, useState } from 'react';
import Input from '../UI/Input';
const MealForm=(porps)=>{
    const[amountIsValid, setAmountIsValid]=useState(true);
    const amountRef=useRef();
    const submitHandler=(event)=>{
        event.preventDefault();

        const entredAmount=amountRef.current.value;
        const conversion= +entredAmount;

        if(
            entredAmount.trim().length === 0 || conversion<1 || conversion>5
        ){
            setAmountIsValid(false);
            return;
        }
        porps.onAddToCart(conversion);

    };
    return <form className={classes.form} onSubmit={submitHandler}>
        <Input
        ref={amountRef}
         label="Amount" input={{
            id:"amount_"+porps.id,
            type:'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue:'1'
        }}></Input>
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter Valid Input</p>}

         
    </form>

};
export default MealForm;