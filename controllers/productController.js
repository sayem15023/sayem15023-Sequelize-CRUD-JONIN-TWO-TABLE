const db = require('../models/index')
const pagination = require("../pagination.js")
const BasicInfo = db.Basic
const AdvancedInfo = db.Advanced

const getAllProducts = async(req, res) => {
  try{
  
    const {page,size} = req.query;

    const pagiInfo = pagination(page,size);
    
	  const data = await BasicInfo.findAll({
      attributes: ['id', 'title','productType'],
		  include: [{
			model: AdvancedInfo,
      as: 'advanced',
      where: {},
			attributes: ['price','color','basicId']}],
      limit: pagiInfo.perPage,
      offset: pagiInfo.skip
    });

  if(data.length !== 0){
    res.status(200).send({
    status: 200,
    message: "All data successfully found",
    data:data });
  }else{
    res.status(404).send({
    status: 404,
    message: "Data not found"
    });
  }
 
}catch(error){
  res.status(400).send({
  status: 400,
  errors: error,
  message: "Bad Request" });
}

};

const getOneProduct = async(req,res)=>{
  try{
      const searchId = parseInt(req.params.id);
      const data = await BasicInfo.findAll({
      attributes: ['id', 'title','productType'],
		  include: [{
			model: AdvancedInfo,
      as: 'advanced',
			attributes: ['price','color','basicId']}],where: {id:id}});

    if(data.length !== 0){
      res.status(200).send({
      status: 200,
      message: "Product Id: "+ id + " successfully found",
      data:data
     });
    }else{
      res.status(404).send({
      status: 404,
      message: "Product Id: "+ id + " not found"
      });
    }
  }catch(error){
    res.status(400).send({
    status: 400,
    errors: error,
    message: "Bad Request" });
  }
}

// const updateProduct = async(req,res)=>{
 
//   try{
//     const searchId = req.params.id;
//     const data1 = await BasicInfo.findOne({where: {id:searchId}});
//     const data2 = await AdvancedInfo.findOne({where: {product_id:searchId}});

//     if(data1.length !== 0 || data2.length !== 0){
//       if(data1.length !== 0){
//         const updateBasic = await BasicInfo.update({
//         title : req.body.title,
//         protuct_type : req.body.product_type
//         },{where: {id:searchId}});
//       }

//       if(data2.length !== 0){
//          const updateAdvance = await AdvancedInfo.update({
//          color : req.body.color,
//          protuct_type : req.body.product_type,
//          product_id : req.body.product_id
//       },{where: {product_id:searchId}});

//       }
//       res.status(200).send({
//       status: 200,
//       message: "Product Id: " + searchId + " successfully updated" });
//     }else{
//       res.status(404).send({
//         status: 404,
//         message: "Product Id: " + searchId + " not found" });
//     } 

//   }catch(error){
//     res.status(400).send({
//     status: 400,
//     errors: error,
//     message: "Bad Request" });
//   }
    
// };

// const deleteProduct = async(req,res)=>{
//    try{
//     const searchId = req.params.id;
//     const data1 = await BasicInfo.findOne({where: {id:searchId}});
//     const data2 = await AdvancedInfo.findOne({where: {product_id:searchId}});

//       if(data1.length !== 0 || data2.length !== 0){
//         if(data1.length !== 0 ){
//           const basic = await BasicInfo.destroy({where: {id:searchId} });
//         }

//         if(data2.length !== 0 ){
//           const advance = await AdvancedInfo.destroy({where: {product_id:searchId} });
//         }

//         res.status(200).send({
//               status: 200,
//               message:  "Product Id: "+ searchId + " successfully deleted" });
//       }else{
//         res.status(404).send({
//           status: 404,
//           message:  "Product Id: "+ searchId + " not found" });
//       }

//    }catch(error){
//      res.status(400).send({
//      status: 400,
//      errors: error,
//      message: "Bad Request"
//    });
//    }
// }

module.exports = {
    getAllProducts,
    getOneProduct
    //updateProduct,
    //deleteProduct
}