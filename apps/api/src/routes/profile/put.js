const { ProfileService } = require("../../services/profile.service");

const service = new ProfileService()
function updateAllInfo(req,res,next) {
    try {
        const profile = service.updateAllInfo(req.user,req.body)
        res.json({profile})
    } catch (error) {
        next(error)
    }
}