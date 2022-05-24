const db = require('../models/index')
const BasicInfo = db.product_basic_info 
const AdvancedInfo = db.product_advanced_info 

const addProduct = async(req,res)=>{
  try{
    const {id,title,price,color,product_type} = req.body;
    const basicData = {
      id,
      title,
      price
    }
    const advanceData = {
      color,
      product_id: id,
      product_type
    }
   const data = {
     ...basicData,
     ...advanceData
   }
    const basic = await BasicInfo.create(basicData)
    const advance = await AdvancedInfo.create(advanceData)

    res.status(200).send({
         status: 200,
         message: "Product Id: "+ id + " successfully saved",
         data: data });
  }catch(error){
    res.status(400).send({
    status: 400,
    errors: error,
    message: "Bad Request" });
  }
}

const getallProducts = async(req, res) => {
  try{
	  const data = await BasicInfo.findAll({
      attributes: ['id', 'title','price'],
		  include: [{
			model: AdvancedInfo,
			where: {},
			attributes: ['color','product_type']}],
      limit: 5,
      offset: 0
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

const getOneProducts= async(req,res)=>{
  var id = req.params.id;
  try{
     const data = await BasicInfo.findAll({
      attributes: ['id', 'title','price'],
		  include: [{
			model: AdvancedInfo,
      attributes: ['color','product_type']
      }],where: {id:id}});

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

const updateProducts= async(req,res)=>{
 
  try{
    const searchId = req.params.id;
    const mainId = req.body.id ? req.body.id : null;

    if(! mainId || mainId === parseInt(searchId)){
    const data = await BasicInfo.findAll({
    attributes: ['id', 'title','price'],
		include: [{
		model: AdvancedInfo,
    attributes: ['color','product_type']
    }], where: {id:searchId}});

    if(data.length !== 0){
      const updateBasic = await BasicInfo.update({
        id : req.body.id,
        title : req.body.title,
        price : req.body.price
      },{where: {id:req.params.id}});
    
      const updateAdvance = await AdvancedInfo.update({
         color : req.body.color,
         protuct_type : req.body.product_type,
         product_id : req.body.id
      },{where: {product_id:req.params.id}});
  
      res.status(200).send({
      status: 200,
      message: "Product Id: " + searchId + " successfully updated" });
    }else{
      res.status(404).send({
        status: 404,
        message: "Product Id: " + searchId + " not found" });
    } 
  }else{
    res.status(200).send({
    status: 200,
    message: "You can not change Product ID" });
  } 
  }catch(error){
    res.status(400).send({
    status: 400,
    errors: error,
    message: "Bad Request" });

  }
    
};
const deleteProducts= async(req,res)=>{
   try{
    const searchId = req.params.id;
    const data = await BasicInfo.findAll({
      attributes: ['id', 'title','price'],
      include: [{
      model: AdvancedInfo,
      attributes: ['color','product_type']
      }], where: {id: searchId}});

      if(data.length !== 0){
        const basic = await BasicInfo.destroy({where: {id:searchId} });
        const advance = await AdvancedInfo.destroy({where: {product_id:searchId} });

        res.status(200).send({
              status: 200,
              message:  "Product Id: "+ searchId + " successfully deleted" });
      }else{
        res.status(404).send({
          status: 404,
          message:  "Product Id: "+ searchId + " not found" });
      }

   }catch(error){
     res.status(400).send({
     status: 400,
     errors: error,
     message: "Bad Request"
   });
   }
}

module.exports = {
    addProduct,
    getallProducts,
    getOneProducts,
    updateProducts,
    deleteProducts
}