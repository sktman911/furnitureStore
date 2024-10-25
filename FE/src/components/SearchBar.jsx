import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate} from "react-router-dom";

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
      navigate(`/search?query=${text}`);
      window.scroll(0, 0);
    }
  };

  return (
    <>
      <div className="w-64 xl:w-80">
        <div className="py-1 px-2 flex items-center border border-slate-400 rounded-md relative">
          <input
            type="text"
            className="w-11/12 p-1 outline-none text-sm"
            placeholder="Search product..."
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          {text.length > 0 && (
            <button
              onClick={() => setText("")}
              className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
            >
              ✕
            </button>
          )}
          <div className="w-1/12 flex justify-end" onClick={hanldeSearch}>
            <AiOutlineSearch className="text-xl cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
}
