const Message = require("../../models/Message");
const Coach = require("../../models/Coach");
const ChatRoom = require("../../models/ChatRoom");
const User = require("../../models/User");
const addMessage = async (req, res, next) => {
  try {
    const senderID = req.user._id; //this might be sticked to user aswell
    const { receiverID, message, fromCoach } = req.body;

    // const chatRoom = await ChatRoom.findById(chatRoomID);
    const sender = await Coach.findById(senderID);
    const receiver = await User.findById(receiverID);
    const newMessage = await Message.create({
      from: sender._id,
      to: receiver._id,
      content: message,
      fromCoach,
    });
    // chatRoom.messages.push(newMessage._id);
    // await chatRoom.save();
    return res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const to = req.params.userId;
    const from = req.user._id;
    console.log("first");
    const messages = await Message.find({
      to: to,
      from: from,
    });
    console.log("first");

    return res.status(200).json({ messages });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports = {
  addMessage,
  getMessages,
};
