const mongoose = require('mongoose');

const Thread = require('../models/thread');
const User = require('../models/user');

exports.createThread = async (req, res, next) => {
  try {
    const title = req.body.title;
    const category = req.body.category;
    const description = req.body.description;

    const thread = new Thread({
      title: title,
      category: category,
      description: description,
      creator: mongoose.Types.ObjectId(req.body.userId),
    });
    const createdThread = await thread.save();
    res.status(200).json({ createdThread: createdThread });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getThread = async (req, res, next) => {
  try {
    const thread = await Thread.findById(req.query.id)
      .populate('creator')
      .populate({
        path: 'comments',
        populate: {
          path: 'creator',
          model: 'User',
        },
      });
    res.status(200).json({ thread: thread });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getThreads = async (req, res, next) => {
  try {
    const thread = await Thread.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: '$category',
          title: { $push: '$title' },
          id: { $push: '$_id' },
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          mostRecentTitle: { $slice: ['$title', 0, 3] },
          ids: { $slice: ['$id', 0, 3] },
        },
      },
    ]);

    res.status(200).json({ thread: thread });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
