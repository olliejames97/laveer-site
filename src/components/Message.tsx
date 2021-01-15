import * as React from "react";
import { MessageType } from "./chat/types";
import styled from "@emotion/styled";

const MessageFragment = styled.div`
  padding: 0;
  margin: 0;
  margin-right: 2px;
`;

export const Message = (props: { message: MessageType }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <MessageFragment
        style={{
          backgroundColor: props.message.sender.color,
        }}
      >
        {props.message.sender.id.substr(0, 6)}
      </MessageFragment>
      <MessageFragment>
        <MessageProcessor>{props.message.body}</MessageProcessor>
      </MessageFragment>
    </div>
  );
};

const MessageProcessor = (props: { children: string }) => {
  return <>{props.children}</>;
};
