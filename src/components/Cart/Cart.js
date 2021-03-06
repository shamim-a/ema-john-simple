import React from 'react';


import "./Cart.css"
const Cart = (props) => {
    const cart = props.cartItems
    // console.log(cart);
    // const total = cart.reduce((total, prd) => total + prd.price, 0);
    
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
        
    }

    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if (total > 15){
        shipping = 4.99;
    }
    else if (total > 0){
        shipping = 12.99
    }

    const tax = (total/10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    return (
        <div align = "center">
            <h3>Ordered Summary</h3>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: ${total.toFixed(2)}</p>
            <p><small>Shipping Cost: ${shipping}</small></p>
            <p><small>VAT (Inc. Tax: 10%): ${tax}</small></p>
            <p>Total Price: ${grandTotal}</p>
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;