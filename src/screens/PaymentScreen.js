import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const nagivateTo = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  //if there is no shipping address,then redirect to shipping, which means users need to complere shipping address from even they don't order specialty.
  if (!shippingAddress) {
    nagivateTo("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  //form event handler
  const paymentHandler = (e) => setPaymentMethod(e.target.value);
  const sumbitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    nagivateTo("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Methods</h1>
      <Form onSubmit={sumbitHandler}>
        {/* payment method Checkbox Radio */}
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              onChange={paymentHandler}
            ></Form.Check>
            {/* <Form.Check
              type="radio"
              label="Stripe(still working on it)"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              onChange={paymentHandler}
            ></Form.Check> */}
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
