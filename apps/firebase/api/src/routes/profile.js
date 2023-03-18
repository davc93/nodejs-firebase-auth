const express = require('express')
const { ProfileService } = require('../services/profile.service')
const router = express.Router()

const service = new ProfileService()

router.get('/',async(req,res,next)=>{
    
    try {

        const user = await service.getProfile(req.user.uid)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})
router.patch('/',async(req,res,next)=>{
    
    try {
        const {body} = req
        await service.updateInfo(req.user.uid,body)
        res.status(200).json({
            message:"updated succesfull"
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/',async (req,res,next)=>{
    
    try {

        await service.deleteProfile(req.user.uid)
        res.status(200).json({
            message:"Account deleted"
        })
    } catch (error) {
        next(error)
    }
})



module.exports = router