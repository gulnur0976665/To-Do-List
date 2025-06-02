import React, { useState } from "react";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin5Line } from "react-icons/ri";
import scss from "./TaskItem.module.scss";
import { useAppDispatch } from "../../redux/store";
import { deleteTodo, getChecked, updateTodo } from "../../redux/todoCreate";
import NoteModal from "../ui/NoteModal";
import { ITask } from "../../types/Task";

interface Props {
  task: ITask;
}

const TaskItem: React.FC<Props> = ({ task }) => {
  const [modal, setModal] = useState(false);
  const dispatch = useAppDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editValue, setEditValue] = useState(task.name);
  const [editDescription, setEditDescription] = useState(
    task.description || ""
  );
  const [editDeadline, setEditDeadline] = useState(task.deadline || "");

  const handleCheck = () => {
    dispatch(getChecked({ id: task.id, checked: !task.checked }));
  };

  const handleCancel = () => {
    setIsEditOpen(false);
  };

  const handleApply = () => {
    if (editValue.trim() === "") return;

    dispatch(
      updateTodo({
        id: task.id,
        name: editValue,
        description: editDescription,
        deadline: editDeadline,
      })
    );
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
          <div className={scss.block}>
            <h4
              onClick={() => setModal(!modal)}
              className={`${scss.taskTitle} ${
                task.checked ? scss.checkedTitle : ""
              }`}
            >
              {task.name.toUpperCase()} #{task.id}
            </h4>
            {modal ? (
              <div className={scss.taskDetails}>
                <p className={scss.taskDeadline}>Deadline: {task.deadline}</p>
                <p className={scss.taskDescription}>{task.description}</p>
              </div>
            ) : null}
          </div>
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
          description={editDescription}
          onDescriptionChange={setEditDescription}
          deadline={editDeadline}
          onDeadlineChange={setEditDeadline}
          onCancel={handleCancel}
          onApply={handleApply}
        />
      )}
    </div>
  );
};

export default TaskItem;
