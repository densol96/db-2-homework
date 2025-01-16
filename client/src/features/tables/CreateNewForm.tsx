import { Form } from "@/ui/Form";
import React, { useEffect } from "react";
import styled from "styled-components";
import useColumns from "./useColumns";
import useCreateRow from "./useCreateRow";
import { useModalContext } from "@/ui/Modal";

type Props = {
  tableName: string;
};

const Overlay = styled.div``;

export const CreateNewForm: React.FC<Props> = ({ tableName }) => {
  const { columns } = useColumns(tableName);
  const { isPosting, postRow } = useCreateRow(tableName);
  const { close } = useModalContext();
  const onSubmit = (formData: { [key: string]: any }) => {
    postRow(formData, {
      onSuccess: close,
    });
  };

  switch (tableName) {
    case "users":
      return (
        <Form
          onSubmit={onSubmit}
          textFields={["email", "username", "password"]}
        >
          <label htmlFor="role">Role</label>
          <select defaultValue="user" name="role" id="role">
            <option value="user">User</option>
            <option value="editor">Editor</option>
            <option value="admin">admin</option>
          </select>
        </Form>
      );
    case "articles":
      return (
        <Form
          onSubmit={onSubmit}
          textFields={["title", "header_image", "author_id"]}
        >
          <label htmlFor="text">Text</label>
          <textarea rows={5} cols={15} name="text" id="text" />
        </Form>
      );
    case "users_articles_ratings":
      return (
        <Form
          onSubmit={onSubmit}
          textFields={["user_id", "article_id", "parent_comment_id", "rating"]}
        ></Form>
      );
    case "comments":
      return (
        <Form
          onSubmit={onSubmit}
          textFields={["user_id", "article_id", "parent_comment_id", "content"]}
        ></Form>
      );
    default:
      return (
        <Form
          onSubmit={onSubmit}
          textFields={columns.filter((col) => col !== "id")}
        ></Form>
      );
  }
};
