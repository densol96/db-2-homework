import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Sidebar } from "./Sidebar.tsx";

const StyledLayout = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 25% 1fr;
`;

const ContentContainer = styled.div`
  background-color: var(--color-bg-secondary);
`;

export const Layout = () => {
  return (
    <StyledLayout>
      <Sidebar />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </StyledLayout>
  );
};
