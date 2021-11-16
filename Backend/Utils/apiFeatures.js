class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCpy = { ...this.queryStr };
    //   const queryCpy = {...this.queryStr.category}; --- why it can't be done like this ??
    //   Removing other params for category
    const removeFields = ["name", "page", "limit"];

    removeFields.forEach((key) => delete queryCpy[key]);

    // filtering price wise

    let queryStr = JSON.stringify(queryCpy);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    const q = JSON.parse(queryStr);
    this.query = this.query.find(q);

    return this;
  }
  pagination(resultPerPage) {
    let currentPage = Number(this.queryStr.page) || 1;
    let skip = resultPerPage * (currentPage - 1);

    this.query = this.query.skip(skip).limit(resultPerPage);
    return this;
  }
}

module.exports = ApiFeatures;
