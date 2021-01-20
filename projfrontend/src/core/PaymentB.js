import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { cartEmpty } from "./helper/cartHelper";
import { getmeToken, processPayment } from "./helper/paymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated, signout } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";


const PaymentB = ({ products, reload = undefined, setReload = (f) => f }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated && isAuthenticated().user.id;
  const token = isAuthenticated && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({
          ...info,
          error: info.error,
        });
        signout(() => {
          return <Redirect to="/" />;
        });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + parseFloat(p.price);
    });
    return amount;
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
        console.log("MYDATA", data);
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
              console.log("POINT-1", response);
            if (response.error) {
              if (response.code == "1") {
                console.log("PAYMENT FAILED!");
                signout(() => {
                  return <Redirect to="/" />;
                });
              }
            } else {
              setInfo({ ...info, success: response.success, loading: false });
              console.log("PAYMENT SUCCESS");
              let product_names = "";
              products.forEach(function (item) {
                product_names += item.name + ", ";
              });
              const orderData = {
                products: product_names,
                transaction_id: response.transaction.id,
                amount: response.transaction.amount,
              };
              createOrder(userId, token, orderData)
                .then((response) => {
                  if (response.error) {
                    if (response.code == "1") {
                      console.log("ORDER FAILED");
                    }
                    signout(() => {
                      return <Redirect to="/" />;
                    });
                  } else {
                    if (response.success == true) {
                      console.log("ORDER PLACED");
                    }
                  }
                })
                .catch((error) => {
                  setInfo({ loading: false, success: false });
                  console.log("ORDER FAILED", error);
                });
              cartEmpty(() => {
                console.log("CART IS EMPTYED OUT");
              });
              setReload(!reload);
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const showbtnDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            ></DropIn>
            <button onClick={onPurchase} className="btn btn-block btn-success">
              Buy Now
            </button>
          </div>
        ) : (
          <h4>Please LogIn First or add something in Cart</h4>
        )}
      </div>
    );
  };

  return (
    <div>
      <h4>Your Bill is : ₹ {getAmount()}</h4>
      {showbtnDropIn()}
    </div>
  );
};

export default PaymentB;
