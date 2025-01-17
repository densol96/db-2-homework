import React, { JSX } from "react";
import useTrigger from "./useTrigger";
import Group from "@/ui/Group";
import Heading from "@/ui/Heading";
import Script from "@/ui/Script";
import { useThemeContext } from "@/context/ThemeContext";
import { Spinner } from "@/ui/Spinner";
import parseScriptLikeProcedTrig from "./parseScriptLikeProcedTrig";

type Props = {
  activeNum: number;
};

export const Triggers: React.FC<Props> = ({ activeNum }) => {
  const { script, description, isLoading } = useTrigger(activeNum);
  const { theme } = useThemeContext();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Group>
        <Heading as="h2">Skripts:</Heading>
        <Script theme={theme}>{parseScriptLikeProcedTrig(script)}</Script>
      </Group>
      <Group>
        <Heading as="h2">Apraksts:</Heading>
        <p>{description}</p>
      </Group>
    </>
  );
};
