import Link from "next/link";

<Link href={`/notes/${note.id}`} className={css.link}>
  View details
</Link>

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import { deleteNote } from "../../services/noteService";
import css from "./NoteList.module.css";
 
interface NoteListProps {
  notes: Note[];
}
 
export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
 
  const handleDelete = (noteId: string) => {
    mutate(noteId);
  };
 
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
              disabled={isPending && variables === note.id}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}