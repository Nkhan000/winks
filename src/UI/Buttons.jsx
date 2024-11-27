import styled, { css } from "styled-components";

const Button = styled.button`
  font-family: inherit;
  border: 2px solid var(--color-grey-900);
  border-radius: 1rem;
  font-weight: 600;

  ${(props) =>
    props.size == "small" &&
    css`
      font-size: 1.4rem;
      padding: 1rem;
    `}
  ${(props) =>
    props.size == "medium" &&
    css`
      font-size: 1.8rem;
      padding: 1.6rem 2.8rem;
    `}
    ${(props) =>
    props.size == "large" &&
    css`
      font-size: 2rem;
      padding: 1.8rem 4rem;
    `}

    // variations
  ${(props) =>
    props.variation == "primary" &&
    css`
      background-color: var(--color-grey-900);
      color: var(--color-grey-100);
    `}
  ${(props) =>
    props.variation == "secondary" &&
    css`
      &:hover {
        background-color: var(--color-grey-50);
      }
      /* padding: 1.6rem 2.8rem; */
    `}
      ${(props) =>
    props.variation == "danger" &&
    css`
      font-size: 2rem;
      padding: 1.8rem 4rem;
    `}
      
      &:hover {
    background-color: var(--color-grey-50);
    color: var(--color-grey-800);
  }

  &:focus {
    outline: 2px solid var(--color-grey-900);
  }
`;

export default Button;
