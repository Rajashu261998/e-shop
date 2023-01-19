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

        let querystr = JSON.stringify(queryCopy)

        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=>`$${key}`)

        this.query = this.query.find(JSON.parse(querystr))
        this.query = this.query.find(queryCopy)
        return this
    }

    pagination(resultPerPage){
        const currentPage = Number(this.querystr.page) || 1

        const skip = resultPerPage*(currentPage-1)

        this.query = this.query.limit(resultPerPage).skip(skip)

        return this
    }
}

module.exports = ApiFeatures