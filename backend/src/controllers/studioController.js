const Studio = require('../models/Studio');

exports.getAllStudios = async (req, res) => {
  const studios = await Studio.find();
  res.json(studios);
};

exports.createStudio = async (req, res) => {
  const studio = await Studio.create(req.body);
  res.json(studio);
};
