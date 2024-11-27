import styled from "styled-components";
import ChatSidebar from "../UI/ChatBox/ChatSidebar";
import ChatMainDiv from "../UI/ChatBox/ChatMainDiv";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  addNewRoom,
  addUserId,
  addUserName,
  removeSelectedRoom,
  selectNewRoom,
} from "../Features/ChatSlice";
import { createRoom, joinRoom } from "../Features/ChatService";

const Container = styled.section`
  /* height: 150vh; */
  display: flex;
  justify-content: center;
  /* padding: 3rem; */
`;

const ChatContainer = styled.div`
  width: 85%;
  height: 98vh;
  border: 1px solid;
  background-color: var(--color-grey-0);
  border-radius: 1rem;

  display: grid;
  grid-template-columns: 35rem 1fr;
`;

function NewChat() {
  const state = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (state.userId) {
      setUserId(state.userId);
    } else {
      const randomUserId = uuidv4();
      setUserId(randomUserId);
      dispatch(addUserId(randomUserId));
    }

    if (state.userName) {
      setUserName(state.userName);
    }
  }, [state.userId, state.userName]);

  const handleCreateRoom = async () => {
    const roomName = prompt("Enter Room Name : ");
    if (!userName) {
      const user = prompt("Enter User Name : ");
      setUserName(user);
      dispatch(addUserName(user));
    }
    const userLimit = prompt("Enter limit for the room (min : 2) : ");
    const room = await createRoom(userId, roomName, userLimit, userName);
    dispatch(addNewRoom(room[0].id));
    // dispatch(addUserName(userName));
    dispatch(removeSelectedRoom());
    dispatch(selectNewRoom(room[0].id));
  };

  const handleJoinRoom = async () => {
    const joiningRoomId = prompt("Enter a room id : ");
    const userName = prompt("Enter User Name : ");
    const room = await joinRoom(userId, joiningRoomId, userName);
    dispatch(addNewRoom(room.id));

    dispatch(removeSelectedRoom());
    dispatch(selectNewRoom(room.id));
  };

  return (
    <Container>
      <ChatContainer>
        <ChatSidebar createRoom={handleCreateRoom} joinRoom={handleJoinRoom} />
        <ChatMainDiv createRoom={handleCreateRoom} joinRoom={handleJoinRoom} />
      </ChatContainer>
    </Container>
  );
}

export default NewChat;
