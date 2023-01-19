class ApiFeatures {
    constructor(query, querystr){
        this.query=query,
        this.querystr=querystr

    }
    search(){
        const keyword = this.querystr.keyword ? {
            name:{
                $regex: this.querystr.keyword,
                $options: "i"

                // here i means caseinsensitive means it can search small letter as well as caps letter
            }
        } 
        : {}

        this.query = this.query.find({...keyword})
        return this
    }

// filter by category

    filter(){


        // copy all query
        const queryCopy  = {...this.querystr}

        // remove some files for category

        const removeFields = ["keyword","page","limit"]

        removeFields.forEach((key)=> delete queryCopy[key])


        // filter for price and rating

        let queryStr = JSON.stringify(queryCopy)

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=>`$${key}`)

        this.query = this.query.find(JSON.parse(queryStr))
        this.query = this.query.find(queryCopy)
        return this



    }
}

module.exports = ApiFeatures