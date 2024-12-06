import styled from "styled-components";

const Container = styled.div`
  /* margin-top: 4rem; */
  border-bottom: 1px solid var(--color-grey-500);
  padding: 0.5rem 5rem;
  background-color: var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
`;

const CopywriteText = styled.span``;

const LeftDiv = styled.div``;
const RightDiv = styled.ul`
  display: flex;
  align-items: center;
  gap: 3rem;

  li {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

function Footer() {
  return (
    <Container>
      <LeftDiv>
        <CopywriteText>
          © 2024 Winks Chat. Created during a 3-month internship at Unified
          Mentors. All rights reserved.
        </CopywriteText>
      </LeftDiv>
      <RightDiv>
        <li>About</li>
        <li>Terms</li>
        <li>Policy</li>
        <li>Contact</li>
      </RightDiv>
    </Container>
  );
}

export default Footer;
