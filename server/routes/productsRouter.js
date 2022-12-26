const{
    getAllProducts,
    addNewProduct,
    getProductById,
    updateProduct,
    deleteProduct,
}=require("../controlers/productsCntrl")
const router= require("express").Router()
// const  path= require("path")

router.get("/",getAllProducts)
router.post("/",addNewProduct)
router.get('/byId/:id',getProductById)
router.put('/byId/:id',updateProduct)
router.delete('/byId/:id',deleteProduct)

module.exports= router