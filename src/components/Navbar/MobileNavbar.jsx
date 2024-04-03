import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import styles from "./MobileNavbar.module.css";
import searchIcon from "../../assets/icon/searchIcon.svg";
import { useNavigate } from "react-router-dom";
function MobileNavbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const updateFilterHandler = (e) => {
    setSearchQuery(e?.target?.value);
  };
  const debouncedOnChange = debounce(updateFilterHandler, 300);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      navigate("/", { state: { search: searchQuery } });
    }
  }, [searchQuery]);
  return (
    <div className={styles.header}>
      <div>
        <img src={searchIcon} alt="Search Icon" />
        <input
          type="text"
          placeholder="Search Musicart"
          onChange={debouncedOnChange}
          //   onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default MobileNavbar;
