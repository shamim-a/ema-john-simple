import React from 'react';
import './Product.css'
const Product = (props) => {
    console.log(props.product)
    const {img, name, seller, price, stock} = props.product;
    return (
        <div className = "product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h3 className = "product-name">{name}</h3>
                <br/>
                <p><small>by: {seller}</small> </p>
                <p>Price: {price}</p>
                <p><small>Only {stock} left in stock - Order soon</small></p>
                <button className = "cart-button">add to cart</button>
            </div>
            
        </div>
    );
};

export default Product;