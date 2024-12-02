import { useEffect, useMemo, useState } from "react";
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
`;

const ChatName = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
`;

const ChatText = styled.span`
  font-family: inherit;
`;

function ChatBoxMessagesDiv() {
  const { selectedRoom, userId } = useSelector((state) => state.chat);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // getting all the previous messages from when joined
  useEffect(() => {
    if (!selectedRoom) return;

    const handleGetAllMessages = async () => {
      const messages = await getAllMessages(selectedRoom, userId);
      setMessages(messages);
    };

    handleGetAllMessages();
  }, [selectedRoom, userId]); // although user ID may not change but still is a good practice to consider

  // getting messages in realtime from supabase
  useEffect(() => {
    if (!selectedRoom) return;
    const handleMessages = (newMessages) => {
      setMessages((prev) => [...prev, newMessages]);
    };

    let channel;
    const handleMessageSubscription = async () => {
      try {
        setIsLoading(true);
        channel = await subscribeToMessage(selectedRoom, handleMessages); // Subscribe
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    handleMessageSubscription();

    return () => {
      if (channel) {
        try {
          supabase.removeChannel(channel);
        } catch (err) {
          throw new Error(err.message);
        }
      }
    };
  }, [selectedRoom]);

  const messagesList = useMemo(
    () =>
      !isLoading &&
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
      )),
    [messages]
  );

  return (
    <Container>
      {isLoading && <h1>LOADING . . . </h1>}
      {messagesList}
    </Container>
  );
}

export default ChatBoxMessagesDiv;
