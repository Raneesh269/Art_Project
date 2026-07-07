import React, { useState } from "react";

function CheckoutModal({
  showCheckout,
  setShowCheckout,

  paymentMethod,
  setPaymentMethod,

  totalPrice,

  cart,
  setCart,

  token,

  setShowCart,

  setShowSuccessPopup,
  setSuccessMessage,
  setSuccessSubText,

  loggedInUser,

  showInvalidUpiModal,
  setShowInvalidUpiModal,

  expectedUpi,
  setExpectedUpi,

  cardNumber,
  setCardNumber,

  expiry,
  setExpiry,

  cvv,
  setCvv,
}) {

  const [upiId, setUpiId] = useState("");

  if (!showCheckout) return null;

  return (

    <div className="modal">

      <div className="payment-box">

        {/* CLOSE */}
        <button
          className="close-btn"
          onClick={() =>
            setShowCheckout(false)
          }
        >
          ❌
        </button>

        <h2>
          Choose Payment Method
        </h2>

        {/* PAYMENT OPTIONS */}
        <div className="payment-options">

          <button
            onClick={() =>
              setPaymentMethod("upi")
            }
          >
            📱 UPI
          </button>

          <button
            onClick={() =>
              setPaymentMethod("card")
            }
          >
            💳 Card
          </button>

        </div>

        {/* UPI */}
        {paymentMethod === "upi" && (

          <div className="upi-section">

            <h3>UPI Payment</h3>

            <p>
              Amount: ₹{totalPrice}
            </p>

          <input
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />

          <button
              className="pay-btn"
              onClick={() => {

                const expectedUpi = `${loggedInUser}@upi`;

                if (upiId.trim().toLowerCase() !== expectedUpi.toLowerCase()) {
                  setExpectedUpi(`${loggedInUser}@upi`);

                  setShowInvalidUpiModal(true);

                  return;
                }
                
                fetch(
                  "http://127.0.0.1:8000/api/create-order/",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      items: cart,
                      payment_method: "UPI", 
                    }),
                  }
                )
                .then(() => {

                  setShowCheckout(false);

                  setCart([]);

                  setSuccessMessage(
                    "Payment Successful"
                  );

                  setSuccessSubText(
                    `Paid ₹${totalPrice}`
                  );

                  setShowSuccessPopup(true);

                  setShowCart(false);

                });

              }}
            >
              Pay ₹{totalPrice}
            </button>
          </div>

        )}

        {/* CARD */}
        {paymentMethod === "card" && (

          <div className="card-section">

            <h3>Card Payment</h3>

            <p>
              Amount: ₹{totalPrice}
            </p>

            <input
              type="text"
              placeholder="Card Number"
              maxLength={16}
              value={cardNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setCardNumber(value);
              }}
            />

            <input
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              value={expiry}
              onChange={(e) => {

                let value = e.target.value.replace(/\D/g, "");

                if (value.length >= 3) {
                  value =
                    value.substring(0, 2) +
                    "/" +
                    value.substring(2, 4);
                }

                setExpiry(value);

              }}
            />

            <input
              type="password"
              placeholder="CVV"
              maxLength={3}
              value={cvv}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setCvv(value);
              }}
            />

           <button
              className="pay-btn"
              onClick={() => {

                if (cardNumber.length !== 16) {
                  alert("Card number must contain 16 digits.");
                  return;
                }

                if (!/^\d{2}\/\d{2}$/.test(expiry)) {
                  alert("Expiry date must be in MM/YY format.");
                  return;
                }

                if (cvv.length !== 3) {
                  alert("CVV must contain 3 digits.");
                  return;
                }

                fetch(
                  "http://127.0.0.1:8000/api/create-order/",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      items: cart,
                      payment_method: "Card",
                    }),
                  }
                )
                .then(() => {

                  setShowCheckout(false);

                  setCart([]);

                  setSuccessMessage(
                    "Payment Successful"
                  );

                  setSuccessSubText(
                    `Paid ₹${totalPrice}`
                  );

                  setShowSuccessPopup(true);

                  setShowCart(false);

                });

              }}
            >
              Pay ₹{totalPrice}
            </button>
          </div>

        )}

      </div>

    </div>

  );
}

export default CheckoutModal;