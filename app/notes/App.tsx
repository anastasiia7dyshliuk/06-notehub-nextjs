import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
 
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
 
import css from "./App.module.css";
 
export default function App() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
 
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, perPage: 12, search }),

    placeholderData: keepPreviousData,
  });
 
  const handleSearchChange = useDebouncedCallback((value: string) => {
    setSearch(value);

    setPage(1);
  }, 500);
 
  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };
 
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
 
  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;
 
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
 
      {isLoading && <p>Завантаження нотаток...</p>}
      {isError && <p>Не вдалося завантажити нотатки.</p>}
 
      {notes.length > 0 && <NoteList notes={notes} />}
 
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCloseModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}