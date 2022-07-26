import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer";
import Message from "../../components/Loading/Message";
import Progresser from "../../components/Loading/Progresser";
import { listFoodDetails } from "../../actions/productActions/foodActions";

const FoodEditScreen = () => {
  //=> for each food details
  const { id } = useParams();
  const foodId = id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const dispatch = useDispatch();

  const foodDetails = useSelector((state) => state.foodDetails);
  const { loading, error, food } = foodDetails;

  useEffect(() => {
    if (!food.name || food._id !== foodId) {
      dispatch(listFoodDetails(foodId));
    } else {
      setName(food.name);
      setPrice(food.price);
      setImage(food.image);
      setCategory(food.category);
      setCountInStock(food.countInStock);
      setDescription(food.description);
      setType(food.type);
    }
  }, [dispatch, foodId, food]);

  //form event handler
  const nameHandler = (e) => setName(e.target.value);
  const priceHandler = (e) => setPrice(e.target.value);
  const imageHandler = (e) => setImage(e.target.value);
  const categoryHandler = (e) => setCategory(e.target.value);
  const countInStockHandler = (e) => setCountInStock(e.target.value);
  const descriptionHandler = (e) => setDescription(e.target.value);
  const typeHandler = (e) => setType(e.target.value);

  const submithandler = (e) => {
    e.preventDefault();
    //update food
  };

  return (
    <>
      <Link
        to="/admin/productlist/food"
        className="btn btn-outline-primary my-3"
      >
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Food</h1>
        {loading ? (
          <Progresser />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submithandler}>
            {/* 1. food name input */}
            <Form.Group controlId="name">
              <Form.Label>Food Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Food Name"
                onChange={nameHandler}
                value={name}
                autoComplete="on"
              ></Form.Control>
            </Form.Group>

            {/* 2. food price input */}
            <Form.Group controlId="price" className="my-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                onChange={priceHandler}
                value={price}
                autoComplete="on"
              ></Form.Control>
            </Form.Group>

            {/* 3. food image input */}
            <Form.Group controlId="image" className="my-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                onChange={imageHandler}
                value={image}
                autoComplete="on"
              ></Form.Control>
            </Form.Group>

            {/* 4. food category input */}
            <Form.Group controlId="category" className="my-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                onChange={categoryHandler}
                value={category}
                autoComplete="on"
              ></Form.Control>
            </Form.Group>

            {/* 5. food countInStock input */}
            <Form.Group controlId="countInStock" className="my-3">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count In Stock"
                onChange={countInStockHandler}
                value={countInStock}
                autoComplete="on"
              ></Form.Control>
            </Form.Group>

            {/* 6. food description input */}
            <Form.Group controlId="description" className="my-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                onChange={descriptionHandler}
                value={description}
                autoComplete="on"
              ></Form.Control>
            </Form.Group>

            {/* 7. food type input */}
            <Form.Group controlId="type">
              <Form.Label>Food Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Food Type"
                onChange={typeHandler}
                value={type}
                autoComplete="on"
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="btn btn-outline-warning"
              className="my-3"
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default FoodEditScreen;
