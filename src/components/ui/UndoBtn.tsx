import React from "react";
import { TbArrowBackUp } from "react-icons/tb";
import scss from "./UndoBtn.module.scss";
interface BtnProps {
  onClick: () => void;
  seconds: number;
}

const UndoBtn: React.FC<BtnProps> = ({ onClick, seconds }) => {
  return (
    <div className={scss.undoButton} onClick={onClick}>
      <div className={scss.countdown}>
        <span>{seconds}</span>
      </div>

      <div className={scss.block}>
        <h4>UNDO</h4>
        <TbArrowBackUp className={scss.iconArrow} />
      </div>
    </div>
  );
};

export default UndoBtn;
