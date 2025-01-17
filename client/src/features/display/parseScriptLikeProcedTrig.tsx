import { JSX } from "react";

export function parseScriptLikeProcedTrig(script: string): JSX.Element[] {
  let addMargin = false;
  return script.split("\n").map((line) => {
    if (line.includes("END$$")) addMargin = false;
    if (addMargin) return <p style={{ marginLeft: "3rem" }}>{line}</p>;
    if (line.includes("BEGIN")) addMargin = true;
    return <p>{line}</p>;
  });
}

export default parseScriptLikeProcedTrig;
