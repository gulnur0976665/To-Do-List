import React, { useState } from "react";
import { TbPlus } from "react-icons/tb";
import scss from "./AddButton.module.scss";
import { useAppDispatch } from "../redux/store";
import { createTodo } from "../redux/todoCreate";
import NoteModal from "../components/ui/NoteModal";

const AddButton = () => {
  const [note, setNote] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const CreateTodo = () => {
    dispatch(createTodo({ name: note }));
    setNote("");
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
          value={note}
          onChange={setNote}
          onCancel={() => setShowModal(false)}
          onApply={CreateTodo}
        />
      )}
    </div>
  );
};

export default AddButton;
