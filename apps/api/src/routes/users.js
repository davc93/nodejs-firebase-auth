const express = require('express')
const {UserService} = require('../services/user.service')
const router = express.Router()

const service = new UserService()

router.get('/',async (req,res,next)=>{
    
    try {
        const users = await service.getUsers()
        res.status(200).json(
            users
        )
    } catch (error) {
        next(error)
    }
})
router.delete('/',(req,res,next)=>{
    
    try {
        res.json({
            message:"peticion exitosa"
        })
    } catch (error) {
        next(error)
    }
})



module.exports = router