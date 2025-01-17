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
import Script from "@/ui/Script";
import Group from "@/ui/Group";

type Props = {
  activeNumber: number;
};

export const Queries: React.FC<Props> = ({ activeNumber }) => {
  const { script, result, description, isLoading } = useSqlQuery(activeNumber);
  const { theme } = useThemeContext();

  if (isLoading) return <Spinner />;
  return (
    <>
      <Group>
        <Heading as="h2">Skripts:</Heading>
        <Script theme={theme}>{script}</Script>
      </Group>
      <Group>
        <Heading as="h2">Apraksts:</Heading>
        <p>{description}</p>
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
