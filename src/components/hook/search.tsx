import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export function useProductSearch() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const rawKeyword = searchParams.get("name") || "";
  const [searchText, setSearchText] = useState(rawKeyword);

  const handleSearch = (value: string) => {
    setSearchText(value);
    navigate(`?name=${value}`);
  };

  return { searchText, setSearchText, handleSearch, rawKeyword };
}