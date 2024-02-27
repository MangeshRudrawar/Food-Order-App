import React, {Fragment} from 'react';
import backImg from '../../assets/ResImg.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';


const Header=(props)=>{
    return <Fragment>
        <header className={classes.header}>
            <h1>MR's  Restaurant</h1>
            <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
        </header>
        <div className={classes['main-image']}>
            <img src={backImg} alt="Enjoy Ethenic Taste of INDIA"/>
        </div>
    </Fragment>
};

export default Header;