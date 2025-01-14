import React, { useState } from "react";
import { ThemeType, useThemeContext } from "@/context/ThemeContext";
import styled, { css } from "styled-components";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

type Props = {
  height: number; // rem
};

function applyStyles(mode: ThemeType) {
  switch (mode) {
    case "dark":
      return css`
        background-color: inherit;
        p {
          left: 55%;
        }
      `;
    default:
      return css`
        background-color: inherit;
        p {
          left: 10%;
        }
      `;
  }
}

const Switcher = styled.button<{ height: number; mode: ThemeType }>`
  width: 4.5rem;
  border: 1px solid red;
  border-radius: 1.3rem;
  height: ${(props) => `${props.height}rem`};
  ${(props) => applyStyles(props.mode)}
  position: relative;

  border-color: var(--border-color);
  transition: border-color 0.3s;
  &:hover {
    border-color: var(--color-active);
  }

  p {
    height: ${(props) => `${props.height - 0.4}rem`};
    width: ${(props) => `${props.height - 0.4}rem`};
    display: block;
    background-color: inherit;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    transition: left 0.6s, background-color 0.4s;
    display: flex;
    align-items: center;
  }
`;

export const ThemeSwitcher: React.FC<Props> = ({ height }) => {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <Switcher onClick={toggleTheme} mode={theme} height={height}>
      <p>
        {theme === "light" ? (
          <MdOutlineLightMode size={15} />
        ) : (
          <MdOutlineDarkMode size={15} />
        )}
      </p>
    </Switcher>
  );
};
