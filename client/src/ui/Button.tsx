import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  color: var(--color-active);
  font-size: 1.6rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 5px;
  align-self: center;
`;

type Props = {
  children?: React.ReactNode;
  onClick?: () => void;
};

export const Button: React.FC<Props> = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};
