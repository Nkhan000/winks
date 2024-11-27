/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import ChatBoxHead from "./ChatBoxHead";
import ChatBoxMessagesDiv from "./ChatBoxMessagesDiv";
import ChatBoxInputDiv from "./ChatBoxInputDiv";
import { subscribeToJoin } from "../../Features/ChatService";

import { useEffect, useState } from "react";
import AddNewRoom from "./AddNewRoomDiv";
import { useSelector } from "react-redux";

import { supabase } from "../../Client/supabaseClient";

const Container = styled.div`
  /* height: 50%; */
  display: grid;
  grid-template-rows: 8rem 1fr 5rem;
  overflow-y: scroll;
`;

function ChatMainDiv({ createRoom, joinRoom }) {
  const { selectedRoom: selectedRoomFromStore } = useSelector(
    (state) => state.chat
  );
  const [selectedRoom, setSelectedRoom] = useState();

  useEffect(() => {
    if (selectedRoomFromStore) {
      setSelectedRoom(selectedRoomFromStore);
    }
  }, [selectedRoomFromStore]);

  useEffect(() => {
    if (selectedRoom) {
      const handleNewCount = (newCount) => {
        console.log("User has joined the room. Total counts : ", newCount);
      };

      const channel = subscribeToJoin(selectedRoom, handleNewCount);

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [selectedRoom]);

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
