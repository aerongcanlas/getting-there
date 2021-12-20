import React, { FC, ChangeEvent, useState } from "react"
import "./App.css"
import { ITask } from "./Interfaces"
import TodoTask from "./components/TodoTask"
import CompletedTask from "./components/CompletedTask"

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(1);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [completedList, setCompletedList] = useState<ITask[]>([]);

  // force descending
  function compareDate (a: ITask, b: ITask) {
    if ( a.dateCreated < b.dateCreated ){
      return 1;
    }
    if ( a.dateCreated > b.dateCreated ){
      return -1;
    }
    return 0;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === "task") setTask(e.target.value); //!(todoList.some(task => task.taskName === e.target.value))
    else if (e.target.name === "deadline" && Number(e.target.value) > 0) setDeadline(Number(e.target.value));
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline, dateCreated: new Date() }
    setTodoList([newTask, ...todoList])
    setTask("")
    setDeadline(1)
  };

  const completeTask = (completedTask: string): void => {
    setCompletedList([...completedList, ...todoList.filter((task) => {
      return task.taskName === completedTask
    })].sort(compareDate))
    setTodoList(todoList.filter((task) => {
      return task.taskName !== completedTask
    }))
  }
  
  const undoTask = (completedTask: string): void => {
    setTodoList([...todoList, ...completedList.filter((task) => {
      return task.taskName === completedTask
    })].sort(compareDate))
    setCompletedList(completedList.filter((task) => {
      return task.taskName !== completedTask
    }))
  }

  return (
    <div className="App">
      <div className="title">Todo List</div>
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="listHeading"></div>
      <div className="todoList">
        <div className="task">
          <div className="content">
            <span>Task</span>
            <span>Task Length</span>
            <span>Date Created</span>
          </div>
            <button>Complete</button>
        </div>  
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
      <div className="completedList">
        <div className="completedTask">
          <div className="content">
            <span>Task</span>
            <span>Date Created</span>
          </div>
            <button>Undo</button>
        </div>  
        {completedList.map((task: ITask, key: number) => {
          return <CompletedTask key={key} task={task} undoTask={undoTask}/>;
        })}
      </div>
    </div>
  );
};

export default App;
