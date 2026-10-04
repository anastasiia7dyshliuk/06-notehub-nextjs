import { useState } from "react";
import type { ChangeEvent } from "react";
import css from "./SearchBox.module.css";
 
interface SearchBoxProps {
  onSearch: (value: string) => void;
}
 
export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [value, setValue] = useState<string>("");
 
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onSearch(newValue);
  };
 
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={handleChange}
    />
  );
}