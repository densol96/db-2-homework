import React from "react";
import styled from "styled-components";

import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const StyledHeader = styled.header`
  height: 6.4rem;
  font-size: 2.5rem;
  border-bottom: 2px solid var(--color-bg-primary);
  display: flex;
  align-items: center;
`;

const Items = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;

  a {
    display: flex;
    align-items: center;
    svg {
      color: var(--color-text-grey);
      transition: color 0.15s;

      &:hover {
        color: var(--color-text);
      }
    }
  }
`;

export const Header = () => {
  return (
    <StyledHeader>
      <Items className="container">
        <ThemeSwitcher height={2.5} />
        <a target="_blank" href="https://github.com/densol96/db-2-homework">
          <FaGithub size={25} />
        </a>
      </Items>
    </StyledHeader>
  );
};
