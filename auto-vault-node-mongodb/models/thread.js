const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const threadSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: { type: String, required: true },
    description: {
      type: Object,
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.model('Thread', threadSchema);
