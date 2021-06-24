const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema(
  {
    vin: {
      type: String,
      required: true,
    },
    isAuction: {
      type: Boolean,
      required: true,
      default: true,
    },
    year: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    vehicleBodyType: {
      type: String,
    },
    transmissionType: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    drivetrain: {
      type: String,
    },
    comments: {
      type: String,
      required: true,
    },
    engineType: {
      type: String,
      required: true,
    },
    auctionTime: {
      type: Date,
    },
    auctionSheet: {
      type: String,
      required: true,
    },
    auctionType: {
      type: String,
      required: true,
    },
    soldPrice: {
      type: Number,
    },
    preBidPrice: {
      type: Number,
      required: true,
    },
    imageUrl: [
      {
        type: String,
        required: true,
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
