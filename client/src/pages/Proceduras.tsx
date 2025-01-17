import { DisplayHeadingWithSelect } from "@/features/display/DisplayHeadingWithSelect";
import { Procedures } from "@/features/display/Procedures";
import useSearchQuery from "@/hooks/useSearchQuery";
import React from "react";

type Props = {};

export const Proceduras: React.FC<Props> = () => {
  const [activeNum, setActiveNum] = useSearchQuery();
  return (
    <>
      <DisplayHeadingWithSelect
        value={activeNum}
        onChange={(e) => setActiveNum(+e.target.value)}
        options={3}
        selectTitle="procedūru / funkciju"
      >
        Procedūras / Funkcijas
      </DisplayHeadingWithSelect>
      <Procedures activeNumber={activeNum} />
    </>
  );
};
