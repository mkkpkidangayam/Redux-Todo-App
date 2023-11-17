import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, editTask } from "./TodoSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { RiEditFill } from "react-icons/ri";

const TodoList = () => {
  const [newTsk, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todo.tasks);

  const handleAddTask = () => {
    if (newTsk.trim() !== "") {
      dispatch(addTask(newTsk.trim()));
      setNewTask("");
    }
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleEditStart = (index, currentTask) => {
    setEditIndex(index);
    setEditedTask(currentTask);
  };

  const handleEditCancel = () => {
    setEditIndex(null);
    setEditedTask("");
  };

  const handleEditTask = (index) => {
    dispatch(
      editTask({
        taskId: index,
        updatedTask: editedTask,
      })
    );
    console.log(editedTask);
    setEditIndex(null);
    setEditedTask("");
  };

  return (
    <div style={styles.container}>
      <h1>REDUX TODO APP</h1>
      <hr />
      <div>
        <input
          type="text"
          value={newTsk}
          onChange={(e) => setNewTask(e.target.value)}
          style={styles.input}
          required
        />
        <button onClick={handleAddTask} style={styles.button}>
          Add Task
        </button>
      </div>
      <ul style={styles.taskList}>
        {tasks.map((task, index) => (
          <li key={index} style={styles.taskItem}>
            <div style={styles.taskIndex}>
              Task {index + 1}:-
              <hr />
            </div>

            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                  style={styles.editInput}
                />
                <div style={styles.editButtonGroup}>
                  <button
                    onClick={() => handleEditTask(index)}
                    style={styles.saveButton}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleEditCancel}
                    style={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <span> {task} </span>

                <div style={styles.buttonGroup}>
                  <button
                    onClick={() => handleEditStart(index, task)}
                    style={styles.editButton}
                  >
                    <RiEditFill />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(index)}
                    style={styles.deleteButton}
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

const styles = {
  container: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
  },

  input: {
    padding: "8px",
    marginRight: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  taskIndex: {
    marginRight: "10px",
    fontWeight: "bold",
    fontSize: "1em",
    color: "red",
  },

  button: {
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#3a4ecf",
    color: "white",
    border: "none",
  },

  taskList: {
    listStyle: "none",
    padding: "0",
  },

  taskItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  },

  buttonGroup: {
    display: "flex",
    marginTop: "5px",
    marginLeft: "auto",
  },

  editButtonGroup: {
    display: "flex",
    marginTop: "10px",
    marginLeft: "auto",
  },

  editInput: {
    padding: "8px",
    marginRight: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },

  editButton: {
    padding: "5px",
    // backgroundColor: "#3a4ecf",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
    color: "blue",
  },

  saveButton: {
    padding: "8px 12px",
    backgroundColor: "#4caf50",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
    color: "white",
    marginRight: "5px",
  },

  cancelButton: {
    padding: "8px 12px",
    backgroundColor: "#ff6961",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
    color: "white",
  },

  deleteButton: {
    marginLeft: "5px",
    padding: "5px",
    cursor: "pointer",
    color: "red",
    // backgroundColor: "red",
    border: "none",
    borderRadius: "4px",
  },
};
