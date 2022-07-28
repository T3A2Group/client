import React, { useState, useEffect } from "react";
import EachFood from "../../components/Products/EachFood";

//for search bar
import { useParams } from "react-router-dom";
import ToolBar from "../../components/ToolBar";
import Searchbar from "../../components/Searchbar";

// import products from "../products";  //fetch it from backend
import { Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";

//use react redux to lift up all products state, start:
import { useDispatch, useSelector } from "react-redux";
import { listFood } from "../../actions/productActions/foodActions";
//end

//import carousel lab
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

//import message and loader component
import Message from "../../components/Loading/Message";
import Loader from "../../components/Loading/Loader";

// carousel
const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 3,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 2,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

const FoodListScreen = () => {
  //config react redux
  const dispatch = useDispatch();
  const foodList = useSelector((state) => state.foodList);

  //for product search
  const params = useParams();
  const keyword = params.keyword;

  //for food  state update
  useEffect(() => {
    dispatch(listFood(keyword));
  }, [dispatch, keyword]);

  // for floating search bar
  const [searchbar, setSearchbar] = useState(false);
  const toggleSearchbar = () => {
    setSearchbar((prevState) => !prevState);
  };

  return (
    <>
      <ToolBar openSearchbar={toggleSearchbar} />
      <Searchbar
        searchbar={searchbar}
        closeSearchbar={toggleSearchbar}
        category="food"
        className="fa-solid fa-utensils"
      />

      <Container className="my-3">
        <h1>Our Restaurant</h1>
        {foodList.loading ? (
          <Loader color={"#FFC4C4"} />
        ) : foodList.error ? (
          <Message variant="danger">{foodList.error}</Message>
        ) : (
          <Row>
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              className=""
              containerClass="container"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              partialVisible
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={responsive}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              shouldResetAutoplay
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            >
              {foodList.food.map((food) => (
                // <Col key={food._id} sm={12} md={6} lg={4} xl={3}>
                <div key={food._id} className="mx-2">
                  <EachFood food={food} />
                </div>

                // </Col>
              ))}
            </Carousel>
          </Row>
        )}
      </Container>
    </>
  );
};

export default FoodListScreen;
