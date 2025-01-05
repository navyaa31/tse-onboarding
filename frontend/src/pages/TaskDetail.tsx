import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { getTask, Task } from "src/api/tasks";
import { Page } from "src/components";
import styles from "src/pages/TaskDetail.module.css";

export function TaskDetail() {
  const [task, setTask] = useState<Task | null>(null);
  const { id } = useParams();
  useEffect(() => {
    getTask(id as string).then((result) => {
      if (result.success) {
        setTask(result.data);
      }
    });
  }, [id]);

  if (task === null) {
    return (
      <Page>
        <Helmet>
          <title> Not a Task | TSE Todos</title>
        </Helmet>
        <Link to="/" className={styles.homeLink}>
          Back to home
        </Link>
        <div className={styles.taskTitle}>
          <p>This task doesn&#39;t exist!</p>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <Helmet>
        <title> {task.title}| TSE Todos</title>
      </Helmet>
      <Link to="/" className={styles.homeLink}>
        Back to home
      </Link>

      <div className={styles.taskDetails}>
        <div className={styles.taskHeader}>
          <div className={styles.taskTitle}>
            <p>{task.title}</p>
          </div>
          <button className={styles.editButton}>
            <strong>Edit Task</strong>
          </button>
        </div>

        <p>{task.description || "(No Description)"}</p>

        <div className={styles.assigneeRow}>
          <strong>Assignee </strong>
        </div>

        <div className={styles.statusRow}>
          <strong>Status</strong>
          <span>{task.isChecked ? "Done" : "Not done"}</span>
        </div>

        <div className={styles.dateRow}>
          <strong> Date Created </strong>
          {task.dateCreated ? new Date(task.dateCreated).toLocaleString() : "Unknown"}
        </div>
      </div>
    </Page>
  );
}
