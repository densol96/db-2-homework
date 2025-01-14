import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  font-weight: 700;
  font-size: 1.5rem;
  display: block;
  height: 100%;
  width: 100%;
  transition: color 0.3s;

  &:hover {
    color: var(--color-active);
  }

  &.active {
    color: var(--color-active);
  }
`;

type Props = {
  children?: React.ReactNode;
  to: string;
};

export const NavElement: React.FC<Props> = ({ children, to }) => {
  return (
    <li>
      <StyledNavLink to={to}>{children}</StyledNavLink>
    </li>
  );
};
