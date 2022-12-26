const {
    getAllUsers,
    addNewUser,
    getUserById,
    logIn,
    register,
    updateUser,
    deleteUser,
}=require("../controlers/usersCntrl")
const router= require("express").Router()

router.get("/",getAllUsers)
router.post("/",addNewUser)
router.post('/register',register)
router.post("/log-in",logIn)
// router.get('/byId/:id',getUserById)
router.put('byId/:id',updateUser)
router.delete('byId/:id',deleteUser)

module.exports= router
