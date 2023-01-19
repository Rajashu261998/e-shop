module.exports = (catchError)=>(req,res,next)=>{
    Promise.resolve(catchError(req,res,next))
    .catch(next)
}