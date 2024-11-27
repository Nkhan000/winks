import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { supabase } from "../../Client/supabaseClient";
import {
  getAllMessages,
  sendMessage,
  subscribeToMessage,
} from "../../Features/ChatService";
import { useForm } from "react-hook-form";

const Container = styled.div`
  height: 100%;
`;

function ChatBoxMessagesDiv() {
  const {
    selectedRoom: selectedRoomFromStore,
    userId,
    userName,
  } = useSelector((state) => state.chat);

  const [selectedRoom, setSelectedRoom] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();

  useEffect(() => {
    if (selectedRoomFromStore) {
      setSelectedRoom(selectedRoomFromStore);
    }
  }, [selectedRoomFromStore]);

  useEffect(() => {
    if (userId) {
      setCurrentUserId(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (selectedRoom) {
      const handleGetAllMessages = async () => {
        const messages = await getAllMessages(selectedRoom, currentUserId);
        setMessages(messages);
      };

      handleGetAllMessages();
    }
  }, [selectedRoom]);

  useEffect(() => {
    if (selectedRoom) {
      const handleMessages = (newMessages) => {
        console.log("New Messages : ", newMessages);
        setMessages((prev) => [...prev, ...newMessages]);
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

  async function sendMessageFunc(message) {
    await sendMessage(selectedRoom, currentUserId, message);
  }

  function onSubmit(data) {
    const { message } = data;
    sendMessageFunc(message);
  }
  const { handleSubmit, register } = useForm();
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="message" {...register("message")} />
        <button type="submit">Send</button>
      </form>

      {messages.length > 0 &&
        messages.map((msg) => (
          <div key={msg.id}>
            <span>{msg.message}</span>
          </div>
        ))}
    </Container>
  );
}

export default ChatBoxMessagesDiv;
