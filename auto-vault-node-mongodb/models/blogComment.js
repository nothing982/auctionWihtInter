const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogCommentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BlogComment', blogCommentSchema);
