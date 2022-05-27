const pagination = (pageNo,sizeNo)=>{
    const page = pageNo ? pageNo : 1;
    const size = sizeNo ? sizeNo : 3;

    const perPage = parseInt(size);
    const skip = (page-1)*size;
    return {
        perPage,
        skip
    }
}

module.exports = pagination;