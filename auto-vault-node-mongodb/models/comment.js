const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    comment: {
      type: Object,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    thread: {
      type: Schema.Types.ObjectId,
      ref: 'Thread',
      required: true,
    },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.model('Comment', commentSchema);
