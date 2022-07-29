import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer";
import Message from "../../components/Loading/Message";
import Progresser from "../../components/Loading/Progresser";
import {
  listFoodDetails,
  updateFood,
} from "../../actions/productActions/foodActions";
import { FOOD_UPDATE_RESET } from "../../constants/productsConstant/foodConstants";
import backend from "../../utils/setBaseUrl";

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
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const nagivateTo = useNavigate();

  const foodDetails = useSelector((state) => state.foodDetails);
  const { loading, error, food } = foodDetails;

  const foodUpdate = useSelector((state) => state.foodUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = foodUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: FOOD_UPDATE_RESET });
      nagivateTo("/admin/productlist/food");
    } else {
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
    }
  }, [dispatch, foodId, food, successUpdate, nagivateTo]);

  //form event handler
  const nameHandler = (e) => setName(e.target.value);
  const priceHandler = (e) => setPrice(e.target.value);
  const imageHandler = (e) => setImage(e.target.value);
  const categoryHandler = (e) => setCategory(e.target.value);
  const countInStockHandler = (e) => setCountInStock(e.target.value);
  const descriptionHandler = (e) => setDescription(e.target.value);
  const typeHandler = (e) => setType(e.target.value);

  //for image file upload
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]; //get the first image from the array
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await backend.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submithandler = (e) => {
    e.preventDefault();
    //update food
    dispatch(
      updateFood({
        _id: foodId,
        name,
        price,
        image,
        category,
        countInStock,
        description,
        type,
      })
    );
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
        {loadingUpdate && <Progresser />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
              <Form.Control
                type="file"
                // controlId="image-file"
                label="Choose File"
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Progresser />}
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
