import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Pagination from "react-js-pagination";
import loader from "../layout/Loader/loader";
import Product from "./Product";
import "./Products.css";

function Products({ match }) {
  const dispatch = useDispatch();

  const [currentPage, setcurrentPage] = useState(1);

  const { loading, products, productsCount, error, resultPerPage } =
    useSelector((state) => state.products);
  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);

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
          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
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
