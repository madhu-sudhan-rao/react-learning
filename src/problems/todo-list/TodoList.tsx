import { useRef, useState } from "react";
import "./TodoList.css";

interface Task {
  title: string;
  completed: boolean;
}

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onAdd = () => {
    const value = inputRef.current?.value ?? "";
    const task = {
      title: value,
      completed: false,
    };

    setTasks([...tasks, task]);
  };

  const toggleComplete = (task: Task) => {
    const updatedTasks = tasks.map((t: Task) =>
      t.title === task.title ? { ...t, completed: !t.completed } : t
    );

    setTasks(updatedTasks);
  };

  return (
    <>
      <h1>Todo List</h1>
      <section className="input-add">
        <input type="text" ref={inputRef} />{" "}
        <button onClick={onAdd}>Add</button>
      </section>

      <section className="tasks">
        {tasks.map((task: Task, i) => {
          return (
            <div className="task" key={i}>
              <div className="checkbox">
                <input
                  type="checkbox"
                  name=""
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                  id=""
                />
              </div>
              <div className="title">{task.title}</div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default TodoList;
