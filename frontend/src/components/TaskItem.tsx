import { useState } from "react";
import { Link } from "react-router-dom";
import { updateTask, type Task } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleToggleCheck = () => {
    setLoading(true);
    updateTask({ ...task, isChecked: !task.isChecked }).then((result) => {
      if (result.success) {
        setTask(result.data);
      } else {
        alert(result.error);
      }

      setLoading(false);
    });
  };

  let textContainerClass = styles.textContainer;
  if (task.isChecked) {
    textContainerClass += " " + styles.checked;
  }

  const link = `/task/${task._id}`;

  return (
    <div className={styles.item}>
      <CheckButton onPress={handleToggleCheck} disabled={isLoading} checked={task.isChecked} />
      <div className={textContainerClass}>
        <span className={styles.title}>
          <Link to={link}>{task.title}</Link>
        </span>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
    </div>
  );
}
