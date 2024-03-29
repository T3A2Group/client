import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer";
import Message from "../../components/Loading/Message";
import Progresser from "../../components/Loading/Progresser";
import {
  listSpecialtyDetails,
  updateSpecialty,
} from "../../actions/productActions/specialtyActions";
import { SPECIALTY_UPDATE_RESET } from "../../constants/productsConstant/specialtyConstants";
import tasResApi from "../../config/api";

const SpecialtyEditScreen = () => {
  //=> for each specialty details
  const { id } = useParams();
  const specialtyId = id;
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

  const specialtyDetails = useSelector((state) => state.specialtyDetails);
  const { loading, error, specialty } = specialtyDetails;

  const specialtyUpdate = useSelector((state) => state.specialtyUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = specialtyUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SPECIALTY_UPDATE_RESET });
      nagivateTo("/admin/productlist/specialty");
    } else {
      if (!specialty.name || specialty._id !== specialtyId) {
        dispatch(listSpecialtyDetails(specialtyId));
      } else {
        setName(specialty.name);
        setPrice(specialty.price);
        setImage(specialty.image);
        setCategory(specialty.category);
        setCountInStock(specialty.countInStock);
        setDescription(specialty.description);
        setType(specialty.type);
      }
    }
  }, [dispatch, specialtyId, specialty, successUpdate, nagivateTo]);

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
      const { data } = await tasResApi.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submithandler = (e) => {
    e.preventDefault();
    //update specialty
    dispatch(
      updateSpecialty({
        _id: specialtyId,
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
        to="/admin/productlist/specialty"
        className="btn btn-outline-primary my-3"
      >
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Specialty</h1>
        {loadingUpdate && <Progresser />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Progresser />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submithandler}>
            {/* 1. specialty name input */}
            <Form.Group controlId="name">
              <Form.Label>Specialty Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Specialty Name"
                onChange={nameHandler}
                value={name}
                autoComplete="on"
              ></Form.Control>
            </Form.Group>

            {/* 2. specialty price input */}
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

            {/* 3. specialty image input */}
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

            {/* 4. specialty category input */}
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

            {/* 5. specialty countInStock input */}
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

            {/* 6. specialty description input */}
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

            {/* 7. specialty type input */}
            <Form.Group controlId="type">
              <Form.Label>Specialty Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Specialty Type"
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

export default SpecialtyEditScreen;
