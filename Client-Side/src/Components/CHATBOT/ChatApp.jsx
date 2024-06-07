import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./chatapp.css";

const socket = io("http://localhost:5000");

const ChatApp = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageAreaRef = useRef(null);

  useEffect(() => {
    let userName;
    do {
      userName = prompt("Please enter your name: ");
    } while (!userName);
    setName(userName);

    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      scrollToBottom();
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      const msg = {
        user: name,
        message: message.trim(),
      };

      setMessages([...messages, { ...msg, type: "outgoing" }]);
      setMessage("");
      scrollToBottom();
      socket.emit("message", msg);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
  };

  return (
    <section className="chat__section">
      <div className="brand">
        <img height="40" src="./chatbot.png" alt="Logo" />
        <h1>Talk Time</h1>
      </div>
      <div className="message__area" ref={messageAreaRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type || "incoming"}`}>
            <h4>{msg.user}</h4>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <div>
        <textarea
          id="textarea"
          cols="20"
          rows="1"
          placeholder="Write a message..."
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    </section>
  );
};

export default ChatApp;
