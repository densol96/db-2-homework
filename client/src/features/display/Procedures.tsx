import React, { useState } from "react";
import { useThemeContext } from "@/context/ThemeContext";
import { Spinner } from "@/ui/Spinner";
import Heading from "@/ui/Heading";
import Script from "@/ui/Script";
import Group from "@/ui/Group";
import useProcedureInfo from "./useProcedureInfo";
import parseScriptLikeProcedTrig from "./parseScriptLikeProcedTrig";
import useCallProcedure from "./useCallProcedure";
import { Modal } from "@/ui/Modal";
import { Button } from "@/ui/Button";
import {
  JsonView,
  allExpanded,
  darkStyles,
  defaultStyles,
} from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import toast from "react-hot-toast";
import { FaPlay } from "react-icons/fa";

type Props = {
  activeNumber: number;
};

export const Procedures: React.FC<Props> = ({ activeNumber }) => {
  const { script, isCallable, description, isLoading } =
    useProcedureInfo(activeNumber);
  const { result } = useCallProcedure(activeNumber);
  const [showResult, setShowResult] = useState(false);
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
      <Group>
        {isCallable && activeNumber === 2 && (
          <Modal
            style={{ backgroundColor: "white", color: "black" }}
            triggerElement={
              <Button>
                <FaPlay />
                Run Procedure / Function
              </Button>
            }
          >
            {theme == "dark" ? (
              <JsonView
                data={result}
                shouldExpandNode={allExpanded}
                style={defaultStyles}
              />
            ) : (
              <JsonView
                data={result}
                shouldExpandNode={allExpanded}
                style={defaultStyles}
              />
            )}
          </Modal>
        )}
        {isCallable && activeNumber === 3 && (
          <Button
            onClick={() =>
              toast.success(<p style={{ textAlign: "center" }}>{result}</p>)
            }
          >
            <FaPlay /> Run Procedure / Function
          </Button>
        )}
      </Group>
    </>
  );
};
