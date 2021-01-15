import * as React from "react";
import { useEffect, useState } from "react";
import { Chat } from "./components/Chat";
import useChat from "./components/chat/useChat";
import { getQueryVariable } from "./components/helpers";

export type Me = {
  color: string;
};

const App = () => {
  const [roomId] = useState(getQueryVariable("room") ?? "global");
  const { messages, sendMessage, sendLocalMessage } = useChat(roomId);
  const [me, setMe] = useState<Me>({
    color: "",
  });

  useEffect(() => {
    setMe({
      color:
        "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
    });
    sendLocalMessage("Joining...");
  }, []);
  return (
    <div
      className="App"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p>Room: {roomId}</p>
      <Chat
        messages={messages}
        onSubmit={(text: string) => {
          console.log("submitting", text);
          sendMessage({
            body: text,
            sender: me,
          });
        }}
      />
    </div>
  );
};

export default App;
