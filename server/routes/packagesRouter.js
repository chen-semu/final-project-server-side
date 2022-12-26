const{
    getAllPackages,
    addNewPackage,
    getPackageById,
    updatePackage,
    deletePackage,
}=require("../controlers/packagesCntrl")
const router= require("express").Router()

router.get("/",getAllPackages)
router.post("/",addNewPackage)
router.get('/byId/:id',getPackageById)
router.put('/byId/:id',updatePackage)
router.delete('/byId/:id',deletePackage)

module.exports= router