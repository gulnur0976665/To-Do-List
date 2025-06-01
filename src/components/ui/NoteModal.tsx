import React, { useState, useEffect } from "react";
import scss from "./NoteModal.module.scss";
import { useAppSelector } from "../../redux/store";
import UndoBtn from "./UndoBtn";

interface NoteModalProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  onCancel: () => void;
  onApply: () => void;
}

const NoteModal: React.FC<NoteModalProps> = ({
  title,
  value,
  onChange,
  onCancel,
  onApply,
}) => {
  const { color } = useAppSelector((s) => s.todo);

  const [btn, setBtn] = useState(false);
  const [btnApply, setBtnApply] = useState(false);

  const [cancelSeconds, setCancelSeconds] = useState(3);
  const [applySeconds, setApplySeconds] = useState(3);

  const [cancelTimer, setCancelTimer] = useState<NodeJS.Timeout | null>(null);
  const [applyTimer, setApplyTimer] = useState<NodeJS.Timeout | null>(null);

  // CANCEL
  const handleBtn = () => {
    setBtn(true);
    const timeout = setTimeout(() => {
      onCancel();
    }, 3000);
    setCancelTimer(timeout);
  };
  const handleUndo = () => {
    if (cancelTimer) {
      clearTimeout(cancelTimer);
      setCancelTimer(null);
    }
    setBtn(false);
    setCancelSeconds(3);
  };

  // APPLY
  const handleApply = () => {
    if (!value.trim()) {
      alert("Поле не должно быть пустым!");
      return;
    }
    setBtnApply(true);
    const timeout = setTimeout(() => {
      onApply();
    }, 3000);
    setApplyTimer(timeout);
  };
  const handleUndoApply = () => {
    if (applyTimer) {
      clearTimeout(applyTimer);
      setApplyTimer(null);
    }
    setBtnApply(false);
    setApplySeconds(3);
  };
  // CANCEL
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (btn && cancelSeconds > 0) {
      interval = setInterval(() => {
        setCancelSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [btn, cancelSeconds]);

  // APPLY
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (btnApply && applySeconds > 0) {
      interval = setInterval(() => {
        setApplySeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [btnApply, applySeconds]);

  return (
    <div className={scss.modalOverlay}>
      <div className={`${color ? scss.modalContent1 : scss.modalContent}`}>
        <div className={scss.newNote}>
          <h2>{title}</h2>
          <input
            onChange={(e) => onChange(e.target.value)}
            value={value}
            type="text"
            placeholder="Input your note..."
          />
        </div>

        <div className={scss.buttons}>
          {btn ? (
            <UndoBtn onClick={handleUndo} seconds={cancelSeconds} />
          ) : (
            <button className={scss.cancelBtn} onClick={handleBtn}>
              CANCEL
            </button>
          )}

          {btnApply ? (
            <UndoBtn onClick={handleUndoApply} seconds={applySeconds} />
          ) : (
            <button className={scss.applyBtn} onClick={handleApply}>
              APPLY
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
