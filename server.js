const express = require('express');
const cors = require('cors');
const app = express();
var corsOptions = {
  origin: "http://localhost:8080"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const productRouter = require('./routes/productRouter.js')
const productBasicInfoRouter = require('./routes/productBasicInfoRouter')
const productAdvancedInfoRouter = require('./routes/productAdvancedInfoRouter')
app.use('/product',productRouter)
app.use('/product/basicinfo',productBasicInfoRouter)
app.use('/product/advancedinfo',productAdvancedInfoRouter)
app.use(function(req,res){
  res.status(404).send({
    status: 404,
    message: "Page not found" });
});
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello." });
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});