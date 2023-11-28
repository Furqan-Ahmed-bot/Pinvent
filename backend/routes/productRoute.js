const express = require("express");
const protect = require("../middleWare/authMiddleware");
const { createProduct, getAllProducts, getSingleProduct, deleteProduct, updateProduct } = require("../controllers/productController");
const router = express.Router();
const {upload} = require("../utils/fileUpload");

router.post("/" , protect , upload.single("image") ,  createProduct);
router.patch("/:id" , protect , upload.single("image") ,  updateProduct);

router.get("/getallproducts" , protect , getAllProducts);   
router.get("/:id" , protect , getSingleProduct);  
router.delete("/:id" , protect , deleteProduct); 


module.exports = router;


 