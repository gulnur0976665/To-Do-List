import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITask {
  id: number;
  name: string;
  checked: boolean;
}

interface TodoState {
  todo: ITask[];
  color: boolean;
  undoStack: ITask[][];
}

const initialState: TodoState = {
  todo: JSON.parse(localStorage.getItem("todo") || "[]"),
  color: JSON.parse(localStorage.getItem("color") || "false"),
  undoStack: [],
};

export const TodoSlice = createSlice({
  name: "TODO",
  initialState,
  reducers: {
    createTodo(state, action: PayloadAction<Omit<ITask, "id" | "checked">>) {
      state.undoStack.push([...state.todo]);
      const newTodo: ITask = {
        ...action.payload,
        checked: false,
        id: state.todo.length + 1,
      };
      state.todo = [...state.todo, newTodo];
      localStorage.setItem("todo", JSON.stringify(state.todo));
    },

    deleteTodo(state, action: PayloadAction<number>) {
      state.undoStack.push([...state.todo]);
      state.todo = state.todo
        .filter((el) => el.id !== action.payload)
        .map((el, index) => ({ ...el, id: index + 1 }));
      localStorage.setItem("todo", JSON.stringify(state.todo));
    },

    getChecked(state, action: PayloadAction<{ id: number; checked: boolean }>) {
      state.undoStack.push([...state.todo]);
      state.todo = state.todo.map((el) =>
        el.id === action.payload.id
          ? { ...el, checked: action.payload.checked }
          : el
      );
      localStorage.setItem("todo", JSON.stringify(state.todo));
    },

    updateTodo(state, action: PayloadAction<{ id: number; name: string }>) {
      state.undoStack.push([...state.todo]);
      state.todo = state.todo.map((el) =>
        el.id === action.payload.id ? { ...el, name: action.payload.name } : el
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
