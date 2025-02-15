import React, { useState } from "react";
import { DisplayHeadingWithSelect } from "@/features/display/DisplayHeadingWithSelect";
import { Queries } from "@/features/display/Queries";
import useSearchQuery from "@/hooks/useSearchQuery";

type Props = {};

export const Vaicajumi: React.FC<Props> = () => {
  const [activeNum, setActiveNum] = useSearchQuery();
  return (
    <>
      <DisplayHeadingWithSelect
        value={activeNum}
        onChange={(e) => setActiveNum(+e.target.value)}
        options={10}
      >
        Vaicājumi
      </DisplayHeadingWithSelect>
      <Queries activeNumber={activeNum} />
    </>
  );
};
