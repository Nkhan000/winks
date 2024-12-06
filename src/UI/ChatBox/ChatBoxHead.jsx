import styled from "styled-components";
import { CiMenuKebab } from "react-icons/ci";
import ToggleMenu from "../ToggleMenu";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { roomData } from "../../Features/ChatService";

const Container = styled.div`
  width: 100%;
  min-height: 100%;

  position: sticky;
  top: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background-color: var(--color-grey-100);
  border-top-right-radius: 1rem;
`;

const RoomNameDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const HeadTextBg = styled.span`
  font-weight: 600;
  font-size: 3rem;
`;
const HeadTextSm = styled.span`
  font-weight: 500;
  font-size: 1.3rem;
  /* align-self: center; */
`;

const RoomMenuDiv = styled.div``;

const HeadIconDiv = styled.div`
  background-color: transparent;
  border: none;
  outline: none;
  height: 3rem;
  width: 3rem;

  &:focus,
  &:active {
    outline: 1px solid var(--color-grey-800);
  }
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    & svg {
      font-size: 2.5rem;
    }
  }
`;

function ChatBoxHead() {
  const { selectedRoom, userName } = useSelector((state) => state.chat);
  const [currRoomData, setCurrRoomData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRoomDataLoading, setIsRoomDataLoading] = useState(false);
  const controller = new AbortController();

  useEffect(() => {
    if (!selectedRoom) return;
    const getCurrRoomData = async () => {
      try {
        setIsRoomDataLoading(true);
        const data = await roomData(selectedRoom);
        setCurrRoomData(data);
      } catch (err) {
        console.log("ERROR : Error getting the room data");
      } finally {
        setIsRoomDataLoading(false);
      }
    };

    getCurrRoomData();

    return () => {
      controller.abort();
    };
  }, [selectedRoom]);

  return (
    <Container>
      <RoomNameDiv>
        <HeadTextBg>
          {!isRoomDataLoading && currRoomData?.user_limit > 2
            ? currRoomData.name
            : currRoomData?.users?.length < 2
            ? currRoomData.name
            : currRoomData?.users?.filter((user) => user !== userName)}
        </HeadTextBg>
        <HeadTextSm>Room ID: {selectedRoom}</HeadTextSm>
      </RoomNameDiv>
      <RoomMenuDiv>
        <HeadIconDiv>
          <ToggleMenu>
            <ToggleMenu.Menu>
              <ToggleMenu.Toggle id="chat-box-menu">
                <div>
                  <CiMenuKebab />
                </div>
              </ToggleMenu.Toggle>
              <ToggleMenu.List id="chat-box-menu">
                <ToggleMenu.Button>Leave Room</ToggleMenu.Button>
                <ToggleMenu.Button>Close Chat</ToggleMenu.Button>
                <ToggleMenu.Button>See Members</ToggleMenu.Button>
                <ToggleMenu.Button>Report</ToggleMenu.Button>
              </ToggleMenu.List>
            </ToggleMenu.Menu>
          </ToggleMenu>
        </HeadIconDiv>
      </RoomMenuDiv>
    </Container>
  );
}

export default ChatBoxHead;
