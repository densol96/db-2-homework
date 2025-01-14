import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

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
  padding: 4.8rem 0 4.8rem 12.8rem;
  display: grid;
  grid-template-columns: 1fr 22rem;
  column-gap: 6.4rem;
`;

const Article = styled.div``;
const PageIndex = styled.div`
  border: 2px solid green;
  height: 35rem;
`;

export const Layout = () => {
  return (
    <StyledLayout>
      <Sidebar />
      <MainArea>
        <Header />
        <Main className="container">
          <Article>
            <Outlet />
          </Article>
          <PageIndex />
        </Main>
      </MainArea>
    </StyledLayout>
  );
};
