const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Project = require('../models/Project');

/*--------------------------------------------------
Desc: Get All Projects
Route: GET /api/v1/projects
Access: Public
--------------------------------------------------*/
exports.getAllProjects = asyncHandler(async (req, res, next) => {
  const query = Project.find();

  const projects = await query;

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

/*--------------------------------------------------
Desc: Post A Projects
Route: POST /api/v1/projects
Access: PRIVATE
--------------------------------------------------*/
exports.createProject = asyncHandler(async (req, res, next) => {
  const project = await Project.create(req.body);

  res.status(201).json({
    success: true,
    data: project,
  });
});
