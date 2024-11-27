//

import styled from "styled-components";
import Button from "../Buttons";
import { createRoom } from "../../Features/ChatService";

const AddNewRoomDiv = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddNewTextDiv = styled.div`
  height: 45%;
  width: 80%;
  /* border: 1px solid; */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
`;
const AddnewTextBg = styled.div`
  font-size: 4rem;
  font-weight: 600;
  color: var(--color-grey-800);
`;
const AddnewTextSm = styled.div`
  font-size: 1.8rem;
  color: var(--color-grey-800);
`;

const BtnsDiv = styled.div``;

function AddNewRoom({ createRoom, joinRoom }) {
  return (
    <AddNewRoomDiv>
      <AddNewTextDiv>
        <AddnewTextBg>Create a new chat room</AddnewTextBg>
        <AddnewTextSm>
          Start a private chat room in seconds—no sign-up needed! Just create,
          share the link with friends, and dive into a secure, anonymous
          conversation.
        </AddnewTextSm>
        <BtnsDiv>
          <Button onClick={createRoom} size="medium" variation="primary">
            Create Room
          </Button>
          <Button onClick={joinRoom} size="medium" variation="secondary">
            Join Room
          </Button>
        </BtnsDiv>
      </AddNewTextDiv>
    </AddNewRoomDiv>
  );
}

export default AddNewRoom;
