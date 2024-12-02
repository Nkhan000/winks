import React from "react";
import styled, { css } from "styled-components";

const StyledWrapper = styled.div`
  div {
    ${(props) =>
      props.size == "small" &&
      css`
        width: 6rem;
        height: 6rem;
      `}
    ${(props) =>
      props.size == "large" &&
      css`
        width: 6rem;
        height: 6rem;
        /* scale: 2; */
      `} 
    background: linear-gradient(
        #ff8a00 calc(1 * 100% / 1),
        #fff 0 calc(3 * 100% / 6),
        #ff8a00 0
      ),
      linear-gradient(
        #ff8a00 calc(2 * 100% / 6),
        #fff 0 calc(4 * 100% / 6),
        #ff8a00 0
      ),
      linear-gradient(
        #ff8a00 calc(3 * 100% / 6),
        #fff 0 calc(5 * 100% / 6),
        #ff8a00 0
      );
    background-size: 15px 400%;
    background-repeat: no-repeat;
    animation: matrix 1s infinite linear;
    transform: rotate(90deg);
  }

  @keyframes matrix {
    0% {
      background-position: 0% 100%, 50% 100%, 100% 100%;
    }

    100% {
      background-position: 0% 0%, 50% 0%, 100% 0%;
    }
  }
`;
function Loader({ size }) {
  return (
    <StyledWrapper size={size}>
      <div></div>
      {size == "small" ? <h5>LOADING . . .</h5> : <h3>LOADING . . .</h3>}
    </StyledWrapper>
  );
}
export default Loader;
