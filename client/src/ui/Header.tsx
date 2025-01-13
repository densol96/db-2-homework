import React from "react";
import styled from "styled-components";

import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
  height: 6.4rem;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  border-bottom: 2px solid var(--color-bg-primary);
`;

const Items = styled.div`
  display: flex;
  flex-direction: c;
  justify-content: flex-end;

  svg {
    color: var(--color-text-grey);
    transition: color 0.15s;

    &:hover {
      color: var(--color-text);
    }
  }
`;

export const Header = () => {
  return (
    <StyledHeader>
      <Items className="container">
        <Link>
          <FaGithub />
        </Link>
      </Items>
    </StyledHeader>
  );
};
