import React, { useRef, useState } from "react";

const SearchFilter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const names = [
    "Wayne",
    "Kate",
    "Lida",
    "Amanda Logan",
    "Helena Oliver",
    "Philip McCoy",
    "Devin Bell",
    "Nathan Barrett",
    "Jim Ball",
  ];

  const filterNames = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "";
    setSearchTerm(value);
  };

  const filterResults = names?.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toRender = searchTerm ? filterResults : names;

  const highlightMatch = (name: string) => {
    if (!searchTerm) return name;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = name.split(regex);

    return parts.map((part: string, index: number) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow", color: "black" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="search-filter-container">
      <h2>Search filter</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search names..."
          value={searchTerm}
          onChange={(e) => filterNames(e)}
        />
      </div>
      <div className="search-results-list">
        {toRender.length === 0
          ? "No results found"
          : toRender.map((name, i) => (
              <div key={i}>{highlightMatch(name)}</div>
            ))}
      </div>
    </div>
  );
};

export default SearchFilter;
