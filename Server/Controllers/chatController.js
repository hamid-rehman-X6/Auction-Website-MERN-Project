// const ChatMessage = require("../Models/ChatMessage");

// const handleUserMessage = async (socket, msg) => {
//     const chatMessage = new ChatMessage({
//         sender: msg.sender,
//         recipient: msg.recipient,
//         message: msg.message,
//         timestamp: new Date(),
//     });
//     await chatMessage.save();
//     socket.broadcast.emit("message", msg);
// };

// const startChat = (io, data) => {
//     io.emit("chatStarted", data);
// };

// module.exports = {
//     handleUserMessage,
//     startChat,
// };
