import React from "react";
import useSqlQuery from "./useSqlQuery";
import { Spinner } from "@/ui/Spinner";
import {
  JsonView,
  allExpanded,
  darkStyles,
  defaultStyles,
} from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { useThemeContext } from "@/context/ThemeContext";
import Heading from "@/ui/Heading";
import styled from "styled-components";
import Script from "@/ui/Script";

type Props = {
  activeNumber: number;
};

const Group = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;

  &:first-of-type {
    margin-bottom: 3rem;
  }
`;

export const Queries: React.FC<Props> = ({ activeNumber }) => {
  const { script, result, isLoading } = useSqlQuery(activeNumber);
  const { theme } = useThemeContext();

  if (isLoading) return <Spinner />;
  return (
    <>
      <Group>
        <Heading as="h2">Skripts:</Heading>
        <Script theme={theme}>{script}</Script>
      </Group>
      <Group>
        <Heading as="h2">Rezultāts:</Heading>
        {theme == "dark" ? (
          <JsonView
            data={result}
            shouldExpandNode={allExpanded}
            style={darkStyles}
          />
        ) : (
          <JsonView
            data={result}
            shouldExpandNode={allExpanded}
            style={defaultStyles}
          />
        )}
      </Group>
    </>
  );
};
