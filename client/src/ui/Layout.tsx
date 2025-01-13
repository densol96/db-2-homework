import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Sidebar } from "./Sidebar.tsx";
import { Header } from "./Header.tsx";

const StyledLayout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 25% 1fr;
`;

const Content = styled.div`
  background-color: var(--color-bg-secondary);
`;

const Main = styled.div``;

export const Layout = () => {
  return (
    <StyledLayout>
      <Sidebar />
      <Content>
        <Header />
        <Main>
          <Outlet />
        </Main>
      </Content>
    </StyledLayout>
  );
};
