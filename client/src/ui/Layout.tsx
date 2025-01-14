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

const MainArea = styled.div`
  background-color: var(--color-bg-secondary);
`;

const Main = styled.div`
  border: 1px solid red;
  padding: 4.8rem 6.4rem 4.8rem 12.8rem;
`;

export const Layout = () => {
  return (
    <StyledLayout>
      <Sidebar />
      <MainArea>
        <Header />
        <Main className="container">
          <Outlet />
        </Main>
      </MainArea>
    </StyledLayout>
  );
};
