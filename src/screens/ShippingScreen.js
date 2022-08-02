import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const nagivateTo = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  //below states keep same name as backend order model.shippingAddress
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postCode, setPostCode] = useState(shippingAddress.postCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  //form event handler
  const addressHandler = (e) => setAddress(e.target.value);
  const cityHandler = (e) => setCity(e.target.value);
  const postCodeHandler = (e) => setPostCode(e.target.value);
  const countryHandler = (e) => setCountry(e.target.value);
  const sumbitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postCode, country }));
    nagivateTo("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={sumbitHandler}>
        {/* user shipping address input */}
        <Form.Group controlId="address">
          <Form.Label className="text-primary">Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please Enter Your Address"
            onChange={addressHandler}
            value={address}
            autoComplete="on"
          ></Form.Control>
        </Form.Group>
        {/* user shipping city input */}
        <Form.Group controlId="city" className="my-2">
          <Form.Label className="text-primary">City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please Enter Your City"
            onChange={cityHandler}
            value={city}
            autoComplete="on"
            // className={`form-control ${city ? "is-valid" : "is-invalid"}`}
          ></Form.Control>
        </Form.Group>
        {/* user shipping postcode input */}
        <Form.Group controlId="postCode" className="my-2">
          <Form.Label className="text-primary">Postcode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please Enter Your Postcode"
            onChange={postCodeHandler}
            value={postCode}
            autoComplete="on"
          ></Form.Control>
        </Form.Group>
        {/* user shipping country input */}
        <Form.Group controlId="country" className="my-2">
          <Form.Label className="text-primary">Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Please Enter Your Country"
            onChange={countryHandler}
            value={country}
            autoComplete="on"
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
