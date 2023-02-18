const { ProfileService } = require("../../services/profile.service");

const service = new ProfileService()
function updateProfile(req,res,next) {
    try {
        const profile = service.updateInfo(req.user,req.body)
        res.json({profile})
    } catch (error) {
        next(error)
    }
}