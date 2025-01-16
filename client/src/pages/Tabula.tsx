import { Table } from "@/features/tables/Table";
import usePrefetching from "@/features/tables/usePrefetching";
import useTable from "@/features/tables/useTable";
import { capitalizeWords } from "@/helpers/helpers";
import { Api } from "@/services/aoi-client";
import { ApiRoutes } from "@/services/constants";
import { Button } from "@/ui/Button";
import Heading from "@/ui/Heading";
import Pagination from "@/ui/Pagination";
import { Spinner } from "@/ui/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { Modal } from "@/ui/Modal";
import { CreateNewForm } from "@/features/tables/CreateNewForm";
import styled from "styled-components";
import { BsDatabaseFillAdd, BsDatabaseFillUp } from "react-icons/bs";
import { ScriptDisplay } from "@/ui/ScriptDisplay";
const HeaderRow = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    gap: 2rem;
    align-items: center;
  }
`;

export const Tabula = () => {
  const { name } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") ? +searchParams.get("page") : 1;
  const { table, pagesTotal, resultsTotal, isLoading, isSuccess, isError } =
    useTable(name, page);

  useEffect(() => {
    if (page < 1 || isError) {
      searchParams.set("page", 1 + "");
      setSearchParams(searchParams);
    } else if (page > pagesTotal && resultsTotal > 0) {
      searchParams.set("page", pagesTotal + "");
      setSearchParams(searchParams);
    }
  }, [page, pagesTotal, resultsTotal, isError]);

  usePrefetching(isSuccess, page, pagesTotal, name);

  const displaySpinner = isError || isLoading;

  return (
    <>
      <HeaderRow>
        <div>
          <Heading as="h1">{capitalizeWords(name, "_")}</Heading>
          {name !== "trigger_logs" && name !== "users_backup" && (
            <Modal
              triggerElement={
                <Button>
                  <IoMdAddCircle />
                  Pievienot
                </Button>
              }
            >
              <CreateNewForm tableName={name} />
            </Modal>
          )}
        </div>
        <div>
          <Modal
            triggerElement={
              <Button isBright={false}>
                <BsDatabaseFillAdd />
                Tabulas izveides skripts
              </Button>
            }
          >
            <ScriptDisplay type="create" tableName={name} />
          </Modal>
          <Modal
            triggerElement={
              <Button isBright={false}>
                <BsDatabaseFillUp />
                Datu ievietošanas skripts
              </Button>
            }
          >
            <ScriptDisplay type="insert" tableName={name} />
          </Modal>
        </div>
      </HeaderRow>
      {displaySpinner ? (
        <Spinner />
      ) : (
        <Table
          tableName={name}
          data={table}
          pagination={<Pagination pagesTotal={pagesTotal} />}
        />
      )}
    </>
  );
};
