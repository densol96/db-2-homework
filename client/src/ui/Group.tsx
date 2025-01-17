import styled from "styled-components";

const Group = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1rem;

  &:not(:last-of-type) {
    margin-bottom: 3rem;
  }
`;

export default Group;
