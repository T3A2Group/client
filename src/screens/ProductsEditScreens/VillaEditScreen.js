import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer";
import Message from "../../components/Loading/Message";
import Progresser from "../../components/Loading/Progresser";
import { listVillaDetails } from "../../actions/productActions/villaActions";

const VillaEditScreen = () => {
  //=> for each villa details
  const { id } = useParams();
  const villaId = id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [roomNums, setRoomNums] = useState(0);
  const [maxPeople, setMaxPeople] = useState(0);
  const [type, setType] = useState("");

  const dispatch = useDispatch();

  const villaDetails = useSelector((state) => state.villaDetails);
  const { loading, error, villa } = villaDetails;

  useEffect(() => {
    if (!villa.name || villa._id !== villaId) {
      dispatch(listVillaDetails(villaId));
    } else {
      setName(villa.name);
      setPrice(villa.price);
      setImage(villa.image);
      setCategory(villa.category);
      setCountInStock(villa.countInStock);
      setDescription(villa.description);
      setRoomNums(villa.roomNums);
      setMaxPeople(villa.maxPeople);
      setType(villa.type);
    }
  }, [dispatch, villaId, villa]);

  //form event handler
  const nameHandler = (e) => setName(e.target.value);
  const priceHandler = (e) => setPrice(e.target.value);
  const imageHandler = (e) => setImage(e.target.value);
  const categoryHandler = (e) => setCategory(e.target.value);
  const countInStockHandler = (e) => setCountInStock(e.target.value);
  const descriptionHandler = (e) => setDescription(e.target.value);
  const roomNumsHandler = (e) => setRoomNums(e.target.value);
  const maxPeopleHandler = (e) => setMaxPeople(e.target.value);
  const typeHandler = (e) => setType(e.target.value);

  const submithandler = (e) => {
    e.preventDefault();
    //update villa
  };

  return (
    <>
      <Link
        to="/admin/productlist/villa"
        className="btn btn-outline-primary my-3"
      >
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Villa</h1>
        {loading ? (
          <Progresser />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submithandler}>
            {/* 1. villa name input */}
            <Form.Group controlId="name">
              <Form.Label>Villa Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Villa Name"
                onChange={nameHandler}
                value={name}
                autoComplete="on"
              ></Form.Control>
            </Form.Group>

            {/* 2. villa price input */}
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

            {/* 3. villa image input */}
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

            {/* 4. villa category input */}
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

            {/* 5. villa countInStock input */}
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

            {/* 6. villa description input */}
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

            {/* 7. villa roomNums input */}
            <Form.Group controlId="roomNums" className="my-3">
              <Form.Label>Room Numbers</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Room Numbers"
                onChange={roomNumsHandler}
                value={roomNums}
                autoComplete="on"
              ></Form.Control>
            </Form.Group>

            {/* 8. villa maxPeople input */}
            <Form.Group controlId="maxPeople" className="my-3">
              <Form.Label>Max People Live In</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Max People"
                onChange={maxPeopleHandler}
                value={maxPeople}
                autoComplete="on"
              ></Form.Control>
            </Form.Group>

            {/* 9. villa type input */}
            <Form.Group controlId="type">
              <Form.Label>Villa Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Villa Type"
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

export default VillaEditScreen;
