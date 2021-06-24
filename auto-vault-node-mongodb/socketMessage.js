const users = [];

const mongoose = require('mongoose');
const Comment = require('./models/comment');
const Thread = require('./models/thread');

const addMessagingUser = ({ id, name, room }) => {
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (!name || !room) return { error: 'Username and room are required' };
  if (existingUser) return { error: 'You are already in the Auction Room' };

  const user = { id, name, room };

  users.push(user);

  return { user };
};

const removeMessagingUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getMessagingUser = (id) => users.find((user) => user.id === id);

const getMessagingUsersInRoom = (room) =>
  users.filter((user) => user.room === room);

const addMessage = async (message, id, threadId) => {
  try {
    const thread = await Thread.findById(threadId);
    const comment = new Comment({
      creator: mongoose.Types.ObjectId(id),
      comment: message,
      thread: mongoose.Types.ObjectId(threadId),
    });
    const savedComment = await comment.save().then((t) =>
      Comment.findById(comment._id)
        .populate('creator')
        .populate({
          path: 'comments',
          populate: {
            path: 'creator',
            model: 'User',
          },
        })
    );
    thread.comments.push(savedComment);
    const savedThread = await thread.save();
    return savedComment.toJSON();
  } catch (err) {
    return err;
  }
};
module.exports = {
  addMessagingUser,
  removeMessagingUser,
  getMessagingUser,
  getMessagingUsersInRoom,
  addMessage,
};
