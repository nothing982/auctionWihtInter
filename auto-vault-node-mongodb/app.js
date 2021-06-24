const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');

const Vehicle = require('./models/vehicle');
const User = require('./models/user');

const bodyParser = require('body-parser');

const STRIPE_SECRET_KEY =
  'sk_test_51J4vwtH7Iinz1VCHDJrr9CB0kbTq5t4X10kmkOiUxvwY5HAEZKszGFvno77Bg1Z4FIN9dN6ox6g1lXexWeVKnKjy00v3i7fU8i';
const STRIPE_PUBLISHABLE_KEY =
  'pk_test_51J4vwtH7Iinz1VCHjOXPL2hObZGD7D06BGfIiz9wtzgL4LLivcrmbW7atpmlsZgLwXNzFfyK0U2TMvrCdyc9HmEP00urlLQkY9';

const stripe = require('stripe')(STRIPE_SECRET_KEY);

let topBids;
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  addBid,
  getBids,
} = require('./socketUsers');

const {
  addMessagingUser,
  addMessage,
  removeMessagingUser,
  getMessagingUser,
  getMessagingUsersInRoom,
} = require('./socketMessage');

const authRoutes = require('./routes/auth');

const vehicleRoutes = require('./routes/vehicle');

const threadRoutes = require('./routes/thread');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());

app.use(bodyParser.json());

app.use('/car', vehicleRoutes);

app.use('/auth', authRoutes);

app.use('/thread', threadRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    'mongodb+srv://autovault:autovault123@cluster0.xn1jn.mongodb.net/auto-vault?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    server.listen(5000);
  })
  .catch((err) => console.log(err));

io.on('connection', (socket) => {
  socket.on('joinThread', ({ name, room }, callback) => {
    const { error, user } = addMessagingUser({ id: socket.id, name, room });
    if (error) {
      return callback(error);
    }
    socket.join(user.room);
    io.in(user.room).emit('threadUserJoined', {
      message: `${name} has joined!`,
    });
  });

  socket.on('sendMessage', async ({ message, id, threadId }) => {
    try {
      const user = getMessagingUser(socket.id);
      console.log(getMessagingUsersInRoom(user.room));
      const comment = await addMessage(message, id, threadId);
      if (comment) {
        console.log(comment);
        io.in(user.room).emit('updateComments', { comment: comment });
      }
    } catch (err) {
      throw err;
    }
  });
  socket.on('join', ({ name, room, userId }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, userId, room });
    if (error) {
      return callback(error);
    }
    socket.join(user.room);
    io.in(user.room).emit('messageUserJoined', {
      message: `${name} has joined!`,
    });
  });
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    const messagingUser = removeMessagingUser(socket.id);
    if (user) {
      socket.broadcast
        .to(user.room)
        .emit('leftMessage', `${user.name} has left the auction`);
    }
  });
  socket.on('placeBid', ({ bid }) => {
    const user = getUser(socket.id);

    const showBid = addBid(bid, user);

    if (showBid) {
      io.in(user.room).emit('bidSuccessful', {
        message: `${user.name} has placed a bid of ${showBid.totalBid}$`,
      });
    }
  });
  socket.on('auctionFinished', ({ room }) => {
    const bids = getBids();
    bidValue = 0;
    topBids = bids.reduce((unique, o) => {
      if (
        !unique.some(
          (obj) => obj.user.name === o.user.name && obj.user.room === room
        )
      ) {
        unique.push(o);
      }
      return unique;
    }, []);
    let winningUser = topBids.find((bid) => bid.user.room === room);
    io.to(winningUser.user.id).emit('informWinner', {
      message: `You have won the Auction in Room ${winningUser.user.room}`,
    });
  });

  socket.on(
    'completePayment',
    async ({ token, buyerUserId, sellerUserId, room, name }) => {
      try {
        let winningUser = topBids.find((bid) => bid.user.room === room);
        // console.log(winningUser.totalBid);
        const vehicle = await Vehicle.findOne({ vin: room });
        const idempotencyKey = vehicle._id;

        const customer = await stripe.customers.create({ source: token.id });
        const result = await stripe.charges.create(
          {
            amount: winningUser.totalBid * 100,
            currency: 'usd',
            customer: customer.id,
            description: `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
          },
          { idempotencyKey }
        );
        const [buyerUser, sellerUser] = await Promise.all([
          User.findById({ _id: buyerUserId }),
          User.findById({ _id: sellerUserId }),
        ]);
        vehicle.soldPrice = winningUser.totalBid;
        vehicle.isAuction = false;
        const savedVehicle = await vehicle.save();
        buyerUser.boughtVehicles.push(savedVehicle);
        const savedBuyerUser = await buyerUser.save();
        sellerUser.soldVehicles.push(savedVehicle);
        const savedSellerUser = await sellerUser.save();
        console.log(savedSellerUser);
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    }
  );

  socket.on('refreshTime', () => {
    const user = getUser(socket.id);
    if (user) {
      io.in(user.room).emit('updateTime');
    }
  });
});
