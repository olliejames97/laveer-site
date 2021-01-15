import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import { MessageType } from "./types";
import { Me } from "../../App";
import { config } from "../../config";

const NEW_CHAT_MESSAGE_EVENT = "MESSAGE"; // Name of the event
const SOCKET_SERVER_URL = config.apiUrl;

type SendableMessage = {
  body: string;
  sender: Me;
};

const useChat = (
  roomId: string
): {
  messages: Array<MessageType>;
  sendMessage: (message: SendableMessage) => void;
  sendLocalMessage: (message: string) => void;
} => {
  const [messages, setMessages] = useState<Array<MessageType>>([]); // Sent and received messages
  const socketRef = useRef<SocketIOClient.Socket | undefined>();

  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    sendLocalMessage("in room: " + roomId);

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message: any) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef?.current?.id,
      };
      setMessages((messages: any) => [...messages, incomingMessage]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      sendLocalMessage("disconnected");
      socketRef?.current?.disconnect();
    };
  }, [roomId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (message: SendableMessage) => {
    socketRef?.current?.emit(NEW_CHAT_MESSAGE_EVENT, {
      ...message,
      sender: {
        ...message.sender,
        id: socketRef.current.id,
      },
    });
  };

  const sendLocalMessage = (message: string) => {
    setMessages([
      ...messages,
      {
        body: message,
        sender: {
          id: "local",
          color: "grey",
        },
      },
    ]);
  };

  return { messages, sendMessage, sendLocalMessage };
};

export default useChat;
