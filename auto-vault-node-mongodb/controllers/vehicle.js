const mongoose = require('mongoose');

const User = require('../models/user');
const Vehicle = require('../models/vehicle');

exports.addVehicle = async (req, res, next) => {
  console.log(req);
  try {
    const make = req.body.make;
    const model = req.body.model;
    const year = req.body.year;
    const vin = req.body.vin;
    const color = req.body.color;
    const transmissionType = req.body.transmissionType;
    const mileage = req.body.mileage;
    const engineType = req.body.engineType;
    const auctionType = req.body.auctionType;
    const preBidPrice = req.body.preBidPrice;
    const comments = req.body.comments;
    const auctionTime = req.body.auctionTime;
    const images = req.files.images.map((image) => image.location);
    const pdfFile = req.files.pdfFile[0].location;
    const vehicle = new Vehicle({
      make: make,
      model: model,
      year: year,
      vin: vin,
      color: color,
      transmissionType: transmissionType,
      mileage: mileage,
      engineType: engineType,
      auctionType: auctionType,
      preBidPrice: preBidPrice,
      comments: comments,
      auctionTime: auctionTime,
      imageUrl: images,
      auctionSheet: pdfFile,
      creator: mongoose.Types.ObjectId(req.body.userId),
    });

    const postedVehicle = await vehicle.save();
    res.status(200).json({ vehicle: postedVehicle, message: 'Vehicle Added!' });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getVehicles = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const vehicles = await Vehicle.find({ isAuction: true })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Vehicle.countDocuments();
    // console.log(vehicles);
    res.status(200).json({
      vehicles,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.filterVehicles = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const vehicles = await Vehicle.find({
      $or: [
        { make: { $in: req.body.make } },
        { model: { $in: req.body.model } },
      ],
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Vehicle.countDocuments();
    console.log(vehicles);
    res.status(200).json({
      vehicles,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
