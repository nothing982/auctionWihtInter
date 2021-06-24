const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    consumerType: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    vehicles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
      },
    ],
    threads: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thread',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    blog: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
    blogComments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'BlogComment',
      },
    ],
    soldVehicles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
      },
    ],

    unSoldVehicles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
      },
    ],

    boughtVehicles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
