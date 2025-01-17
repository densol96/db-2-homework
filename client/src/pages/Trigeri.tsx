import { DisplayHeadingWithSelect } from "@/features/display/DisplayHeadingWithSelect";
import { Triggers } from "@/features/display/Triggers";
import useSearchQuery from "@/hooks/useSearchQuery";
import React from "react";

type Props = {};

export const Trigeri: React.FC<Props> = () => {
  const [activeNum, setActiveNum] = useSearchQuery();
  return (
    <>
      <DisplayHeadingWithSelect
        value={activeNum}
        onChange={(e) => setActiveNum(+e.target.value)}
        options={3}
      >
        Trigeri
      </DisplayHeadingWithSelect>
      <Triggers activeNum={activeNum} />
    </>
  );
};
