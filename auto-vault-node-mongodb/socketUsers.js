const users = [];
const bids = [];
const roomBid = [];

const addUser = ({ id, name, userId, room }) => {
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (!name || !room) return { error: 'Username and room are required' };
  if (existingUser) return { error: 'You are already in the Auction Room' };

  const user = { id, name, userId, room };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const addBid = (userBid, user) => {
  let bidValue = bids.find((obj) => obj.user.room === user.room)?.totalBid;

  if (!bidValue) {
    bidValue = 0;
  }
  let totalBid = bidValue + userBid;

  const bid = {
    user,
    totalBid,
  };

  bids.unshift(bid);

  return bid;
};

const getBids = () => {
  if (bids) {
    return bids;
  }
};
module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  addBid,
  getBids,
};
