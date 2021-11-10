import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction";
import loader from "../layout/Loader/loader";
import Product from "./Product";
import "./Products.css";
function Products({ match }) {
  const dispatch = useDispatch();

  const { loading, products, productsCount, error } = useSelector(
    (state) => state.products
  );
  const keyword = match.params.keyword;
  useEffect(() => {
    dispatch(getProduct(keyword));
  }, [dispatch, keyword]);
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
        </Fragment>
      )}
    </Fragment>
  );
}

export default Products;
