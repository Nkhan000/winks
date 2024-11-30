import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { supabase } from "../../Client/supabaseClient";
import {
  addSenderName,
  getAllMessages,
  subscribeToMessage,
} from "../../Features/ChatService";

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 1rem 2rem;
`;

const ChatBubbleDiv = styled.li`
  width: 100%;
  display: flex;
  /* flex-direction: column; */

  ${(props) =>
    props.isuser == "true"
      ? css`
          justify-content: flex-start;
          flex-direction: row-reverse;
        `
      : css`
          justify-content: flex-start;
          /* flex-direction: row; */
        `}
`;

const ChatBubbleDivInner = styled.div`
  width: max-content;
  max-width: 25rem;
  min-height: 1rem;
  border-radius: 0.8rem;
  box-shadow: 0.5rem 0.5rem 0.1rem #bef9f556;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  /* gap: 0.3rem; */
`;

const ChatIcon = styled.div``;

const ChatTime = styled.span`
  font-size: 0.9rem;
  font-weight: 300;
  padding: 0 2rem;
  /* font-style: italic; */

  /* align-self: flex-end; */
`;

const ChatName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
`;

const ChatText = styled.span`
  font-family: inherit;
`;

function ChatBoxMessagesDiv() {
  const { selectedRoom: selectedRoomFromStore, userId } = useSelector(
    (state) => state.chat
  );

  const [selectedRoom, setSelectedRoom] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // setting selected room to current state
  useEffect(() => {
    if (selectedRoomFromStore) {
      setSelectedRoom(selectedRoomFromStore);
    }
  }, [selectedRoomFromStore]);

  // setting current userId to current state
  useEffect(() => {
    if (userId) {
      setCurrentUserId(userId);
    }
  }, [userId]);

  // getting all the previous messages when joined
  useEffect(() => {
    if (selectedRoom) {
      const handleGetAllMessages = async () => {
        const messages = await getAllMessages(selectedRoom, currentUserId);
        setMessages(messages);
      };

      handleGetAllMessages();
    }
  }, [selectedRoom]);

  // getting messages in realtime from supabase
  useEffect(() => {
    if (selectedRoom) {
      const handleMessages = (newMessages) => {
        setMessages((prev) => [...prev, newMessages]);
      };

      let channel;
      const handleMessageSubscription = async () => {
        try {
          setIsLoading(true); // Set loading before starting
          channel = await subscribeToMessage(selectedRoom, handleMessages); // Subscribe
        } catch (err) {
          console.log("ERROR: Error during subscription", err.message);
        } finally {
          setIsLoading(false); // Ensure loading stops regardless of success or failure
        }
      };

      handleMessageSubscription();

      return () => {
        if (channel) {
          supabase.removeChannel(channel);
        }
      };
    }
  }, [selectedRoom]);

  return (
    <Container>
      {isLoading && <h1>LOADING . . . </h1>}

      {!isLoading &&
        messages.length > 0 &&
        messages.map((msg) => (
          <ChatBubbleDiv isuser={`${msg.sender === userId}`} key={msg.id}>
            <ChatBubbleDivInner>
              <ChatName>
                <span>{msg.user_name}</span>
              </ChatName>
              <ChatText>{msg.message}</ChatText>
            </ChatBubbleDivInner>
            <ChatTime>
              {new Date(msg.created_at).getHours() < 10
                ? `0${new Date(msg.created_at).getHours()}`
                : new Date(msg.created_at).getHours()}
              :
              {new Date(msg.created_at).getMinutes() < 10
                ? `0${new Date(msg.created_at).getMinutes()}`
                : new Date(msg.created_at).getMinutes()}
            </ChatTime>
          </ChatBubbleDiv>
        ))}
    </Container>
  );
}

export default ChatBoxMessagesDiv;
