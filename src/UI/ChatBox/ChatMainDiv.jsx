/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import ChatBoxHead from "./ChatBoxHead";
import ChatBoxMessagesDiv from "./ChatBoxMessagesDiv";
import ChatBoxInputDiv from "./ChatBoxInputDiv";
import { roomData, subscribeToJoin } from "../../Features/ChatService";

import { useEffect, useState } from "react";
import AddNewRoom from "./AddNewRoomDiv";
import { useSelector } from "react-redux";

import { supabase } from "../../Client/supabaseClient";

const Container = styled.div`
  display: grid;
  grid-template-rows: 8rem 1fr 5rem;
  overflow-y: scroll;
`;

function ChatMainDiv({ createRoom, joinRoom }) {
  const { selectedRoom } = useSelector((state) => state.chat);

  // Getting users count whenever a new user joins the room
  useEffect(() => {
    if (!selectedRoom) return;

    const handleNewCount = (newCount) => {
      console.log("User has joined the room. Total counts : ", newCount);
      let channel;
      const initializeChannel = async () => {
        try {
          channel = await subscribeToJoin(selectedRoom, handleNewCount);
        } catch (err) {
          console.log("ERROR : COUNTING COUNTS OF USERS");
          throw new Error(err.message);
        }
      };

      initializeChannel();

      return () => {
        if (channel) {
          try {
            supabase.removeChannel(channel);
            console.log("Channel removed for room:", selectedRoom);
          } catch (error) {
            console.error("ERROR: Unable to remove channel", error.message);
          }
        }
      };
    };
  }, []);

  return !selectedRoom ? (
    <AddNewRoom createRoom={createRoom} joinRoom={joinRoom} />
  ) : (
    <Container>
      <ChatBoxHead />
      <ChatBoxMessagesDiv />
      <ChatBoxInputDiv />
    </Container>
  );
}

export default ChatMainDiv;
