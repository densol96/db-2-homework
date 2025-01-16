import styled from "styled-components";

const Script = styled.div<{ theme: "dark" | "light" }>`
  padding: 3rem 6rem;
  background-color: ${(props) =>
    props.theme === "dark" ? "black" : "var(--border-color)"};
  border-radius: 6px;
`;

export default Script;
