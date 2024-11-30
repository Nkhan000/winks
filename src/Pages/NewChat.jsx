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
  overflow: hidden;
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
  const { userId: userIdFromStore, userName: userNameFromStore } = useSelector(
    (state) => state.chat
  );
  const dispatch = useDispatch();
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (userIdFromStore) {
      setUserId(userIdFromStore);
    } else {
      const randomUserId = uuidv4();
      setUserId(randomUserId);
      dispatch(addUserId(randomUserId));
    }
  }, [userIdFromStore]);

  useEffect(() => {
    if (userNameFromStore) {
      setUserName(userNameFromStore);
    }
  }, [userNameFromStore]);

  const handleCreateRoom = async () => {
    const roomName = prompt("Enter Room Name : ");
    const userLimit = prompt("Enter limit for the room (min : 2) : ");
    let user;
    if (!userName) {
      user = prompt("Enter user Name");
      dispatch(addUserName(user));
    }
    const room = await createRoom(
      userId,
      roomName,
      userLimit,
      user || userName
    );
    dispatch(addNewRoom(room[0].id));
    dispatch(removeSelectedRoom());
    dispatch(selectNewRoom(room[0].id));
  };

  const handleJoinRoom = async () => {
    const joiningRoomId = prompt("Enter a room id : ");
    let user;
    if (!userName) {
      user = prompt("Enter user Name :");
      dispatch(addUserName(user));
    }

    const room = await joinRoom(userId, joiningRoomId, user || userName);
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
