const packageModel = require("../models/packagesModel.js");
const bcrypt= require("bcryptjs")
const key=process.env.SECRET_KEY;

const getAllPackages = async (req, res) => {
    await packageModel.find({}).then((result, error) => {
      if (error) {
        return res.status(400).json({
          success: false,
          massage: error,
        });
      }
      if(result.length===0){
          return res.status(300).json({
              success:false,
              massage:"there are no packages available"
          })
      }
      return res.status(200).json({
          success:true,
          massage:result
      })
    });
  };
  const addNewPackage= async (req,res)=>{
      await packageModel.insertMany(req.body)
      .then(()=>res.status(300).json({success:true,massage:"success in adding new package"}))
      .catch(error=>res.status(400).json({success:false,error}))
  }

  const getPackageById = async (req, res) => {
    await packageModel.findById(req.params.id)
        .then(package => {
            if (!package) {
                return res.json({ success: false, massage: "package is not available" })
            }
            return res.status(200).json({ success: true, package })
        })
        .catch(error => res.status(400).json({ success: false, error }))
}

const updatePackage = async (req, res) => {
  await packageModel.findByIdAndUpdate(req.params.id, req.body)
      .then(result => res.status(200).json({ success: true, result }))
      .catch(error => res.status(400).json({ success: false, error }))
}

const deletePackage = async (req, res) => {
  await packageModel.findByIdAndDelete(req.params.id)
      .then(() => res.status(300).json({ success: true }))
      .catch(error => res.status(400).json({ success: false ,error}))
}

  module.exports={
    getAllPackages,
    addNewPackage,
    getPackageById,
    updatePackage,
    deletePackage,
  }