import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import EmptyState from "./components/emptyState/EmptyState";
import AddButton from "./components/AddButton";
import TaskList from "./components/taskList/TaskList";
import { useAppSelector } from "./redux/store";

const App = () => {
  const { todo, color } = useAppSelector((s) => s.todo);
  const [filterTodo, setFilterTodo] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = color ? "white" : "#252525";
    document.body.style.color = color ? "black" : "white";
  }, [color]);

  const filteredTodos = todo
    .filter((todo: ITask) => {
      if (filterTodo === "All") return true;
      if (filterTodo === "Completed") return todo.checked === true;
      if (filterTodo === "Incomplete") return todo.checked === false;
      return true;
    })
    .filter((todo: ITask) =>
      todo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <Header
        filterTodo={filterTodo}
        setFilterTodo={setFilterTodo}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <AddButton />
      {filteredTodos.length > 0 ? (
        <TaskList todo={filteredTodos} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default App;
