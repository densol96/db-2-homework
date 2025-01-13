import React from "react";

type Props = {
  className?: string;
};

export const Home: React.FC<Props> = ({ className }) => {
  return <div className={className}>THIS IS A HOME PAGE!</div>;
};
