class ApiFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword 
        ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            },
        } : {};

        
        this.query = this.query.find({...keyword});
        return this;
    }


    filter(){       //this is case sensitive 
        const queryCopy = {...this.queryStr};  //{...<var>} is user to get through value not through reference

        // removing fields for category
        const removeFields = ["keyword", "limit", "page"];

        removeFields.forEach(el => delete queryCopy[el]);

        // filter for price and ratings
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`); //this is a $regex

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }


    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);  

        return this;
    }
}


module.exports = ApiFeatures


