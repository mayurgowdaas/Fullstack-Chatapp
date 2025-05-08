import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReciverSocketId, io } from "../lib/socketio.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderid: myId, reciverid: userToChatId },
        { senderid: userToChatId, reciverid: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const sendMessages = async (req, res) => {
  try {
    const { pic, text } = req.body;
    const senderid = req.user._id;
    const { id: reciverid } = req.params;
    let imageUrl;
    if (pic) {
      const uploadedImage = await cloudinary.uploader.upload(pic);
      imageUrl = uploadedImage.secure_url;
    }
    const newMessage = new Message({
      senderid,
      reciverid,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    const reciverSocketId = getReciverSocketId(reciverid);
    io.to(reciverSocketId).emit("newMessage", newMessage);
    res.status(200).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
