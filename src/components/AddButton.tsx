import React, { FC, useState } from "react";
import { TbPlus } from "react-icons/tb";
import scss from "./AddButton.module.scss";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { createTodo } from "../redux/todoCreate";
import NoteModal from "../components/ui/NoteModal";

const AddButton = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const { todo } = useAppSelector((s) => s.todo);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const CreateTodo = () => {
    dispatch(
      createTodo({
        name,
        description,
        deadline,
        checked: false,
        id: todo.length + 1,
      })
    );
    setName("");
    setDescription("");
    setDeadline("");
    setShowModal(false);
  };

  return (
    <div className={scss.addTodo}>
      <div onClick={() => setShowModal(true)} className={scss.plusButton}>
        <TbPlus className={scss.icon} />
      </div>

      {showModal && (
        <NoteModal
          title="NEW NOTE"
          value={name}
          onChange={setName}
          description={description}
          onDescriptionChange={setDescription}
          deadline={deadline}
          onDeadlineChange={setDeadline}
          onCancel={() => setShowModal(false)}
          onApply={CreateTodo}
        />
      )}
    </div>
  );
};

export default AddButton;
