import { useEffect, useState } from "react";
import { getAllTasks, type Task } from "src/api/tasks";
import { TaskItem } from "src/components";
import styles from "src/components/TaskList.module.css";

export interface TaskListProps {
  title: string;
}

export function TaskList({ title }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const result = await getAllTasks();
      if (result.success) {
        setTasks(result.data);
      } else {
        alert(`Failed to fetch tasks: ${result.error}`);
      }
    }

    fetchTasks();
  }, []);

  return (
    <div className={styles.container}>
      <span className={styles.title}>{title}</span>
      <div className={styles.item}>
        {tasks.length === 0 ? (
          <p>No tasks yet. Add one above to get started.</p>
        ) : (
          tasks.map((task) => <TaskItem key={task._id} task={task} />)
        )}
      </div>
    </div>
  );
}
