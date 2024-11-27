import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
import { CgAttachment } from "react-icons/cg";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 4rem 1fr 4rem;
  gap: 1rem;
  align-items: center;
  padding: 0 1rem;
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
  return (
    <Container>
      <IconDiv aria-label="attach file">
        <label htmlFor="attach-file" aria-label="attach file">
          <CgAttachment />
          <title>attach file</title>
        </label>
        <FileInput type="file" id="attach-file" />
      </IconDiv>
      <InputDiv>
        <StyledInput placeholder="enter message" />
      </InputDiv>
      <IconDiv aria-label="send">
        <div aria-label="send">
          <IoMdSend />
          <title>send</title>
        </div>
      </IconDiv>
    </Container>
  );
}

export default ChatBoxInputDiv;
