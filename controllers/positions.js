const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Position = require('../models/Position');

/*--------------------------------------------------
Desc: Get All Projects
Route: GET /api/v1/projects
Access: Public
--------------------------------------------------*/

exports.getAllPositions = asyncHandler(async (req, res, next) => {
  const query = Position.find();

  const positions = await query;

  res.status(200).json({
    success: true,
    count: positions.length,
    data: positions,
  });
});

/*--------------------------------------------------
Desc: Post A Projects
Route: POST /api/v1/projects
Access: PRIVATE
--------------------------------------------------*/

exports.createPosition = asyncHandler(async (req, res, next) => {
  const position = await Position.create(req.body);

  res.status(201).json({
    success: true,
    data: position,
  });
});
