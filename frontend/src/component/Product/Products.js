import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Pagination from "react-js-pagination";
import loader from "../layout/Loader/loader";
import { Typography } from "@material-ui/core";
import { Slider } from "@material-ui/core";
import Product from "./Product";
import "./Products.css";

function Products({ match }) {
  const dispatch = useDispatch();

  const [currentPage, setcurrentPage] = useState(1);
  const [price, setprice] = useState([0, 2500]);

  const {
    loading,
    products,
    productsCount,
    error,
    resultPerPage,
    filterdProductsCount,
  } = useSelector((state) => state.products);
  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setprice(newPrice);
  };

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price));
  }, [dispatch, keyword, currentPage, price]);

  return (
    <Fragment>
      {loading ? (
        <loader />
      ) : (
        <Fragment>
          <h1 className="Products-heading">Products</h1>
          <div className="Products">
            {products &&
              products.map((product) => (
                <Product product={product} key={product.id} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Filters</Typography>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={100000}
            />
          </div>
          {resultPerPage < filterdProductsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={filterdProductsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default Products;
