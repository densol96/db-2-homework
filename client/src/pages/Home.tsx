import React from "react";
import Heading from "../ui/Heading.tsx";

type Props = {
  className?: string;
};

export const Home: React.FC<Props> = ({ className }) => {
  return (
    <>
      <Heading as="h1">Ievads</Heading>
    </>
  );
};
