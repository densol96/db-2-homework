import { capitalizeWords } from "@/helpers/helpers";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import React, { Children, cloneElement, ReactElement } from "react";
import Heading from "./Heading";
import { Button } from "./Button";
import * as ApiTypes from "@/services/types";
import { useModalContext } from "./Modal";

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  font-weight: 500;
  /* background-color: inherit; */
  input,
  select,
  textarea {
    color: var(--color-text-opposite);
  }
  font-family: inherit;

  h3 {
    grid-column: 1 / span 2;
    text-align: center;
    font-size: 2rem;
    text-transform: uppercase;
  }

  .btns {
    grid-column: 1 / span 2;
    display: flex;
    justify-content: center;

    button {
      padding: 1rem 2rem;
      border: var(--border);
      transition: all 0.2s;
      margin-top: 1.5rem;

      &:hover {
        background-color: var(--color-text);
        color: var(--color-table-light);
      }
    }
  }
`;

type Props = {
  children?: ReactElement<any> | ReactElement<any>[]; // could be some custom input like selects and special inputs
  textFields: string[];
  onSubmit: (formData: { [key: string]: any }) => void;
};

export const Form: React.FC<Props> = ({ children, textFields, onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h3">Pievienot jaunu ierakstu</Heading>
      {textFields.map((column_name) => (
        <>
          <label htmlFor={column_name}>
            {capitalizeWords(column_name, "_")}
          </label>
          <input id={column_name} {...register(column_name)} type="text" />
        </>
      ))}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const childWithRegister = child as ReactElement<any>;
          // (input or select)
          if (
            (childWithRegister.type === "input" ||
              childWithRegister.type === "select" ||
              childWithRegister.type === "textarea") &&
            childWithRegister.props.name
          ) {
            return React.cloneElement(childWithRegister, {
              ...childWithRegister.props,
              ...register(childWithRegister.props.name),
            });
          }
          if (childWithRegister.type === "label") {
            return childWithRegister;
          }
        }
        return null;
      })}
      <div className="btns">
        <button>Iesniegt</button>
      </div>
    </StyledForm>
  );
};
