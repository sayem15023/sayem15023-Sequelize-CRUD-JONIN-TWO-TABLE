const db = require('../models/index')
const pagination = require("../pagination.js")
const AdvancedInfo = db.Advanced 

const addProductAdvancedInfo = async(req,res)=>{
    try{
      const {price,color,basicId} = req.body;
      const advancedData = {
        price,
        color,
        basicId
      }
      const data = await AdvancedInfo.create(advancedData)
  
      res.status(200).send({
           status: 200,
           message: " Product advanced info successfully saved",
           data: advancedData });
    }catch(error){
      res.status(400).send({
      status: 400,
      errors: error,
      message: "Bad Request" });
    }
  }
  
  const updateProductAdvancedInfo = async(req,res)=>{
 
    try{
      const searchId = parseInt(req.params.id);
      const data = await AdvancedInfo.findAll({where: {basicId:searchId}});
      const updateData = {
        price:req.body.price,
        color:req.body.color,
        basicId:req.body.basicId
      }
  
      if(data.length !== 0){
          const updateadvanced = await AdvancedInfo.update({
          price : updateData.price,
          color : updateData.color,
          basicId : updateData.basicId
          },{where: {basicId:searchId}});
          
        res.status(200).send({
        status: 200,
        message: "Product Id: " + searchId + " successfully updated in product_advanced_info table",
        data:updateData});
      }else{
        res.status(404).send({
        status: 404,
        message: "Product Id: " + searchId + " not found in product_advanced_info table" });
      } 
  
    }catch(error){
      res.status(400).send({
      status: 400,
      errors: error,
      message: "Bad Request" });
    }
      
  };

  const deleteProductAdvancedInfo = async(req,res)=>{
    try{
      const searchId = parseInt(req.params.id);
     const data = await AdvancedInfo.findAll({where: {basicId:searchId}});

       if(data.length !== 0){
         const advanced = await AdvancedInfo.destroy({where: {basicId:searchId} });

         res.status(200).send({
               status: 200,
               message:  "Product Id: "+ searchId + " successfully deleted from product_advanced_info table", 
               data:data});
       }else{
         res.status(404).send({
           status: 404,
           message:  "Product Id: "+ searchId + " not found in product_advanced_info table" });
       }
 
    }catch(error){
      res.status(400).send({
      status: 400,
      errors: error,
      message: "Bad Request"
    });
    }
 }

 const getAllProductsAdvancedInfo = async(req, res) => {
  try{
  const {page,size} = req.query;
  const pagiInfo = pagination(page,size);
  const data = await AdvancedInfo.findAll({ attributes: ['color', 'price','basicId'], where: {}, limit: pagiInfo.perPage,
  offset: pagiInfo.skip });

  if(data.length !== 0){
    res.status(200).send({
    status: 200,
    message: "Data successfully found from product_advanced_info table",
    data:data });
  }else{
    res.status(404).send({
    status: 404,
    message: "Data not found from product_advanced_info table"
    });
  }
 
}catch(error){
  res.status(400).send({
  status: 400,
  errors: error,
  message: "Bad Request" });
}

};

  const getOneProductAdvancedInfo = async(req, res) => {
    try{
      const searchId = parseInt(req.params.id);
      const data = await AdvancedInfo.findAll({attributes: ['color', 'price','basicId'],where: {basicId:searchId} });
  
    if(data.length !== 0){
      res.status(200).send({
      status: 200,
      message: "Data successfully found from product_advanced_info table",
      data:data });
    }else{
      res.status(404).send({
      status: 404,
      message: "Data not found from product_advanced_info table"
      });
    }
   
  }catch(error){
    res.status(400).send({
    status: 400,
    errors: error,
    message: "Bad Request" });
  }
};

module.exports = {
    addProductAdvancedInfo,
    updateProductAdvancedInfo,
    getAllProductsAdvancedInfo,
    getOneProductAdvancedInfo,
    deleteProductAdvancedInfo 
}