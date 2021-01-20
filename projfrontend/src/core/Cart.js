import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import PaymentB from "./PaymentB";

const Cart = () => {
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removeFromCart={true}
            addtoCart={false}
            reload={reload}
            setReload={setReload}
          />
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h3>Checkout</h3>
      </div>
    );
  };

  return (
    <Base title="Cart page" description="Welcome to Checkout">
      <div className="row text-center">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No Products</h3>
          )}
        </div>
        <div className="col-6">
          {products.length > 0 ? (
            <PaymentB products={products} setReload={setReload}></PaymentB>
          ) : (
            <h3>Please LogIn or Add something in Cart</h3>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
