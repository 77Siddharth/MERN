import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import {
  newReview,
  getProductDetail,
  clearErrors,
} from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard";
import { addItemsToCart } from "../../actions/cartAction";
import { Dialog, DialogActions, DialogTitle, Button } from "@material-ui/core";
import { DialogContent } from "@mui/material";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { useAlert } from "react-alert";

function ProductDetails({ match }) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, productDetail } = useSelector(
    (state) => state.productDetail
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState();
  const [rating, setRating] = useState();
  const [open, setOpen] = useState();

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity >= productDetail.stock) return;
    setQuantity(quantity + 1);
  };

  const addToCart = (id, quantity) => {
    alert.success("item Added Successfully");
    dispatch(addItemsToCart(id, quantity));
  };

  const reviewSubmitHandler = () => {
    let formData = {
      rating: rating,
      comment: comment,
      productId: match.params.id,
    };
    dispatch(newReview(formData));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error("Review Error: ", reviewError.error.data.message);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetail(match.params.id));
  }, [dispatch, match.params.id, success, error]);

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
              <Carousel className="Carousel">
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
                    <button onClick={decreaseQuantity}>-</button>
                    <input value={quantity} type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={productDetail.stock < 1 ? true : false}
                    onClick={() => addToCart(productDetail._id, quantity)}
                  >
                    Add to Cart
                  </button>
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
              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            open={open}
            aria-labelledby="simple-dialog-title"
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler}>Submit</Button>
            </DialogActions>
          </Dialog>
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
