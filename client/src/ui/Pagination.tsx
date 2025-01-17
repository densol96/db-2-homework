import usePagination from "@/features/tables/usePagination";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { FaRegCircle, FaCircle } from "react-icons/fa6";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  padding: 1rem;
  gap: 3rem;
`;

const P = styled.p``;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
`;

const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: inherit;

  &:disabled {
    color: var(--color-text-grey) !important;
  }
`;

const PageTracker = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
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
      <PageTracker>
        {Array.from({ length: pagesTotal }, (_, index) => index + 1).map(
          (pageNum) =>
            !(pageNum === currentPage) ? <FaRegCircle /> : <FaCircle />
        )}
      </PageTracker>
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
