import React from "react";
import styled from "styled-components";
import { Logo } from "./Logo.tsx";

const StyledSidebar = styled.aside`
  background-color: var(--color-bg-primary);
  padding: 3rem;
`;

const Content = styled.div`
  margin-left: auto;
  width: 25rem;
`;

export const Sidebar = () => {
  return (
    <StyledSidebar>
      <Content>
        <header>
          <Logo />
        </header>
        <nav>Hello world</nav>
      </Content>
    </StyledSidebar>
  );
};
