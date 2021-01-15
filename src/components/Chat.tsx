import * as React from "react";
import { colors } from "../theme";
import { MessageType } from "./chat/types";
import { useState } from "react";
import { Message } from "./Message";

type Props = {
  messages: Array<MessageType>;
  onSubmit: (message: string) => void;
};
export const Chat = (props: Props) => {
  const [message, setMessage] = useState<string>("");
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          backgroundColor: colors.background,
          overflow: "scroll",
        }}
      >
        {props.messages.map((d) => {
          return <Message message={d} />;
        })}
      </div>

      <textarea
        placeholder="Type here"
        style={{ width: "100%", height: 200 }}
        onSubmit={() => props.onSubmit(message)}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        value={message}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            props.onSubmit(message);
            setMessage("");
          }
        }}
      />
    </div>
  );
};
