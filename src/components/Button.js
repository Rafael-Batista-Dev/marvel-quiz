import styled from "styled-components";

export const Button = styled.button`
  padding: 1rem;
  width: 25rem;
  font-size: 1.5rem;
  display: inline-block;
  background: var(--main-red);
  text-transform: uppercase;
  border: none;
  outline: none;
  border-radius: 0.1875rem;
  color: #fff;
  text-align: center;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.45);
  transsition: background 0.2s ease-in;
  cursor: pointer;
  &:hover {
    background: var(--main-red-hover);
  }
`;
