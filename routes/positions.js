const express = require('express');

const {
  getAllPositions,
  createPosition,
} = require('../controllers/positions');

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(getAllPositions)
  .post(createPosition);

module.exports = router;
