// import { MdOutlineQuickreply } from "react-icons/md";
// import { PiChatTeardropBold } from "react-icons/pi";
import { PiChatsCircleFill } from "react-icons/pi";
import { Link } from "react-router-dom";

import styled from "styled-components";

const Container = styled.header`
  padding: 1rem 4rem;
  z-index: 1;

  display: flex;
  justify-content: center;
`;
const HeaderLogoDiv = styled(Link)`
  display: flex;
  gap: 1.8rem;

  font-style: italic;
`;

const HeaderLogoTextDiv = styled.div`
  /* display: grid; */
`;

const HeaderLogoText = styled.span`
  font-size: 4.5rem;
  font-family: "Coiny", system-ui;
`;

const IconDiv = styled.div`
  height: 4.6rem;
  width: 4.6rem;
  overflow: hidden;
  font-weight: 600;

  & svg {
    height: 100%;
    width: 100%;
    font-size: 5rem;
  }
`;

function Header() {
  return (
    <Container>
      <HeaderLogoDiv to="/">
        <IconDiv>
          <svg>
            {/* <MdOutlineQuickreply /> */}
            <PiChatsCircleFill />
          </svg>
        </IconDiv>

        <HeaderLogoTextDiv>
          <HeaderLogoText>WINKS</HeaderLogoText>
        </HeaderLogoTextDiv>
      </HeaderLogoDiv>
    </Container>
  );
}

export default Header;
