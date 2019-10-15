const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Project = require('../models/project');

router.get('/', (req, res, next) => {
  Project.find()
    .select('name price _id')
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        projects: docs.map(doc => ({
          name: doc.name,
          description: doc.description,
          _id: doc._id,
          request: {
            type: 'GET',
            url: `http://localhost:3000/projects/${doc._id}`,
          },
        })),
      };
      if (docs.length >= 0) {
        console.log(response);
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: 'No entries found',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post('/', (req, res, next) => {
  const project = new Project({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
  });
  project
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Project created',
        createdProject: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: 'GET',
            url: `http://localhost:3000/projects/${result._id}`,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  console.log(id);
  Project.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        console.log(doc);
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: 'No valid entry found for provided ID',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    console.log(ops.value);
    updateOps[ops.propName] = ops.value;
  }
  Project.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Project.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Project deleted',
        result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
