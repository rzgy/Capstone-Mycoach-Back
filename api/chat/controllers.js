const ChatRoom = require("../../models/ChatRoom");
const Messages = require("../../models/Message");
const Coach = require("../../models/Coach");

//Get all chat rooms for a particular Coach
const getAllChatRooms = async (req, res, next) => {
  try {
    console.log("req.coach:", req.user);

    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: "Coach information is missing" });
    }

    const foundChatRooms = await ChatRoom.find({
      participants: { $in: [req.user._id] },
    })
      .populate({
        path: "participants",
        match: { _id: { $ne: req.user._id } },
      })
      .populate("messages");

    console.log("foundChatRooms:", foundChatRooms);

    return res.status(200).json(foundChatRooms);
  } catch (error) {
    console.error("Error in getAllChatRooms:", error);
    next(error);
  }
};

//Get one chatroom between one Coach and another

//I can also get chatroom by the room's id.
const getChatRoom = async (req, res, next) => {
  try {
    const chatRoom = await ChatRoom.findOne({
      participants: { $all: [req.user._id, req.params.id] }, // Maybe this has to be a user id
    }).populate("messages");
    if (!chatRoom)
      return res.status(404).json({ message: "Chat Room Not Found" });
    return res.status(200).json(chatRoom);
  } catch (error) {
    next(error);
  }
};

//Create a new chat room
const createChatRoom = async (req, res, next) => {
  try {
    const fromCoach = await Coach.findById(req.user.id);
    const toCoach = await Coach.findById(req.params.id);
    const { message } = req.body;
    const chatRoom = await ChatRoom.create({
      participants: [fromCoach._id, toCoach._id],
    });
    const newMessage = await Messages.create({
      from: fromCoach._id,
      to: toCoach._id,
      content: message,
      chatRoom: chatRoom._id,
    });
    chatRoom.messages.push(newMessage._id);
    await chatRoom.save();

    fromCoach.chatRooms.push(chatRoom._id);
    await fromCoach.save();
    toCoach.chatRooms.push(chatRoom._id);
    await toCoach.save();
    return res.status(201).json(chatRoom);
  } catch (error) {
    next(error);
  }
};

const getChatRoomByID = async (req, res, next) => {
  try {
    const chatRoom = await ChatRoom.findById(req.params.id).populate(
      "messages"
    );
    if (!chatRoom)
      return res.status(404).json({ message: "Chat Room Not Found" });
    return res.status(200).json(chatRoom);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllChatRooms,
  getChatRoom,
  createChatRoom,
  getChatRoomByID,
};
