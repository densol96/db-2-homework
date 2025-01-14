import usePagination from "@/features/tables/usePagination";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  padding: 1rem;
`;

const P = styled.p``;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
`;

const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: inherit;

  &:disabled {
    color: var(--color-text-grey) !important;
  }
`;

const RESULTS_PER_PAGE = +process.env.REACT_APP_RESULTS_PER_PAGE;

function Pagination({ pagesTotal }) {
  const { currentPage, prev, next } = usePagination(pagesTotal);

  if (pagesTotal < 2) return null;

  return (
    <StyledPagination>
      <P>
        Pašlaik skatāties {currentPage}. lapu no {pagesTotal}
      </P>
      <Buttons>
        <PaginationButton onClick={prev} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Atpakaļ</span>
        </PaginationButton>
        <PaginationButton disabled={currentPage === pagesTotal} onClick={next}>
          <span>Uz priekšu</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
