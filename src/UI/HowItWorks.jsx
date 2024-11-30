import styled, { css } from "styled-components";
import Button from "./Buttons";
import { Link } from "react-router-dom";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 8rem;
`;

const StyledHeadDiv = styled.div``;

const StyledHeadText = styled.span`
  font-size: 3.8rem;
  font-weight: 600;
  color: var(--color-grey-900);
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 75%;
`;

const StepDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  border-radius: 1rem;
  /* background-color: var(--color-grey-0); */
  padding: 3rem 1.4rem;
  transition: scale 1s ease-in-out;

  &:hover {
    background-color: var(--color-grey-0);
    border: 1px solid;
    scale: 1.1;
  }
`;

const StepNumberDiv = styled.div`
  /* height: 3rem;
  width: 3rem; */
`;

const ImageDiv = styled.div`
  height: 6.5rem;
  width: 6.5rem;
  position: relative;

  ${(props) =>
    props.number === "1" &&
    css`
      &::after {
        content: "01";
        color: var(--color-grey-200);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2.2rem;
        font-weight: 600;
      }
    `}
  ${(props) =>
    props.number === "2" &&
    css`
      &::after {
        content: "02";
        color: var(--color-grey-200);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2.2rem;
        font-weight: 600;
      }
    `}
${(props) =>
    props.number === "3" &&
    css`
      &::after {
        content: "03";
        color: var(--color-grey-200);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2.2rem;
        font-weight: 600;
      }
    `}
`;

const StyledImg = styled.img`
  height: 100%;
  width: 100%;
  background-size: cover;
`;

const StepTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  text-align: center;
`;

const StepTextBg = styled.span`
  font-size: 2rem;
  font-weight: 600;
`;

const StepTextSm = styled.span`
  color: var(--color-grey-500);
`;

const BtnsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

// eslint-disable-next-line react/prop-types
function HowItWorks({ sectionRef }) {
  return (
    <Container ref={sectionRef}>
      <StyledHeadDiv>
        <StyledHeadText>Hers&apos;s how it works </StyledHeadText>
      </StyledHeadDiv>

      <StepsContainer>
        <StepDiv>
          <StepNumberDiv>
            <ImageDiv number="1">
              <StyledImg src="./img/1.png" />
            </ImageDiv>
          </StepNumberDiv>

          <StepTextDiv>
            <StepTextBg>Create Your Chat Room</StepTextBg>
            <StepTextSm>
              Host a new chat instantly—no account needed. Just set up a room
              with a unique code.
            </StepTextSm>
          </StepTextDiv>
        </StepDiv>
        <StepDiv>
          <StepNumberDiv>
            <ImageDiv number="2">
              <StyledImg src="./img/2.png" />
            </ImageDiv>
          </StepNumberDiv>

          <StepTextDiv>
            <StepTextBg>Invite your friends</StepTextBg>
            <StepTextSm>
              Send the invitation link and password to your friends or anyone
              you want to chat with for secure access.
            </StepTextSm>
          </StepTextDiv>
        </StepDiv>
        <StepDiv>
          <StepNumberDiv>
            <ImageDiv number="3">
              <StyledImg src="./img/3.png" />
            </ImageDiv>
          </StepNumberDiv>

          <StepTextDiv>
            <StepTextBg>Start the Conversation</StepTextBg>
            <StepTextSm>
              Once they join, dive into a private, anonymous chat and enjoy
              seamless, secure communication.
            </StepTextSm>
          </StepTextDiv>
        </StepDiv>
      </StepsContainer>

      <BtnsDiv>
        <Button as={Link} size="medium" variation="primary" to="/new-chat">
          Start chatting now !
        </Button>
      </BtnsDiv>
    </Container>
  );
}

export default HowItWorks;
