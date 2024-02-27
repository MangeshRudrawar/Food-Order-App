import CartContext from "./cart-context";
import { useReducer } from "react";
const defaultState={
    items:[],
    totalAmount:0

};
const CartReducer =(state,action)=>{
    if(action.type==='ADD'){
        const updatedTotal=state.totalAmount+action.item.price * action.item.amount;
        const existingItemIndex=state.items.findIndex(
            (item)=> item.id === action.item.id
            );
        const existingItem= state.items[existingItemIndex];
        
        
        let updatedItemFinal;

        if(existingItem){
            let totalItemsUpdated;
            
            totalItemsUpdated={
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            };
            updatedItemFinal=[...state.items];
            updatedItemFinal[existingItemIndex]=totalItemsUpdated;

        }
        else{
            updatedItemFinal=state.items.concat(action.item);
        }
        
        
        
        return{
            items:updatedItemFinal,
            totalAmount:updatedTotal,
        };
    };
    if(action.type==='REMOVE'){
        const existingItemIndex= state.items.findIndex(
            (item)=> item.id === action.id
            );
        const existingItem=state.items[existingItemIndex];
        const updatedTotal=state.totalAmount-existingItem.price;

        let updatedItemFinal;
        if(existingItem.amount===1){
            updatedItemFinal=state.items.filter(item => item.id!==action.id);
        }
        else{
            const updated={...existingItem, amount: existingItem.amount-1};
            updatedItemFinal=[...state.items];
            updatedItemFinal[existingItemIndex]=updated;
        }
        return{
            items:updatedItemFinal,
            totalAmount: updatedTotal

        };

    }
    if(action.type === 'CLEAR'){
        return defaultState;
    };
    return defaultState;
    
};


const CartProvider=(props)=>{
    const [cartState, cartAction]=useReducer(CartReducer, defaultState);
    const addToCart=(item)=>{
        cartAction({type: 'ADD', item:item});

    };
    const removeFromCart=(id)=>{
        cartAction({type:'REMOVE',id:id});

    };
    const clearCartHandler=()=>{
        cartAction({type:'CLEAR'});
    }

    const CartCon ={
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addToCart ,
        removeItem: removeFromCart,
        clearCart: clearCartHandler

    };
    return<CartContext.Provider value={CartCon}>
        {props.children}
    </CartContext.Provider>

};

export default CartProvider;