/* eslint-disable no-unused-vars */
import styled from "styled-components";
import Button from "../UI/Buttons";
import HowItWorks from "../UI/HowItWorks";
import { useRef } from "react";
import { Link } from "react-router-dom";

const Container = styled.div`
  /* height: 300vh; */
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 25rem;
  /* border-bottom: 1px solid var(--color-grey-100);
  padding-top: 10rem;

  gap: 2rem; */
  /* background-image: var(--blue-gradient-03); */
`;

const MainSection = styled.main`
  border-bottom: 1px solid var(--color-grey-100);
  z-index: 2;
  padding-top: 10rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const HeadTextDiv = styled.div`
  width: 55rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeadTextBg = styled.span`
  font-weight: 600;
  text-transform: capitalize;
  font-size: 5.2rem;
  color: var(--color-grey-900);
  text-align: center;
  /* line-height: 1.2; */
`;

const HeadTextSm = styled.span`
  color: var(--color-grey-600);
  font-size: 1.8rem;
  margin-top: 2rem;
  text-align: center;
  line-height: 2;
`;

const BtnsDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

function Home() {
  const sectionRef = useRef();

  function getIntoView() {
    sectionRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <Container>
      <MainSection>
        <HeadTextDiv>
          <HeadTextBg>Connect Instantly, </HeadTextBg>
          <HeadTextBg> Stay Anonymous</HeadTextBg>

          <HeadTextSm>
            Instantly connect with people around the world—no sign-ups, no
            profiles, just real conversations in a space where privacy and
            freedom come first.
          </HeadTextSm>
        </HeadTextDiv>

        <BtnsDiv>
          <Button as={Link} size="medium" variation="primary" to="/new-chat">
            Start chatting now !
          </Button>
          <Button size="medium" variation="secondary" onClick={getIntoView}>
            How it works ?
          </Button>
        </BtnsDiv>
      </MainSection>

      <HowItWorks sectionRef={sectionRef} />
    </Container>
  );
}

export default Home;
