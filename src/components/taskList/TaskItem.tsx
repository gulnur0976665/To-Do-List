import React, { useState } from "react";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin5Line } from "react-icons/ri";
import scss from "./TaskItem.module.scss";
import { useAppDispatch } from "../../redux/store";
import { deleteTodo, getChecked, updateTodo } from "../../redux/todoCreate";
import NoteModal from "../ui/NoteModal";

interface Props {
  task: ITask;
}

const TaskItem: React.FC<Props> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editValue, setEditValue] = useState(task.name);

  const handleCheck = () => {
    dispatch(getChecked({ id: task.id, checked: !task.checked }));
  };

  const handleEdit = () => {
    if (editValue.trim() === "") return;
    dispatch(updateTodo({ id: task.id, name: editValue }));
    setIsEditOpen(false);
  };

  return (
    <div className={scss.taskItem}>
      <div className={scss.taskItemWrapper}>
        <div className={scss.left}>
          <input
            type="checkbox"
            className={scss.checkbox}
            checked={task.checked}
            onChange={handleCheck}
          />
          <h4
            className={`${scss.taskTitle} ${
              task.checked ? scss.checkedTitle : ""
            }`}
          >
            {task.name.toUpperCase()} #{task.id}
          </h4>
        </div>
        <div className={scss.right}>
          <GoPencil
            className={scss.iconPencil}
            onClick={() => setIsEditOpen(true)}
          />
          <RiDeleteBin5Line
            className={scss.iconDelete}
            onClick={() => dispatch(deleteTodo(task.id))}
          />
        </div>
      </div>
      <hr className={scss.divider} />

      {isEditOpen && (
        <NoteModal
          title="EDIT NOTE"
          value={editValue}
          onChange={setEditValue}
          onCancel={() => setIsEditOpen(false)}
          onApply={handleEdit}
        />
      )}
    </div>
  );
};

export default TaskItem;
