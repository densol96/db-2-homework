import React, { useState } from "react";
import Heading from "@/ui/Heading";
import Select from "@/ui/Select";
import Row from "@/ui/Row";
import HeaderRow from "@/ui/HeaderRow";
import { useSearchParams } from "react-router-dom";
import { DisplayResult } from "@/features/display/DisplayResult";

type Props = {};

export const Vaicajumi: React.FC<Props> = () => {
  return <DisplayResult title="Vaicājumi" keyQuery="queryNum" options={10} />;
};
