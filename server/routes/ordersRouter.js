const{
    getAllOrders,
    addNewOrder,
    getOrderById,
    updateOrder,
    deleteOrder
}=require("../controlers/ordersCntrl")
const router= require("express").Router()

router.get("/",getAllOrders)
router.post("/",addNewOrder)
router.get('/byId/:id',getOrderById)
router.put('/byId/:id',updateOrder)
router.delete('/byId/:id',deleteOrder)

module.exports= router