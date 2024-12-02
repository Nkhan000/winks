import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
import { CgAttachment } from "react-icons/cg";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { sendMessage } from "../../Features/ChatService";
import { useForm } from "react-hook-form";

const Container = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 4rem 1fr 4rem;
  gap: 1rem;
  align-items: center;
  padding: 0rem 1rem;

  position: sticky;
  bottom: 0;

  background-color: var(--color-grey-0);
  /* margin-bottom: 3rem; */
`;

const IconDiv = styled.button`
  height: 3.3rem;
  width: 3.3rem;
  border-radius: 3rem;

  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-grey-100);
  background-color: transparent;

  &:focus,
  &:active {
    outline: 1px solid var(--color-grey-800);
  }

  & label,
  div {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    & svg {
      font-size: 1.8rem;
    }
  }
`;

const InputDiv = styled.div`
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.4rem;
  font-family: inherit;
  border-radius: 1rem;
  border: 1px solid var(--color-grey-300);

  &:focus,
  &:active {
    outline: 1px solid var(--color-grey-500);
  }
`;

const FileInput = styled.input`
  display: none;
`;

function ChatBoxInputDiv() {
  const {
    selectedRoom: selectedRoomFromStore,
    userId,
    userName,
  } = useSelector((state) => state.chat);

  const { handleSubmit } = useForm();
  const [selectedRoom, setSelectedRoom] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // setting selected room to current state
  useEffect(() => {
    if (selectedRoomFromStore) {
      setSelectedRoom(selectedRoomFromStore);
    }
  }, [selectedRoomFromStore]);

  // setting current userId to current state
  useEffect(() => {
    if (userId) {
      setCurrentUserId(userId);
    }
  }, [userId]);

  async function sendMessageFunc(message) {
    await sendMessage(selectedRoom, currentUserId, message);
  }

  async function onSubmit() {
    try {
      console.log("sending message");
      setIsLoading(true);
      const data = await sendMessage(
        selectedRoom,
        currentUserId,
        userName,
        message
      );
      if (data) {
        // setIsLoading(false);
        console.log("message sent");
      }
    } catch (err) {
      console.log("Error sending the message");
      throw new Error(err.message);
    } finally {
      setMessage("");
      setIsLoading(false);
    }
  }
  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <IconDiv aria-label="attach file">
        <label htmlFor="attach-file" aria-label="attach file">
          <CgAttachment />
          <title>attach file</title>
        </label>
        <FileInput type="file" id="attach-file" />
      </IconDiv>
      <InputDiv>
        <StyledInput
          placeholder="enter message"
          name="message"
          onChange={(e) => setMessage((s) => (s = e.target.value))}
          value={message}
        />
      </InputDiv>
      <IconDiv type="submit" aria-label="send">
        <div aria-label="send">
          <IoMdSend />
          <title>send</title>
        </div>
      </IconDiv>
    </Container>
  );
}

export default ChatBoxInputDiv;
