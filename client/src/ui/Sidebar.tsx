import React, { useEffect } from "react";
import styled from "styled-components";
import { Logo } from "./Logo";
import { NavElement } from "./NavElement";
import { Api } from "@/services/aoi-client";
import { ApiRoutes } from "@/services/constants";
import { useQuery } from "@tanstack/react-query";
import useTables from "@/features/tables/useTables";

const StyledSidebar = styled.aside`
  background-color: var(--color-bg-primary);
  padding: 1.5rem;
`;

const Content = styled.div`
  margin-left: auto;
  width: 20rem;
`;

const NavList = styled.ul`
  border-top: var(--border);
  border-bottom: var(--border);
  padding-top: 1.2rem;
  padding-bottom: 2.8rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Sidebar = () => {
  const { tableNames, isSuccess } = useTables();

  return (
    <StyledSidebar>
      <Content>
        <header>
          <Logo />
        </header>
        <NavList>
          <NavElement to="/">Ievads</NavElement>
          <NavElement to="descriptions">Apraksts</NavElement>
          <NavElement isLoaded={isSuccess} subroutes={tableNames} to="tables">
            Tabulas
          </NavElement>
          <NavElement to="queries">Vaicājumi</NavElement>
          <NavElement to="procedures">Procedūras / Funkcijas</NavElement>
          <NavElement to="triggers">Trigeri</NavElement>
        </NavList>
      </Content>
    </StyledSidebar>
  );
};
