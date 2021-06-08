import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItems/ReviewItem';
import './Review.css'
import Thankyou from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false)

    const removeProduct = (productKey) =>{
        // console.log("remove clicked", productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }

    const placeOrderBtn = () =>{
        setCart([]);
        processOrder();
        setOrderPlaced(true);
        // console.log("Order Placed")
    }

    useEffect(()=>{
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        // console.log(cartProducts);
        setCart(cartProducts)
    }, [])

    const thankyou = <img src={Thankyou} alt="" />
    return (
        <div className= "review-container">
            <div className="product-review-container">
                <h1>Remaining to place order items: ({cart.length}) </h1>
                <br />
                {
                    cart.map(pd => <ReviewItem 
                        product = {pd} 
                        key = {pd.key}
                        removeProduct = {removeProduct}
                    ></ReviewItem>)
                }
                {
                    orderPlaced && thankyou
                }
            </div>
            <div className="cart-contianer">
                <Cart cartItems = {cart}>
                    <button 
                    className ="cart-button1"
                    onClick = {placeOrderBtn}
                    >Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;