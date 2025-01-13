import React from "react";
import styled from "styled-components";
import { ImDatabase } from "react-icons/im";
import { Link } from "react-router-dom";

const StyledLogo = styled(Link)`
  font-family: "Anton", sans-serif;
  letter-spacing: 1.5px;
  text-align: center;
  margin-bottom: 2rem;
  display: block;

  h2 {
    font-size: 2rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;

    svg {
      font-size: 1.5rem;
    }
  }
`;

export const Logo = () => {
  return (
    <StyledLogo to="/">
      <h1>s22solodeni</h1>
      <h2>
        <ImDatabase />
        <span>datu bāze</span>
        <ImDatabase />
      </h2>
    </StyledLogo>
  );
};
