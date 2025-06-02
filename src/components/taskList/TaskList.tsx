import React from "react";
import TaskItem from "./TaskItem";
import scss from "./TaskList.module.scss";
import { ITask } from "../../types/Task";

interface Props {
  todo: ITask[];
}

const TaskList: React.FC<Props> = ({ todo }) => {
  return (
    <div className={scss.TaskList}>
      <div className="container">
        <div className={scss.content}>
          {todo.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
