import React, { Fragment, useState } from "react";
import "./Search.css";
function Search({ history }) {
  const [Keyword, setKeyword] = useState("");

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (Keyword.trim()) history.push(`/products/${Keyword}`);
    else history.push(`/products`);
  };
  return (
    <Fragment>
      <form onSubmit={onSearchSubmit} className="searchBox">
        <input
          type="text"
          placeholder="Enter Keyword to Search"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
}

export default Search;
