import React from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ isBright: boolean }>`
  color: ${(props) =>
    props.isBright ? `var(--color-active)` : `var(--color-text)`};
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
  isBright?: boolean;
};

export const Button: React.FC<Props> = ({
  children,
  onClick,
  isBright = true,
}) => {
  return (
    <StyledButton isBright={isBright} onClick={onClick}>
      {children}
    </StyledButton>
  );
};
