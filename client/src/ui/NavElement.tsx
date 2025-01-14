import { Api } from "@/services/aoi-client";
import { ApiRoutes } from "@/services/constants";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { capitalizeWords } from "@/helpers/helpers";

const css = `
  font-weight: 700;
  font-size: 1.5rem;
  transition: color 0.3s;
`;

const StyledNavLink = styled(NavLink)`
  ${css}

  &:hover {
    color: var(--color-active);
  }

  &.active {
    color: var(--color-active);
  }
`;

const StyledSubNavLink = styled(NavLink)`
  font-weight: 600;
  font-size: 1.2rem;
  transition: color 0.3s;
  margin-left: 2rem;
  &:hover {
    color: var(--color-active);
  }

  &.active {
    color: var(--color-active);
  }
`;

const NavSectionTitle = styled.li`
  display: flex;
  flex-direction: column;
  p {
    ${css}
    display: flex;
    justify-content: space-between;
  }

  button {
    background: transparent;

    svg {
      font-size: 2rem;

      &:hover {
        color: var(--color-active);
      }
    }
  }
`;

type Props = {
  children?: React.ReactNode;
  to: string;
  subroutes?: string[];
  isLoaded?: boolean;
};

export const NavElement: React.FC<Props> = ({
  children,
  to,
  subroutes,
  isLoaded,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!subroutes)
    return (
      <li>
        <StyledNavLink to={to}>{children}</StyledNavLink>
      </li>
    );

  const btn = isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />;

  const subroutesMenu = subroutes.map((route) => (
    <li>
      <StyledSubNavLink key={route} to={to + "/" + route}>
        {capitalizeWords(route, "_")}
      </StyledSubNavLink>
    </li>
  ));

  return (
    <NavSectionTitle>
      <p>
        {children}
        {isLoaded && <button onClick={() => setIsOpen(!isOpen)}>{btn}</button>}
      </p>
      {isLoaded && isOpen && <ul>{subroutesMenu}</ul>}
    </NavSectionTitle>
  );
};
