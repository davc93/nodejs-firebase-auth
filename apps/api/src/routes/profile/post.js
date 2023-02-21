const { ProfileService } = require('../../services/profile.service');

const service = new ProfileService();
function addInfo(req, res, next) {
  try {
    const profile = service.createInfo(req.user, req.body);
    res.json({ profile });
  } catch (error) {
    next(error);
  }
}
