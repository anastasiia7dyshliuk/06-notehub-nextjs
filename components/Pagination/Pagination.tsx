import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from "./Pagination.module.css";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {

  const handlePageClick = (selectedItem: { selected: number }) => {
    onPageChange(selectedItem.selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1}
      onPageChange={handlePageClick}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}