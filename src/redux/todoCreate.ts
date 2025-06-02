import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../types/Task";

interface TodoState {
  todo: ITask[];
  color: boolean;
}

const initialState: TodoState = {
  todo: JSON.parse(localStorage.getItem("todo") || "[]"),
  color: JSON.parse(localStorage.getItem("color") || "false"),
};

export const TodoSlice = createSlice({
  name: "TODO",
  initialState,
  reducers: {
    createTodo(state, action: PayloadAction<ITask>) {
      state.todo.push(action.payload);
      localStorage.setItem("todo", JSON.stringify(state.todo));
    },

    deleteTodo(state, action) {
      state.todo = state.todo
        .filter((el) => el.id !== action.payload)
        .map((el, index) => ({ ...el, id: index + 1 }));
      localStorage.setItem("todo", JSON.stringify(state.todo));
    },

    getChecked(state, action) {
      state.todo = state.todo.map((el) =>
        el.id === action.payload.id
          ? { ...el, checked: action.payload.checked }
          : el
      );
      localStorage.setItem("todo", JSON.stringify(state.todo));
    },

    updateTodo(state, action) {
      state.todo = state.todo.map((el) =>
        el.id === action.payload.id
          ? {
              ...el,
              name: action.payload.name,
              description: action.payload.description,
              deadline: action.payload.deadline,
            }
          : el
      );
      localStorage.setItem("todo", JSON.stringify(state.todo));
    },

    getColor(state, action: PayloadAction<boolean>) {
      state.color = action.payload;
      localStorage.setItem("color", JSON.stringify(state.color));
    },
  },
});

export const { createTodo, deleteTodo, getChecked, updateTodo, getColor } =
  TodoSlice.actions;

export default TodoSlice.reducer;
