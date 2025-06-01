import React from "react";
import scss from "./Header.module.scss";
import { CiSearch } from "react-icons/ci";
import { LuSunMedium } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { FiMoon } from "react-icons/fi";
import { getColor } from "../../redux/todoCreate";

interface Props {
  filterTodo: string;
  setFilterTodo: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<Props> = ({
  filterTodo,
  setFilterTodo,
  searchTerm,
  setSearchTerm,
}) => {
  const dispatch = useAppDispatch();
  const { color } = useAppSelector((s) => s.todo);

  return (
    <div className={scss.header}>
      <div className="container">
        <div className={scss.content}>
          <h1 className={scss.title}>TODO LIST</h1>

          <div className={scss.controls}>
            <div className={scss.search}>
              <input
                type="text"
                placeholder="Search note..."
                className={scss.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <CiSearch className={scss.searchIcon} />
            </div>

            <select
              value={filterTodo}
              onChange={(e) => setFilterTodo(e.target.value)}
              className={scss.filter}
            >
              <option value="All">ALL</option>
              <option value="Incomplete">Incomplete</option>
              <option value="Completed">Completed</option>
            </select>

            <div className={scss.themeToggle}>
              {color ? (
                <FiMoon onClick={() => dispatch(getColor(false))} />
              ) : (
                <LuSunMedium onClick={() => dispatch(getColor(true))} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
