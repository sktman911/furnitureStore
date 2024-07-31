import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SearchBar() {
  // const [search, setSearch] = useSearchParams();
  const [text, setText] = useState("");
  const navigate = useNavigate();

  // const onSearchChange = (e) => {
  //   const text = e.target.value;
  //   if (text.length === 0) {
  //     search.delete("query");
  //     setSearch(search, { replace: true });
  //   } else {
  //     search.set("query", text);
  //     setSearch(search, { replace: true });
  //   }
  // };

  const hanldeSearch = (e) => {
    if (text.length === 0) {
      return;
    } else {
      e.preventDefault();
      navigate(`/search?query=${text}`);
      window.scroll(0,0);
    }
  };

  return (
    <>
      <div className="w-80">
        <div className="py-1 px-2 flex items-center border border-slate-400 rounded-md">
          <input
            type="text"
            className="w-11/12 p-1 outline-none text-sm"
            placeholder="Search product..."
            onChange={(e) => setText(e.target.value)}
          />
          <div className="w-1/12 flex justify-end" onClick={hanldeSearch}>
            <AiOutlineSearch className="text-xl cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
}
