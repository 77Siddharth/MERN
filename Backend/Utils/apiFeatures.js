class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const name = this.queryStr.name
      ? {
          name: {
            $regex: this.queryStr.name,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...name });
    return this;
  }

  filter(){
      const queryCpy = {...this.queryStr};
    //   const queryCpy = {...this.queryStr.category}; --- why it can't be done like this ??
    
    //   Removing other params for category

    const removeFields = ['name','page','limit'];

    removeFields.forEach((key)=>delete queryCpy[key]);

    this.query = this.query.find(queryCpy);

    return this
  }
}

module.exports = ApiFeatures;
