import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { supabase } from "../../Client/supabaseClient";
import { getAllMessages, subscribeToMessage } from "../../Features/ChatService";

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 1rem 2rem;
`;

const ChatBubbleDiv = styled.li`
  width: 100%;
  display: flex;

  ${(props) =>
    props.isUser === true
      ? css`
          justify-content: flex-end;
        `
      : css`
          justify-content: flex-start;
        `}
`;

const ChatBubbleDivInner = styled.div`
  width: max-content;
  max-width: 25rem;
  min-height: 1rem;
  border-radius: 0.8rem;
  box-shadow: 0.5rem 0.5rem 0.1rem #57575722;
  padding: 1rem;
`;

const ChatIcon = styled.div``;

const ChatTime = styled.div``;

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
        channel = await subscribeToMessage(selectedRoom, handleMessages);
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
      {messages.length > 0 &&
        messages.map((msg) => (
          <ChatBubbleDiv isUser={msg.sender === userId} key={msg.id}>
            <ChatBubbleDivInner>
              <ChatText>{msg.message}</ChatText>
            </ChatBubbleDivInner>
          </ChatBubbleDiv>
        ))}
    </Container>
  );
}

export default ChatBoxMessagesDiv;
