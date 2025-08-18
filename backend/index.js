const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/codevision", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

const User = require("./models/User");

async function createTestUser() {
  const user = new User({
    name: "Alice",
    email: "alice@example.com",
    password: "123456",
    role: "student"
  });

  await user.save();
  console.log("User saved:", user);
}

createTestUser();

const Room = require("./models/Room");

async function createTestRoom() {
  const room = new Room({
    name: "Math Exam",
    type: "exam",
    teacher: (await User.findOne({ email: "alice@example.com" }))._id
  });

  await room.save();
  console.log("Room saved:", room);
}

createTestRoom();
