import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
const Shop = () => {

    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([])

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const previousKey = productKeys.map(pdkey => {
            const product = fakeData.find(pd => pd.key === pdkey);
            product.quantity = savedCart[pdkey];
            return product; 
        })
        setCart(previousKey)
    }, [])

    const handleAddProduct = (product)=>{
        // console.log("Product Added", product)
        const toBeaddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeaddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity +1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeaddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1
            newCart = [...cart, product];
        }
        setCart(newCart)
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className = "shop-container">
            <div className ="products-container">
                <ul>
                    {
                        products.map(pd => <Product
                            key = {pd.key}
                            showAddToCart = {true}
                            handleAddProduct = {handleAddProduct} 
                            product = {pd}>
                        </Product>)
                    }
                </ul>
            </div>

            <div className ="cart-container">
                <Cart cartItems= {cart}>
                <Link to ="/review">
                <button className = "cart-button1">
                    <FontAwesomeIcon icon={faShoppingCart} /> Review Orders
                </button>
            </Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop