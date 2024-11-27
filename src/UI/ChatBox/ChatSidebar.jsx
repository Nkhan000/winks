import { PiChatsCircleFill } from "react-icons/pi";
import { IoCreate } from "react-icons/io5";

import styled from "styled-components";
import ToggleMenu from "../ToggleMenu";
import { useSelector } from "react-redux";
// import { getAllRooms } from "../../Features/ChatService";
import { useEffect, useState } from "react";
import { roomData } from "../../Features/ChatService";

const ChatSideBar = styled.aside`
  height: 100%;
  border-right: 1px solid var(--color-grey-800);

  overflow-y: scroll;
  /* overflow-x: hidden; */
`;

const SidebarHead = styled.div`
  display: grid;
  grid-template-columns: 1fr 3rem;
  border-bottom: 1px solid var(--color-grey-200);
  padding: 0 1rem;
  align-items: center;
`;

const ChatLogoDiv = styled.div`
  display: flex;
  gap: 1rem;
  font-style: italic;
  align-items: center;

  /* justify-content: center; */
`;

const ChatLogoTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
`;

const ChatLogoTextBg = styled.span`
  font-size: 1.6rem;
  font-family: "Coiny", system-ui;
`;
const ChatLogoTextSm = styled.span`
  font-size: 1rem;
  font-style: italic;
  color: var(--color-grey-800);
`;

const IconDiv = styled.div`
  height: 2.6rem;
  width: 2.6rem;
  overflow: hidden;
  font-weight: 600;

  & svg {
    height: 100%;
    width: 100%;
    font-size: 2.6rem;
  }
`;

const AddNewChatDiv = styled.div`
  height: 2.2rem;
  width: 2.2rem;
`;

const AddIconDiv = styled.div`
  height: 2.6rem;
  width: 2.6rem;
  background-color: transparent;
  outline: none;
  border: none;

  display: flex;
  /* padding: 1rem; */

  &:focus,
  &:active {
    outline: 1px solid var(--color-grey-700);
  }
  svg {
    font-size: 2.2rem;
  }
`;

// const Add

//

const ChatOptionsDiv = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ChatOption = styled.li`
  display: grid;
  grid-template-columns: 5rem 1fr;
  align-items: center;
  padding: 0.8rem 2rem;
  cursor: pointer;

  &:last-child {
    &:hover {
      border-bottom-left-radius: 1rem;
    }
  }

  &:hover {
    background-color: var(--color-grey-100);
  }

  &:active {
    background-color: var(--color-grey-300);
  }
`;

const ChatIcon = styled.div`
  border-radius: 50%;
  border: 1px solid;
  background-color: var(--color-grey-100);
  height: 4rem;
  width: 4rem;
  overflow: hidden;
`;
const StyledImg = styled.img`
  height: 100%;
  width: 100%;
  background-size: cover;
`;
const ChatTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0;
  /* padding-right: 2rem; */
`;

const ChatTime = styled.span`
  font-weight: 600;
  font-size: 1rem;
  font-style: italic;
`;
const ChatHeadDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ChatName = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
`;
const ChatText = styled.span`
  font-size: 1.3rem;
`;

function ChatSidebar({ createRoom, joinRoom }) {
  const { userId, selectedRoom, totalRooms } = useSelector(
    (state) => state.chat
  );
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        const data = await Promise.all(
          totalRooms.map((item) => roomData(item))
        );

        setRooms(data.map((room) => room[0]));
      } catch (err) {
        console.log("Error loading the rooms", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (totalRooms.length > 0) {
      fetchRooms();
    }
  }, [totalRooms]);

  if (!isLoading) {
    // console.log(rooms);
  }

  return (
    <ChatSideBar>
      <SidebarHead>
        <ChatLogoDiv>
          <IconDiv>
            <svg>
              <PiChatsCircleFill />
            </svg>
          </IconDiv>

          <ChatLogoTextDiv>
            <ChatLogoTextBg>Your Room</ChatLogoTextBg>
            <ChatLogoTextSm>Created On : 2024/11/15</ChatLogoTextSm>
          </ChatLogoTextDiv>
        </ChatLogoDiv>
        <AddNewChatDiv>
          <ToggleMenu>
            <ToggleMenu.Menu>
              <ToggleMenu.Toggle id="room-operation">
                <AddIconDiv aria-label="create new room">
                  <svg aria-label="create new room">
                    <title>create new room</title>
                    <IoCreate />
                  </svg>
                </AddIconDiv>
                <ToggleMenu.List id="room-operation">
                  <ToggleMenu.Button onClickFunc={joinRoom}>
                    join existing Chat
                  </ToggleMenu.Button>
                  <ToggleMenu.Button onClickFunc={createRoom}>
                    create a new chat
                  </ToggleMenu.Button>
                  <ToggleMenu.Button>Delete Room</ToggleMenu.Button>
                </ToggleMenu.List>
              </ToggleMenu.Toggle>
            </ToggleMenu.Menu>
          </ToggleMenu>
        </AddNewChatDiv>
      </SidebarHead>

      <ChatOptionsDiv>
        {rooms &&
          rooms.map((room) => (
            <ChatOption key={room.id}>
              <ChatIcon>
                <StyledImg src="./img/3.png" alt="" />
              </ChatIcon>
              <ChatTextDiv>
                <ChatHeadDiv>
                  <ChatName>{room.name}</ChatName>
                  <ChatTime>
                    {(
                      (new Date() - new Date(room.created_at).getTime()) /
                      60000
                    ).toFixed(0)}{" "}
                    Minutes ago
                  </ChatTime>
                </ChatHeadDiv>
                <ChatText>Allen : We can afford this I guess</ChatText>
              </ChatTextDiv>
            </ChatOption>
          ))}
      </ChatOptionsDiv>
    </ChatSideBar>
  );
}

export default ChatSidebar;
