import { useRef, useState } from "react";
import "./TodoList.css";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'not-completed'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  const onAdd = () => {
    const value = inputRef.current?.value ?? "";
    if (!value) {
      return;
    }
    const task: Task = {
      id: crypto.randomUUID(),
      title: value,
      completed: false,
    };

    setTasks([...tasks, task]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const toggleComplete = (taskId: string) => {
    const updateTasks = (tasks: Task[]) => tasks?.map((task: Task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed
        };
      }
      return task;
    });
    setTasks((prev) => updateTasks(prev));
  };

  const deleteTask = (taskId: string) => {
    const updateTasks = (tasks: Task[]) => (
      tasks?.filter((task: Task) => task.id !== taskId)
    );

    setTasks((prev) => updateTasks(prev));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'not-completed') return !task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    notCompleted: tasks.filter(t => !t.completed).length
  };

  return (
    <div className="todo-container">
      <div className="todo-wrapper">
        <div className="todo-card">
          <h1>Todo List</h1>
          <p className="stats">{stats.notCompleted} tasks remaining</p>

          <section className="input-add">
            <input
              type="text"
              ref={inputRef}
              onKeyDown={(e) => e.key === 'Enter' ? onAdd() : ''}
              placeholder="Add a new task..."
            />
            <button onClick={onAdd}>Add</button>
          </section>

          <div className="filters">
            <button
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'active' : ''}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilter('not-completed')}
              className={filter === 'not-completed' ? 'active' : ''}
            >
              Active ({stats.notCompleted})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={filter === 'completed' ? 'active' : ''}
            >
              Completed ({stats.completed})
            </button>
          </div>

          <section className="tasks">
            {filteredTasks.length === 0 ? (
              <p className="empty-state">No tasks to show</p>
            ) : (
              filteredTasks.map((task: Task) => {
                return (
                  <div className="task" key={task.id}>
                    <div className="checkbox">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleComplete(task.id)}
                      />
                    </div>
                    <div className={`title ${task.completed ? 'completed' : ''}`}>
                      {task.title}
                    </div>
                    <div className="delete" onClick={() => deleteTask(task.id)}>
                      X
                    </div>
                  </div>
                );
              })
            )}
          </section>
        </div>
      </div>
    </div>
  );
}