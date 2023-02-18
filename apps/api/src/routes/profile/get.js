const { ProfileService } = require("../../services/profile.service");

const service = new ProfileService()
function getProfile(req,res,next) {
    try {
        const profile = service.getProfile(req.user)
        res.json({profile})
    } catch (error) {
        next(error)
    }
}