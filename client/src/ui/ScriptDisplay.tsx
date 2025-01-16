import React from "react";
import useScript from "../features/tables/useScript";
import styled from "styled-components";
import { Spinner } from "@/ui/Spinner";

type Props = {
  tableName: string;
  type: "insert" | "create";
};

const CodeArea = styled.code``;

export const ScriptDisplay: React.FC<Props> = ({ tableName, type }) => {
  const { isLoading, script, isError, errorMsg } = useScript(tableName, type);

  if (isError) return <p>{errorMsg}</p>;
  if (isLoading) return <Spinner />;

  let lines;
  let lines_edited;

  lines = script.split("\n");
  lines_edited = lines.map((line, i) => {
    if (i !== 0 && i !== lines.length - 1 && !line.includes("VALUES"))
      return <p style={{ marginLeft: "3rem" }}>{line}</p>;
    return <p>{line}</p>;
  });

  return <CodeArea>{lines_edited}</CodeArea>;
};
