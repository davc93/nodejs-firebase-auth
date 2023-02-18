const { ProfileService } = require("../../services/profile.service");

const service = new ProfileService()
function deleteProfile(req,res,next) {
    try {
        const profile = service.deleteProfile(req.user)
        res.json({profile})
    } catch (error) {
        next(error)
    }
}