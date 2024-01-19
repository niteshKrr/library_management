import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";

const Search = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");

  const handleSearch = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);

    if (value) {
      value.length > 2 && params.set("q", value);
    } else {
      params.delete("q");
    }

    replace(`${pathname}?${params}`);
  }, 1000);

  const onInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    handleSearch(value);
  };

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        value={searchValue}
        onChange={onInputChange}
      />
    </div>
  );
};

export default Search;
