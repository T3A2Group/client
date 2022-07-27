import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer";
import Message from "../../components/Loading/Message";
import Progresser from "../../components/Loading/Progresser";
import {
  listTravelDetails,
  updateTravel,
} from "../../actions/productActions/travelActions";
import { TRAVEL_UPDATE_RESET } from "../../constants/productsConstant/travelConstants";

const TravelEditScreen = () => {
  //=> for each travel details
  const { id } = useParams();
  const travelId = id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [attractions, setAttractions] = useState({ name: "", briefInfo: "" });
  const [type, setType] = useState("");

  const dispatch = useDispatch();
  const nagivateTo = useNavigate();

  const travelDetails = useSelector((state) => state.travelDetails);
  const { loading, error, travel } = travelDetails;

  const travelUpdate = useSelector((state) => state.travelUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = travelUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TRAVEL_UPDATE_RESET });
      nagivateTo("/admin/productlist/travel");
    } else {
      if (!travel.name || travel._id !== travelId) {
        dispatch(listTravelDetails(travelId));
      } else {
        setName(travel.name);
        setPrice(travel.price);
        setImage(travel.image);
        setCategory(travel.category);
        setCountInStock(travel.countInStock);
        setDescription(travel.description);
        setDuration(travel.duration);
        setAttractions(travel.attractions);
        setType(travel.type);
      }
    }
  }, [dispatch, travelId, travel, successUpdate, nagivateTo]);

  //form event handler
  const nameHandler = (e) => setName(e.target.value);
  const priceHandler = (e) => setPrice(e.target.value);
  const imageHandler = (e) => setImage(e.target.value);
  const categoryHandler = (e) => setCategory(e.target.value);
  const countInStockHandler = (e) => setCountInStock(e.target.value);
  const descriptionHandler = (e) => setDescription(e.target.value);
  const durationHandler = (e) => setDuration(e.target.value);
  const attractionsHandler = (e) =>
    setAttractions({
      ...attractions,
      [e.target.name]: e.target.value,
    });
  // const attractionsHandler = (newValue) => {
  //   console.log("attractionsHandler", attractions);
  //   const changedItem = attractions.find((x) => x._id === id);
  //   console.log("changeItem", changedItem);
  //   console.log("newValue", newValue);
  //   // changedItem.briefInfo = newValue;
  //   // const value = e.target.value;
  //   // console.log([e.target.name]);
  //   // console.log(value);
  //   // setAttractions([...attractions, { [e.target.name]: value }]);
  // };
  const typeHandler = (e) => setType(e.target.value);

  const submithandler = (e) => {
    e.preventDefault();
    //update travel
    dispatch(
      updateTravel({
        _id: travelId,
        name,
        price,
        image,
        category,
        countInStock,
        description,
        duration,
        attractions,
        type,
      })
    );
  };

  return (
    <>
      <Link
        to="/admin/productlist/travel"
        className="btn btn-outline-primary my-3"
      >
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Travel Plan</h1>
        {loadingUpdate && <Progresser />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Progresser />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submithandler}>
            {/* 1. travel name input */}
            <Form.Group controlId="name">
              <Form.Label>Travel Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Travel Name"
                onChange={nameHandler}
                value={name}
                autoComplete="off"
              ></Form.Control>
            </Form.Group>

            {/* 2. travel price input */}
            <Form.Group controlId="price" className="my-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                onChange={priceHandler}
                value={price}
                autoComplete="off"
              ></Form.Control>
            </Form.Group>

            {/* 3. travel image input */}
            <Form.Group controlId="image" className="my-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                onChange={imageHandler}
                value={image}
                autoComplete="off"
              ></Form.Control>
            </Form.Group>

            {/* 4. travel category input */}
            <Form.Group controlId="category" className="my-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                onChange={categoryHandler}
                value={category}
                autoComplete="off"
              ></Form.Control>
            </Form.Group>

            {/* 5. travel countInStock input */}
            <Form.Group controlId="countInStock" className="my-3">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count In Stock"
                onChange={countInStockHandler}
                value={countInStock}
                autoComplete="off"
              ></Form.Control>
            </Form.Group>

            {/* 6. travel description input */}
            <Form.Group controlId="description" className="my-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                onChange={descriptionHandler}
                value={description}
                autoComplete="off"
              ></Form.Control>
            </Form.Group>

            {/* 7. travel duration input */}
            <Form.Group controlId="duration" className="my-3">
              <Form.Label>Durations</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Durations"
                onChange={durationHandler}
                value={duration}
                autoComplete="off"
              ></Form.Control>
            </Form.Group>

            {/* 8. travel acctractions input */}
            <p>Attractions</p>
            <Form.Group controlId="acctractions" className="my-3">
              {/* <Form.Label>{attractions.name}</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Enter Attractions Name"
                onChange={attractionsHandler}
                value={attractions.name}
                autoComplete="off"
                name="name"
              ></Form.Control>
              <Form.Control
                type="text"
                placeholder="Enter Attractions BriefInfo"
                onChange={attractionsHandler}
                value={attractions.briefInfo}
                autoComplete="off"
                name="briefInfo"
              ></Form.Control>
              {/* {attractions.map((attraction, idx) => (
                <div
                  // data-testid={`${attraction._id}_${idx}`}
                  key={`${attraction._id}_${idx}`}
                >
                  <Form.Label>{attraction.name}</Form.Label> */}
              {/* <Form.Control
                    type="text"
                    placeholder="Enter BriefInfo"
                    onChange={(e) => {
                      const value = e.target.value;
                      console.log([e.target.name]);
                      console.log(value);
                      setAttractions(...attractions, {
                        ...attraction,
                        [e.target.name]: value,
                      });
                      // attractionsHandler()
                    }}
                    value={attraction.briefInfo}
                    name="briefInfo"
                    autoComplete="off"
                  ></Form.Control> */}
              {/* <Form.Control
                    key={attraction._id}
                    type="text"
                    placeholder="Enter BriefInfo"
                    onChange={(e) => {
                      console.log([e.target.name]);
                      console.log(attraction);
                      setAttractions([
                        ...attractions,
                        {
                          ...attraction,
                          [e.target.name]: e.target.value,
                        },
                      ]);
                    }}
                    value={attraction.briefInfo}
                    name="briefInfo"
                    autoComplete="off"
                  ></Form.Control> */}
              {/* </div> */}
              {/* ))} */}
            </Form.Group>

            {/* 9. travel type input */}
            <Form.Group controlId="type">
              <Form.Label>Travel Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Travel Type"
                onChange={typeHandler}
                value={type}
                autoComplete="off"
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

export default TravelEditScreen;
