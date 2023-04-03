import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "@firebase/firestore";
import { db } from "../../services/firebase/init";
import { Message } from "./InBox";

export interface IMessage {
  id: string;
  message: string;
  isMe: boolean;
  time: string;
  avatar?: string;
}

export interface IProps {
  messages: IMessage[];
  senderName: string;
  senderAvatar: string;
  onClose: () => void;
  roomId: string,
  friendId: string,
  userId: string,
}

const MessageComponent: React.FC<IProps> = ({
  messages,
  senderName,
  senderAvatar,
  onClose,
  roomId,
  friendId,
  userId,
}) => {

  const [inputValue, setInputValue] = useState("");
  const messageEndRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleMessageSend();
    }
  };

  const handleMessageSend = async () => {
    if (inputValue.trim() !== "") {
      const MessageToSendFirebase = {
        userID: userId,
        text: inputValue.trim(),
        createdTime: serverTimestamp(),
      }
      console.log(MessageToSendFirebase);
      console.log(userId)
      handleSendMessageToFirebase(roomId, MessageToSendFirebase)
      .then((message: any) => {
        setInputValue("");
      })
      .catch((error: any) => {

      });

    }
  };

  async function handleSendMessageToFirebase(roomId: string, message: any) {
    const roomRef = doc(db, "messages", roomId);
    const roomSnap = await getDoc(roomRef);
    if (roomSnap.exists()) {
      addDoc(collection(roomRef, "chat"), message);
    }
    else {
      const collectionRef = collection(db, "messages", roomId, "chat");
      addDoc(collectionRef, message);
    }
    console.log("Added");
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [inputValue]);

  return (
    <div className="message-container">
      <div className="message-header">
        <img src={senderAvatar} alt="Avatar" />
        <h3>{senderName}</h3>
        <button onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="message-body">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.isMe ? "right" : "left"}`}>
            {!message.isMe && <img src={message.avatar} alt="Avatar" />}
            <div className="message-content">
              <div className="message-background">
                <p>{message.message}</p>
              </div>
              <div className={`message-content ${message.isMe ? "time-right" : "time-left "}`}>
                <span>{message.time}</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className="message-footer">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
        />
        <button onClick={handleMessageSend}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default MessageComponent;
