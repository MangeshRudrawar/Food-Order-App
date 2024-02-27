import classes from './Checkout.module.css';
import { useRef, useState } from 'react';

const isEmpty =(value)=>value.trim() ==='';
const isFiveChars=(value)=>value.trim().length===6;

const Checkout = (props) => {
  const [formInpVal, setformInputVal]=useState({
    name:true,
    street:true,
    postal:true,
    city:true,
  });
  const nameRef=useRef();
  const streetRef=useRef();
  const postalRef=useRef();
  const cityRef=useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName= nameRef.current.value;
    const enteredStreet= streetRef.current.value;
    const enteredPostal= postalRef.current.value;
    const cityName= cityRef.current.value;

    const NameIsValid=!isEmpty(enteredName);
    const streetIsvalid=!isEmpty(enteredStreet);
    const cityIsValid=!isEmpty(cityName);
    const postalIsValid=isFiveChars(enteredPostal);

    setformInputVal({
      name:NameIsValid,
      street: streetIsvalid,
      city:cityIsValid,
      postal:postalIsValid,
    });

    const formValidity= NameIsValid && streetIsvalid && cityIsValid && postalIsValid;

    if(!formValidity){
      return;

    }
    props.onConfirm({
      name:enteredName,
      street:enteredStreet,
      postal:enteredPostal,
      city:cityName
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInpVal.name ? '':classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef}/>
        {!formInpVal.name && <p>Enter a Valid Name!</p>}
      </div>
      <div className={`${classes.control} ${formInpVal.street ? '':classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetRef} />
        {!formInpVal.street && <p>Enter a Valid Street!</p>}
      </div>
      <div className={`${classes.control} ${formInpVal.postal ? '':classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalRef}/>
        {!formInpVal.postal && <p>Enter a Valid Postal Code!</p>}
      </div>
      <div className={`${classes.control} ${formInpVal.city ? '':classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef}/>
        {!formInpVal.city && <p>Enter a Valid City!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;