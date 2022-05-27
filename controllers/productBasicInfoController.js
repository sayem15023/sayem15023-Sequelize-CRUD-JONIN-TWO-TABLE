const db = require('../models/index')
const pagination = require("../pagination.js")
const BasicInfo = db.Basic

const addProductBasicInfo = async(req,res)=>{
    try{
      const {title,productType} = req.body;
      const basicData = {
        title,
        productType
      }
      const data = await BasicInfo.create(basicData)
  
      res.status(200).send({
           status: 200,
           message: " Product basic info successfully saved",
           data: data });
    }catch(error){
      res.status(400).send({
      status: 400,
      errors: error,
      message: "Bad Request" });
    }
  }

  const updateProductBasicInfo = async(req,res)=>{
 
    try{
      const searchId = parseInt(req.params.id);
      const data = await BasicInfo.findAll({where: {id:searchId}});

      const updateData = {
        title : req.body.title,
        protuctType : req.body.productType
      }
  
      if(data.length !== 0){
          const updateBasic = await BasicInfo.update({
          title : updateData.title,
          protuctType : updateData.protuctType
          },{where: {id:searchId}});
  
        res.status(200).send({
        status: 200,
        message: "Product Id: " + searchId + " successfully updated in product_basic_info table",
        data: updateData });
      }else{
        res.status(404).send({
          status: 404,
          message: "Product Id: " + searchId + " not found in product_basic_info table" });
      } 
  
    }catch(error){
      res.status(400).send({
      status: 400,
      errors: error,
      message: "Bad Request" });
    }
      
  };

  const deleteProductBasicInfo = async(req,res)=>{
    try{
      const searchId = parseInt(req.params.id);
      const data = await BasicInfo.findAll({where: {id:searchId}});

       if(data.length !== 0){
         const basic = await BasicInfo.destroy({where: {id:searchId} });

         res.status(200).send({
               status: 200,
               message:  "Product Id: "+ searchId + " successfully deleted from product_basic_info table",
               data: data });
       }else{
         res.status(404).send({
           status: 404,
           message:  "Product Id: "+ searchId + " not found in product_basic_info table" });
       }
 
    }catch(error){
      res.status(400).send({
      status: 400,
      errors: error,
      message: "Bad Request"
    });
    }
 }

 const getAllProductsBasicInfo = async(req, res) => {
    try{
    const {page,size} = req.query;
    const pagiInfo = pagination(page,size);
    const data = await BasicInfo.findAll({ attributes: ['id', 'title','productType'], where: {}, limit: pagiInfo.perPage,
    offset: pagiInfo.skip });

    if(data.length !== 0){
      res.status(200).send({
      status: 200,
      message: "Data successfully found from product_basic_info table",
      data:data });
    }else{
      res.status(404).send({
      status: 404,
      message: "Data not found from product_basic_info table"
      });
    }
   
  }catch(error){
    res.status(400).send({
    status: 400,
    errors: error,
    message: "Bad Request" });
  }
  
  };

  const getOneProductBasicInfo = async(req, res) => {
    try{
      const searchId = parseInt(req.params.id);
        const data = await BasicInfo.findAll({attributes: ['id', 'title','productType'], where: {id:searchId} });
        
    if(data.length !== 0){
      res.status(200).send({
      status: 200,
      message: "Data successfully found from product_basic_info table",
      data:data });
    }else{
      res.status(404).send({
      status: 404,
      message: "Data not found from product_basic_info table"
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
    addProductBasicInfo,
    updateProductBasicInfo,
    getAllProductsBasicInfo,
    getOneProductBasicInfo,
    deleteProductBasicInfo 
}