import React,{useState} from 'react';
import './App.css';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/cartProvider';

function App() {
  const[shown, setShown]=useState(false);

  const show=()=>{
    setShown(true);
  };
  const hide=()=>{
    setShown(false);
    
  };
  return (
    <CartProvider>
      {shown && <Cart onClose={hide}></Cart>}
      <Header onShowCart={show}/>
      <main>
        <Meals></Meals>
      </main>
      <p className='para'>...THE END...</p>
    </CartProvider>
  );
};

export default App;
