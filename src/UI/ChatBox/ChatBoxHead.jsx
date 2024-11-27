import styled from "styled-components";
import { CiMenuKebab } from "react-icons/ci";
import ToggleMenu from "../ToggleMenu";

const Container = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  background-color: var(--color-grey-100);
  border-top-right-radius: 1rem;
`;

const RoomNameDiv = styled.div``;

const HeadTextBg = styled.span`
  font-weight: 600;
  font-size: 3rem;
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
  return (
    <Container>
      <RoomNameDiv>
        <HeadTextBg>Allen</HeadTextBg>
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
