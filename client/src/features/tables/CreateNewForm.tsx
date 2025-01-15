import { Form } from "@/ui/Form";
import React, { useEffect } from "react";
import styled from "styled-components";
import useColumns from "./useColumns";
import useCreateRow from "./useCreateRow";

type Props = {
  tableName: string;
};

const Overlay = styled.div``;

export const CreateNewForm: React.FC<Props> = ({ tableName }) => {
  const { columns } = useColumns(tableName);
  const { isPosting, postRow } = useCreateRow(tableName);
  switch (tableName) {
    case "users":
      return (
        <Form onSubmit={postRow} textFields={["email", "username", "password"]}>
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
          onSubmit={postRow}
          textFields={["title", "text", "header_image", "author_id"]}
        ></Form>
      );
    case "users_articles_ratings":
      return (
        <Form
          onSubmit={postRow}
          textFields={["user_id", "article_id", "parent_comment_id", "rating"]}
        ></Form>
      );
    case "comments":
      return (
        <Form
          onSubmit={postRow}
          textFields={["user_id", "article_id", "parent_comment_id", "content"]}
        ></Form>
      );
    default:
      return (
        <Form
          onSubmit={postRow}
          textFields={columns.filter((col) => col !== "id")}
        ></Form>
      );
  }
};
