import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard";

function ProductDetails({ match }) {
  const dispatch = useDispatch();

  const { loading, error, productDetail } = useSelector(
    (state) => state.productDetail
  );
  useEffect(() => {
    dispatch(getProductDetail(match.params.id));
  }, [dispatch, match.params.id]);
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: productDetail.rating,
    isHalf: true,
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="ProductDetails">
            <div>
              <Carousel>
                {productDetail.images &&
                  productDetail.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      src={item.url}
                      key={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{productDetail.name}</h2>
                <p>Product # {productDetail._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({productDetail.numOfReviews} Reviews)</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`$ ${productDetail.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>
                  <button>Add to Cart</button>
                </div>
                <p>
                  Status:
                  <b
                    className={
                      productDetail.stock < 1 ? "redColor" : "greenColor"
                    }
                  >
                    {productDetail.stock < 1 ? "Out of Stock" : "In Stock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description: <p>{productDetail.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
          {productDetail.reviews && productDetail.reviews[0] ? (
            <div className="reviews">
              {productDetail.reviews.map((review) => (
                <ReviewCard review={review} />
              ))}
            </div>
          ) : (
            <p className="noReviews"> No Reviews Available</p>
          )}
        </Fragment>
      )}
    </div>
  );
}

export default ProductDetails;
