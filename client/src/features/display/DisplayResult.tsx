import React, { ReactNode, useState } from "react";
import Heading from "@/ui/Heading";
import Select from "@/ui/Select";
import Row from "@/ui/Row";
import HeaderRow from "@/ui/HeaderRow";
import { useSearchParams } from "react-router-dom";
import useSearchQuery from "@/hooks/useSearchQuery";
import { Queries } from "./Queries";

type Props = {
  options: number;
  title: string;
  keyQuery: "queryNum" | "procedureNum" | "triggerNum";
  children?: ReactNode;
};

export const DisplayResult: React.FC<Props> = ({
  options,
  title,
  keyQuery,
  children,
}) => {
  const [activeNum, setActiveNum] = useSearchQuery(keyQuery);
  return (
    <>
      <HeaderRow>
        <Heading as="h1">{title}</Heading>
        <Row>
          <Heading as="h3">
            Izvēleties nepieciešamo{" "}
            {title.toLowerCase().substring(0, title.length - 1) + "u"}
          </Heading>
          <Select
            onChange={(e) => setActiveNum(+e.target.value)}
            name={keyQuery}
            value={activeNum}
          >
            {Array.from({ length: options }, (_, index) => index + 1).map(
              (num) => (
                <option value={num}>{num}</option>
              )
            )}
          </Select>
        </Row>
      </HeaderRow>
      <Queries activeNumber={activeNum} />
    </>
  );
};
