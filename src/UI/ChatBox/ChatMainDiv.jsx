/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import ChatBoxHead from "./ChatBoxHead";
import ChatBoxMessagesDiv from "./ChatBoxMessagesDiv";
import ChatBoxInputDiv from "./ChatBoxInputDiv";
import {
  createRoom,
  // getAllRooms,
  joinRoom,
  subscribeToJoin,
  subscribeToMessage,
} from "../../Features/ChatService";
import { v4 as uuidv4 } from "uuid";

import { useEffect, useState } from "react";
import AddNewRoom from "./AddNewRoomDiv";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewRoom,
  addUserId,
  addUserName,
  removeSelectedRoom,
  selectNewRoom,
} from "../../Features/ChatSlice";
import { supabase } from "../../Client/supabaseClient";

const Container = styled.div`
  height: 100%;

  display: grid;
  grid-template-rows: 8rem 1fr 5rem;
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
      console.log(selectedRoom);

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
