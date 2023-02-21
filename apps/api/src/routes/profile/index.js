const express = require('express');

const router = express.Router();

router.get('/', getProfile);
router.post('/', addInfo);
router.put('/', updateAllInfo);
router.patch('/', updateProfile);
router.delete('/', deleteProfile);

module.exports = router;
